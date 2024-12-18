import { inputSaveProductDTO, InputUpdateProductDTO } from "../../Dtos/product-service-dto";

import { CategoryRepository } from "../../repository/categoryRepository";

import { ProductRepository } from "../../repository/productRepository";


export class ProductService { 

     productRepository: ProductRepository
     categoryRepository: CategoryRepository
    constructor( productRepository: ProductRepository, categoryRepository: CategoryRepository) {
        this.productRepository = productRepository
        this.categoryRepository = categoryRepository
    }

    public async createProduct (productParams: inputSaveProductDTO) { 

        const hasCategory = await this.categoryRepository.getCategory(productParams.owner, productParams.category)
    

        if(!hasCategory) throw new Error('Category not found for this product, please select another category')
        
         const output = await this.productRepository.saveProduct(productParams); 
      
        return output.owner
    
    }

    public async getProduct (productId: number) { 
        return await this.productRepository.getProduct(productId); 
    }
        

    public async updateProduct (props : InputUpdateProductDTO) {

        return await this.productRepository.updateProduct(props.key, props.value, props.id); 
    }

    public async deleteProduct(productId: number) { 
      return   await this.productRepository.deleteProduct(productId); 
    }

  

}   