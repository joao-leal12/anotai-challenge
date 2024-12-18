import { ProductService } from "../../controller/application/productService"
import { inputSaveCategoryServiceDto } from "../../Dtos/category-service-dto";
import { inputSaveProductDTO } from "../../Dtos/product-service-dto";

import { FakerCategoryDatabase } from "../../repository/FakerCategoryRepositoryDatabase";
import { FakerRepositoryDatabase } from "../../repository/FakerProductRepositoryDatabase";


import { PgAdapterDatabase } from "../../view/infra/adapters/pgAdapterDatabase";

const pgAdapterDatabase = new PgAdapterDatabase(); 
  
const productRepository = new FakerRepositoryDatabase(pgAdapterDatabase); 

const categoryRepository = new FakerCategoryDatabase([]); 

const productService = new ProductService(productRepository, categoryRepository);


const generateProduct = async () => { 
    const input: inputSaveProductDTO = {
        owner: 'Grupo Danone', 
        title: 'Milho verde', 
        category: 'Alimentos',
        description: 'Milho verde me lata', 
        price: 4.98 
    }

   const productId =  await productService.createProduct(input); 


   return productId ;
}



it('Should create a product with your owner', async () => { 

    const inputCategory:inputSaveCategoryServiceDto = {
        description: 'Categoria para alimentos', 
        owner:'Grupo Danone', 
        title: 'Alimentos'
    }

    await categoryRepository.saveCategory(inputCategory); 

    const productId = await generateProduct();  

   const outputProduct = await productService.getProduct(productId); 
    
    expect(outputProduct.title).toBeDefined(); 
    expect(outputProduct.title).toBe('Milho verde'); 
    expect(outputProduct.description).toBeDefined();
    expect(outputProduct.description).toBe('Milho verde me lata');  
    expect(outputProduct.owner).toBeDefined();
    expect(outputProduct.owner).toBe('Grupo Danone');  
    expect(outputProduct.category).toBeDefined();
    expect(outputProduct.category).toBe('Alimentos');  
     
})  


it('Should update product', async () => { 

    const productId = await generateProduct();  

    const newProduct = await productService.updateProduct({id: productId, value: 'Milho', key: 'title'});
    
    expect(newProduct.title).toBe('Milho'); 
})


it('Should deleted Product', async () => {
    
    const productId = await generateProduct();  

   
    const productIdDeleted =   await productService.deleteProduct(productId); 


    expect(productIdDeleted).toBe(productId); 
    expect(productService.getProduct(productId)).rejects.toThrow(new Error('Produto não encontrado')) 

})
