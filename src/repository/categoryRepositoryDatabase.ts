import { inputSaveCategoryServiceDto, outputSaveCategoryServiceDto } from "../Dtos/category-service-dto";
import { Category } from "../model/domain/category";
import { PgAdapterDatabase } from "../view/infra/adapters/pgAdapterDatabase";
import { CategoryRepository } from "./categoryRepository";

export class CategoryRepositoryDatabase implements CategoryRepository {
    connection: PgAdapterDatabase
    constructor(connection: PgAdapterDatabase) { 
        this.connection = connection
    }

   async saveCategory(inputData: inputSaveCategoryServiceDto): Promise<outputSaveCategoryServiceDto> {
       await  this.connection.query(`insert into category (title, owner, description) values ($1, $2, $3)`, [inputData.title, inputData.owner, inputData.description])

        return {} as any 

    }
    async getCategory(owner: string, name: string): Promise<Category> {
    
        const output = await this.connection.query(`select * from category ct where ct.owner = $1 and ct.title = $2`,[owner, name])

        return output as Category

    } 

    async updateCategory(id:number,  key:  string, value: string): Promise<Category> {
    
        const output = await this.connection.query(`
            update category 
            set ${key} = $1
            where id = $2
            
            `,[value, id])

        return output as Category

    } 


    async deleteCategory(categoryId: number) :Promise<string> { 

        return await this.connection.query('delete from category where id = $1 returning owner', [categoryId])
    }
    
}