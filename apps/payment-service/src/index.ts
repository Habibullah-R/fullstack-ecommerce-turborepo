import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { shouldBeUser } from "./middleware/auth.middleware.js";

const app = new Hono();
const PORT = 8002;
app.use("*", clerkMiddleware());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/test",shouldBeUser, (c) => {
  return c.json({ message: "Payment service authenticated",userId:c.get("userId") }, 200);
});

serve(
  {
    fetch: app.fetch,
    port: PORT,
  },
  (info) => {
    console.log(`Payment service is Listening on port on ${info.port}`);
  },
);
