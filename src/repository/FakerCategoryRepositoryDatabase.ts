import { inputSaveCategoryServiceDto, outputSaveCategoryServiceDto } from "../Dtos/category-service-dto";
import { Category } from "../model/domain/category";
import { CategoryRepository } from "./categoryRepository";

export class FakerCategoryDatabase implements CategoryRepository{
    categories: Category[]
    constructor(categories: Category[]){

        this.categories = categories
    }
    
    async saveCategory(inputData: inputSaveCategoryServiceDto): Promise<outputSaveCategoryServiceDto> {

        const category = Category.build(inputData.owner, inputData.title, inputData.description); 

        this.categories.push(category);
        
        
        return {
            name: category.title,
            owner: category.owner
        } 

        
    }

    async getCategory(owner: string, name: string ): Promise<Category> {
        const category = this.categories.find(category => category.title === name && category.owner === owner)

        if(!category) throw new Error('Categoria não encontrada')

        return category
    }


}