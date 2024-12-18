
import { CategoryService } from './controller/application/categoryService';
import { ProductService } from './controller/application/productService';
import { CategoryRepositoryDatabase } from './repository/categoryRepositoryDatabase';
import { ProductRepositoryDatabase } from './repository/productRepositoryDatabase';
import { generateCatalog } from './utils/generate-catalog';
import { ExpressAdapter } from './view/infra/adapters/ExpressAdapter';
import { PgAdapterDatabase } from './view/infra/adapters/pgAdapterDatabase';
import { SQSService } from './view/infra/adapters/QueueService';

import dotenv from 'dotenv';

dotenv.config();

const main = () => { 

const sqsService = new SQSService(); 

const expressAdapter = new ExpressAdapter(sqsService) ;

const connectionPG = new PgAdapterDatabase();

const productRepositoryDatabase = new ProductRepositoryDatabase(connectionPG); 

const categoryRepositoryDatabase = new CategoryRepositoryDatabase(connectionPG); 

const productService = new ProductService(productRepositoryDatabase, categoryRepositoryDatabase); 

const categoryService = new CategoryService(categoryRepositoryDatabase)


 expressAdapter.get('/', async (params?: any, body?: string) => {
    
    return 'Olá menino, tudo bem?'
 })

 expressAdapter.patch('/:id/update-category', async (params?: any, body?: any) => { 

   const outputUpdateCategory = await categoryService.updateCategory(params.id, body.key, body.value)


      if(outputUpdateCategory) { 
         const bodyMessage = JSON.stringify({owner: outputUpdateCategory.owner}); 

         sqsService.sendMessage(bodyMessage, '')
      }

    return outputUpdateCategory

 })

 expressAdapter.patch('/:id/update-product', async (params?: any, body?: any) => { 

   const outputUpdateProduct = await productService.updateProduct({id: params.id, key: body.key, value:body.value})

   if(outputUpdateProduct) { 
      const bodyMessage = JSON.stringify({owner: outputUpdateProduct.owner})

      sqsService.sendMessage(bodyMessage, ''); 
   }

 return outputUpdateProduct

 })

 expressAdapter.post('/create-category', async  (params?: any, body?: any) => {   

   const outputCategory = await   categoryService.createCategory({description: body.description, owner: body.owner, title: body.title}); 



   if(outputCategory) { 
      const bodyMessage = JSON.stringify({owner: outputCategory.owner})
   
      sqsService.sendMessage(bodyMessage,'')
   }

  return outputCategory

 })

 expressAdapter.post('/create-product', async (params?: any, body?: any) => { 

   const ownerName = await  productService.createProduct({category: body.category, description: body.description, owner: body.owner, price: body.price, title: body.title}) 

  
    const bodyMessageV2 = JSON.stringify(await generateCatalog(ownerName));


   await sqsService.sendMessage(bodyMessageV2, 'catalog-emit')
  
   return ownerName
   

 })

 expressAdapter.delete('/delete-product', async (params?: any, body?: any) => { 

   const outputDeletedProduct  = await productService.deleteProduct(body.productId);
 
   if(outputDeletedProduct) { 
      const bodyMessage = JSON.stringify({owner: outputDeletedProduct})

      sqsService.sendMessage(bodyMessage, '')
   }

   return outputDeletedProduct; 
}) 


expressAdapter.delete('/delete-category', async (params?: any, body?: any ) => {

   const outputDeletedCategory = await categoryService.deleteCategory(body.categoryId)

   if(outputDeletedCategory) { 
      
      const bodyMessage = JSON.stringify({owner: outputDeletedCategory})

      sqsService.sendMessage(bodyMessage, '')
   }

   return outputDeletedCategory

})

 
 expressAdapter.listen(3000); 
}

main(); 