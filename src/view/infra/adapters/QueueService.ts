import { QueueService } from "../AWS/QueueService";
import {SQS} from "@aws-sdk/client-sqs"



export class SQSService implements QueueService { 

    clientSQS

    constructor() { 
        this.clientSQS = new SQS({
            credentials: {
                accessKeyId: process.env.ACCESS_KEY_ID ||'',
                secretAccessKey: process.env.SECRET_KEY_ID || '',
            },
            region: process.env.REGION || 'us-east-1',
            
        })
    }
    async sendMessage(body: string, attribute: string): Promise<void> {
        try { 

            await this.clientSQS.sendMessage({
                QueueUrl: process.env.QUEUE_URL, 
                MessageBody: body  
            })
        }catch(e) { 

            console.error(e);
        }
    }


    

} 