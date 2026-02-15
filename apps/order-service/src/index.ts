import Fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/auth.middleware.js";
import { orderRoute } from "./routes/order.js";
import { connectOrderDb } from "@repo/order-db";

const fastify = Fastify();
const PORT = 8001;
fastify.register(clerkPlugin);
fastify.register(orderRoute)

fastify.get("/test", { preHandler: shouldBeUser }, (req, reply) => {
  return reply.status(200).send({ message: "Order service authenticated",userId:req.userId });
});

const start = async () => {
  try {
    await connectOrderDb()
    await fastify.listen({ port: PORT });
    console.log(`Order service listening on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
