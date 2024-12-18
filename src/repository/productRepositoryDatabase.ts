import { inputSaveProductDTO, InputUpdateProductDTO } from "../Dtos/product-service-dto";
import { Product, ProductType } from "../model/domain/product";
import { PgAdapterDatabase } from "../view/infra/adapters/pgAdapterDatabase";
import { ProductRepository } from "./productRepository";

export interface OutputSaveProductDTO { 
   owner: string 
}

export interface OuputGetProductDTO extends ProductType{ 
    id: number 
}

export class ProductRepositoryDatabase implements ProductRepository{
    connection: PgAdapterDatabase
    
    constructor(connection: PgAdapterDatabase) { 
        this.connection = connection
    }
    
    async deleteProduct(productId: number): Promise<string> {

        const outputDeletedData = await this.connection.query('delete from anotai.product where id = $1 returning owner;', [productId])

        return outputDeletedData
    }
    async updateProduct(key: string, value: string, id :number ): Promise<Product> {
        const outputData = await this.connection.query(`
            update product 
            set ${key} = $1
            where id = $2
            returning *; 
        `, [value, +id])    

        return Product.build(outputData); 
       
    }

    async getProduct(productId: number): Promise<Product> {
        
        const [outputProductData] = await this.connection.query('select * from anotai.product where id = $1', [productId]) 

        await this.connection.close(); 

        if(!outputProductData) throw new Error('Produto não encontrado');
        
        return Product.build(outputProductData) as Product


    }
    
    async saveProduct(product: inputSaveProductDTO): Promise<OutputSaveProductDTO> {
         
        console.log({title: product.title})
        const [outputSaveProductData] = await this.connection.query('insert into product (owner, title, description, category, price) values($1, $2, $3, $4, $5) returning owner', [product.owner, product.title, product.description,  product.category, product.price])

        const output: OutputSaveProductDTO = { 
          owner: outputSaveProductData.owner
        }

        await this.connection.close()
        return output
    
    } 



}