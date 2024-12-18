export type ProductType = { 
    title: string; 
    owner:string; 
    category: string; 
    price: number; 
    description: string
    id: number
}

export class Product { 
    private constructor(readonly owner: string, readonly title: string, readonly category: string, readonly description: string, readonly price: number, readonly id: number){}

    public static build(productProps: ProductType): Product {   

        return new Product(productProps.owner, productProps.title, productProps.category, productProps.description, productProps.price, productProps.id)
    }
}   