import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe";
import { producer } from "../utils/kafka";

const webhookRoute = new Hono()
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

webhookRoute.post("/stripe",async(c)=>{
    const body = await c.req.text()
    const sig = c.req.header("stripe-signature")

    let event:Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body,sig!,webhookSecret)
    } catch (error) {
        console.log(error)
        return c.json({error:"Webhook verification failed"},400)
    }

    console.log("webhook")
    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session
            const listItems = await stripe.checkout.sessions.listLineItems(session.id)
            producer.send("payment.successful",{
                value:{
                    userId:session.client_reference_id,
                    email:session.customer_details?.email,
                    amount:session.amount_total,
                    status:session.payment_status === "paid" ? "success": "failed",
                    address:session.customer_details?.address,
                    products:listItems.data.map((item)=>({
                        name:item.description,
                        quantity:item.quantity,
                        price:item.price?.unit_amount
                    }))
                }
            })
            break;
    
        default:
            break;
    }
    return c.json({received:true})
})

export default webhookRoute