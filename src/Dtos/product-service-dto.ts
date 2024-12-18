import { keysTypesUpdate } from "../repository/productRepository";

export interface inputSaveProductDTO {
    owner: string;
    description: string; 
    title: string;
    category: string;  
    price: number; 

}

export interface OutputSaveProductDTO { 
    id: number; 
}


export interface InputUpdateProductDTO { 
    key: keysTypesUpdate; 
    value: any;
    id: number; 
    
  
}