import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { clerkMiddleware } from "@hono/clerk-auth";
import sessionRoute from "./routes/session.route.js";
import { cors } from "hono/cors";
import webhookRoute from "./routes/webhook.route.js";
import { consumer, producer } from "./utils/kafka.js";
import { runKafkaSubscriptions } from "./utils/subscriptions.js";

const app = new Hono();
const PORT = 8002;

app.use("*", clerkMiddleware());
app.use("*", cors({ origin: ["http://localhost:3002"] }));

app.route("/sessions", sessionRoute);
app.route("/webhooks", webhookRoute);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

const start = async () => {
  Promise.all([await producer.connect(), await consumer.connect()]);
  await runKafkaSubscriptions()
  serve(
    {
      fetch: app.fetch,
      port: PORT,
    },
    (info) => {
      console.log(`Payment service is Listening on port on ${info.port}`);
    },
  );
};

start()
