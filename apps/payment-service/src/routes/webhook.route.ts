import { Hono } from "hono";
import Stripe from "stripe";
import stripe from "../utils/stripe;

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

    switch (event.type) {
        case "checkout.session.completed":
            const session = event.data.object as Stripe.Checkout.Session
            const listItems = await stripe.checkout.sessions.listLineItems(session.id)
            // TODO :create order 
            console.log("webhook",session)
            break;
    
        default:
            break;
    }
    return c.json({received:true})
})

export default webhookRoute