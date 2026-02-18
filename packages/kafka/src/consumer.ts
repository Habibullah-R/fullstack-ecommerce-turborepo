import type { Consumer, Kafka } from "kafkajs";

export const createConsumer = (kafka:Kafka,groupId:string)=>{
    const consumer:Consumer = kafka.consumer({groupId});

    const connect = async()=>{
        await consumer.connect()
    }

    const subscribe = async (topic:string,handler:(message:any)=>Promise<void>)=>{
        await consumer.subscribe({
            topic:topic,
            fromBeginning:true
        })

        await consumer.run({
            eachMessage:async ({topic,partition,message})=>{
                try {
                    const value = message.value?.toString()

                    if(value){
                        await handler(JSON.stringify(value))
                    }
                } catch (error) {
                    console.log("Processing Error",error)
                }
            }
        })
    }

    const disconnect = async()=>{
        await consumer.disconnect()
    }

    return { connect , disconnect , subscribe}
}