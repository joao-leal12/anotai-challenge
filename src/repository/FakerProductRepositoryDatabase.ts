import { inputSaveProductDTO } from "../Dtos/product-service-dto";
import { Product, ProductType } from "../model/domain/product";
import { PgAdapterDatabase } from "../view/infra/adapters/pgAdapterDatabase";
import { keysTypesUpdate, ProductRepository } from "./productRepository";
import { OutputSaveProductDTO } from "./productRepositoryDatabase";






export interface OuputGetProductDTO extends ProductType{ 
    id: number 
}
type InputRepositoryData = Omit<ProductType, 'id'>

export class FakerRepositoryDatabase implements ProductRepository{
    
    items: InputRepositoryData[]
    productBuilder: ProductType[]
    constructor(connection: PgAdapterDatabase,) { 
        
        this.items = []
        this.productBuilder = []
        
    }
    
    async deleteProduct(productId: number): Promise<number> {
        
        const idx = this.productBuilder.findIndex(i => i.id === productId); 

        const product = this.productBuilder.find(p => p.id === productId);

        if(!product) throw new Error('Produto não encontrado'); 

        const idxItem = this.items.findIndex(i => i.owner === product.owner && i.title === product.title)

        this.productBuilder.splice(idx, 1); 
        this.items.splice(idxItem, 1); 

        return product.id

    }
   async  updateProduct(key: keysTypesUpdate, value: never, id: number): Promise<Product> {
        const product= this.productBuilder.find(product => product.id === id); 

        if(!product) throw new Error('Produto não encontrado'); 


        const item = this.items.find(item => item.owner === product.owner && item.title === product.title); 

        if(!item) throw new Error('Item não encontado'); 

        item[key] = value;

        const idx = this.productBuilder.findIndex(itemProduct => itemProduct.owner === item.owner && itemProduct.title === item.title); 


        this.productBuilder.splice(idx, 1); 

        const newProduct= Product.build(Object.assign(item, {id: Math.random()}))

        this.productBuilder.push(newProduct); 


        return newProduct;

    
    }

    async getProduct(productId: number): Promise<Product> {
        
        const finderProduct= this.productBuilder.find(item => item.id === productId)

        if(!finderProduct) throw new Error('Produto não encontrado')

        return Product.build(finderProduct); 


    }
    
    async saveProduct(product: inputSaveProductDTO): Promise<OutputSaveProductDTO> {


        const inputData: Omit<ProductType, 'id'> = { 
            category: product.category, 
            description: product.description, 
            owner: product.owner, 
            price: product.price, 
            title: product.title, 
        };
        
        

       this.items.push(inputData);
       
       const id = Math.random(); 

        const newProduct = Product.build({category: product.category, description: product.description, owner: product.owner, price: product.price, title: product.title, id})


        this.productBuilder.push(newProduct); 

        return {
           id
        }
    
    } 



}