import { Kafka } from "kafkajs"

export const createKafkaClient = (service:string)=>{
    return new Kafka({
        clientId:"order-service",
        brokers:["localhost:9094","localhost:9095","localhost:9096"]
    })
}