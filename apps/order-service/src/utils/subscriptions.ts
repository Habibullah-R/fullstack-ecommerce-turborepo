import { consumer } from "./kafka"
import { createOrder } from "./Order"

export const runKafkaSubscriptions = async()=>{
    consumer.subscribe([
        {
            topicName:"payment.successful",
            topicHandler:async(message)=>{
                const order = message.value
                console.log("Message received,payment.successful",message)
                await createOrder(order)
            }
        }
    ])
}