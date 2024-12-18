import {} from 'express';

export interface HttpAdapter<OutputGet, OutputPost, OutputPatch> { 
   

    get(url: string,  callBack: CallBackParams<OutputGet> ): Promise<any> 
 
    post(url: string,  callBack: CallBackParams<OutputPost>): Promise<void>

    patch(url : string, callBack: CallBackParams<OutputPatch>): Promise<void>

    delete(urk: string, callBack: CallBackParams<OutputPatch>): Promise<void> 
    
    listen(port: number): void; 
}

export type CallBackParams<OutputData>  = ( params?: any, body?: any, ) => Promise<OutputData>