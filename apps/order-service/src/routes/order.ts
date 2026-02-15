import fastify, { FastifyInstance } from "fastify";
import { shouldBeAdmin, shouldBeUser } from "../middleware/auth.middleware";
import { Order } from "@repo/order-db";

export const orderRoute = async (fastify: FastifyInstance) => {
  (fastify.get(
    "/user-order",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      const orders = await Order.find({ userId: request.userId });
      return reply.status(200).send(orders);
    },
  ),
    fastify.get(
      "/orders",
      { preHandler: shouldBeAdmin },
      async (request, reply) => {
        const orders = await Order.find();
        return reply.status(200).send(orders);
      },
    ));
};
