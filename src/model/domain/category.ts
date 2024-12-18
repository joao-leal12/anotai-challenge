import { ProductType } from "./product"

export type CategoryType = Pick<ProductType, 'title' | 'owner' | 'description'>

export class Category { 
    private constructor(readonly owner: string , readonly title: string , readonly description: string  ) {}

    public static build(owner: string, title: string, description:string,  ) {
        
        return new Category(owner, title, description)
    }
}