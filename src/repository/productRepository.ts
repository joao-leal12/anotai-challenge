import { inputSaveProductDTO } from "../Dtos/product-service-dto"
import { Product } from "../model/domain/product"
import { OutputSaveProductDTO } from "./productRepositoryDatabase"

export interface ProductRepository { 

    getProduct(productId: number): Promise<Product> 

    saveProduct(product: inputSaveProductDTO): Promise<OutputSaveProductDTO> 

    updateProduct(key:keysTypesUpdate , value :any, id:number): Promise<Product>

    deleteProduct(productId: number ): Promise<string>; 
}

export type keysTypesUpdate = 'title' | 'category' | 'description'| 'price' | 'owner'