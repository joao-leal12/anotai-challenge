import { CallBackParams, HttpAdapter } from "../http/HttpAdapter";
import express, {Express, Request, Response} from 'express'; 
import cors from 'cors'
import { QueueService } from "../AWS/QueueService";



export class ExpressAdapter implements HttpAdapter<any, any, any>  {
    app: Express 
    queueService:QueueService
    constructor(queueService: QueueService) { 
        this.app = express(); 
        this.app.use(express.json()); 
        this.app.use(cors({origin: '*'}));
        this.queueService= queueService 
    }
    async get(url: string, callBack: CallBackParams<any>): Promise<any> {
        this.app.get(url, async (req: Request, res: Response) => {

            const params = req.params as any
            
           const output =  await callBack(params)

           res.json(output); 
        })
        
    }
    async post(url: string, callBack: CallBackParams<any>): Promise<void> {
        
        this.app.post(url, async (req: Request, res: Response) => { 

            const output = await callBack(req.params, req.body )

            res.json(output); 
        })
    }
    async patch(url : string, callBack: CallBackParams<any>): Promise<void> {
       
        this.app.patch(url, async (req: Request, res: Response) => { 
            
            const output = await callBack(req.params, req.body) ;

            res.json(output)
        })
    }
    
    
   
   async delete(url: string, callBack: CallBackParams<any>): Promise<void> {

        this.app.delete(url, async (req: Request, res: Response) => { 
           
            const output = await callBack(req.params, req.body)


            res.json(output);  
        })
   }
   
   
   listen(port: number): void {
        this.app.listen(port); 
    } 
    
}