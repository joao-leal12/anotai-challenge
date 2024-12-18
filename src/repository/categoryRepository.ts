import {  inputSaveCategoryServiceDto, outputSaveCategoryServiceDto } from "../Dtos/category-service-dto";
import { Category } from "../model/domain/category";

export interface CategoryRepository { 
    saveCategory(inputData: inputSaveCategoryServiceDto): Promise<outputSaveCategoryServiceDto> 

    getCategory(owner: string, name: string): Promise<Category> 

    updateCategory(id: number, key: string, value: any): Promise<any>


    deleteCategory(categoryId: number): Promise<string>
}   