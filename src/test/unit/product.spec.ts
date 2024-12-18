import { Product, ProductType } from "../../model/domain/product"

it('Should test create Product', () => {

    const input: ProductType = { 
        owner: 'Grupo Danone', 
        description: 'Feijão tropeiro', 
        title: 'Feijão', 
        category: 'Alimentos',
        price: 100,
        id: 12
       
    }

    const product = Product.build(input)

    expect(product.category).toBeDefined(); 
    expect(product.category).toBe('Alimentos')
    expect(product.title).toBeDefined(); 
    expect(product.title).toBe('Feijão')
    expect(product.description).toBeDefined(); 
    expect(product.description).toBe('Feijão tropeiro')
    expect(product.owner).toBeDefined(); 
    expect(product.owner).toBe('Grupo Danone'); 
   

})