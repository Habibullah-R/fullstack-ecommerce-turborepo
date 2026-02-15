import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { shouldBeUser } from "./middleware/auth.middleware.js";
import stripe from "./utills/stripe.js";

const app = new Hono();
const PORT = 8002;
app.use("*", clerkMiddleware());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/test",shouldBeUser, (c) => {
  return c.json({ message: "Payment service authenticated",userId:c.get("userId") }, 200);
});

app.post("/create-stripe-product",async(c)=>{
  const res = await stripe.products.create({
    id:"123",
    name:"test product",
    default_price_data:{
      currency:"usd",
      unit_amount:10*100
    }
  })
  return c.json(res)
})

app.get("/stripe-product-price",async(c)=>{
  const res = await stripe.prices.list({
    product:"123"
  })
  return c.json(res)
})

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`Payment service is Listening on port on ${info.port}`);
  },
);
