import { consumer } from "./kafka"
import { createStripeProduct, deleteStripeProduct } from "./stripeProduct"

export const runKafkaSubscriptions = async()=>{
    consumer.subscribe([
        {
            topicName:"product.created",
            topicHandler:async (message)=>{
                const product = message.value
                console.log("Received Message,product.created",product)
                await createStripeProduct(product)
            }
        },
        {
            topicName:"product.deleted",
            topicHandler:async (message)=>{
                const product = message.value
                console.log("Received Message,product.deleted",product)
                await deleteStripeProduct(product)
            }
        },
    ])
}