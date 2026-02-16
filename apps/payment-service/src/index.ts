import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import sessionRoute from "./routes/session.route.js";
import { cors } from "hono/cors";
import webhookRoute from "./routes/webhook.route.js";

const app = new Hono();
const PORT = 8002;

app.use("*", clerkMiddleware());
app.use("*", cors({ origin: ["http://localhost:3002"] }));

app.route("/sessions", sessionRoute);
app.route("/webhooks",webhookRoute)

app.get("/", (c) => {
  return c.text("Hello Hono!");
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
