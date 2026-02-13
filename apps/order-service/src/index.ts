import Fastify from "fastify";
import { clerkPlugin, getAuth } from "@clerk/fastify";
import { shouldBeUser } from "./middleware/auth.middleware.js";

const fastify = Fastify();
const PORT = 8001;
fastify.register(clerkPlugin);

fastify.get("/test", { preHandler: shouldBeUser }, (req, reply) => {
  return reply.status(200).send({ message: "Order service authenticated",userId:req.userId });
});

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
    console.log(`Order service listening on port ${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
