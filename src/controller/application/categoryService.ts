import { inputSaveCategoryServiceDto } from "../../Dtos/category-service-dto";
import { CategoryRepository } from "../../repository/categoryRepository";


export class CategoryService { 

    categoryRepository: CategoryRepository

    constructor(categoryRepository: CategoryRepository) {
        
        this.categoryRepository = categoryRepository
    }


    public async  createCategory(inputData: inputSaveCategoryServiceDto) { 
        return await this.categoryRepository.saveCategory(inputData); 
    }

    public async  updateCategory(id: number, key: string, value: string ) { 
        return await this.categoryRepository.updateCategory(id, key, value); 
    }

    public async getCategory (owner: string , name: string) { 

        return this.categoryRepository.getCategory(owner,name)
        
    }

    public async deleteCategory(categoryId: number) { 
        
        return await this.categoryRepository.deleteCategory(categoryId); 
    }
}