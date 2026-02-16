import { Hono } from "hono";
import stripe from "../utills/stripe";
import { shouldBeUser } from "../middleware/auth.middleware";
import { CartItemsType } from "@repo/types";
import { createStripeProduct, getStripeProductPrice } from "../utills/stripeProduct";

const sessionRoute = new Hono();

sessionRoute.post("/create-checkout-session", shouldBeUser, async (c) => {
  const { cart }:{cart:CartItemsType} = await c.req.json()
  const userId = c.get("userId")
  console.log(cart)
  const lineItems = await Promise.all(
    cart.map(async(item)=>{
      const unitAmount = await getStripeProductPrice(item.id)
      return{
        price_data:{
          currency:"usd",
          product_data:{
            name:item.name
          },
          unit_amount:unitAmount as number
        },
        quantity:item.quantity
      }
    })
  )
  
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      client_reference_id:userId,
      line_items:lineItems,
      mode: "payment",
      return_url: `http://localhost:3002/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return c.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.log(error);
    return c.json(error)
  }
});

sessionRoute.get("/:session_id",async(c)=>{
  const {session_id} = c.req.param()
  const session = await stripe.checkout.sessions.retrieve(session_id as string,{
    expand:["line_items"]
  })
  console.log(session)
  return c.json(session)
})


export default sessionRoute;
