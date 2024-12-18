import { CategoryService } from "../../controller/application/categoryService";
import { inputSaveCategoryServiceDto } from "../../Dtos/category-service-dto";
import { FakerCategoryDatabase } from "../../repository/FakerCategoryRepositoryDatabase";


it('Should regiter a category', async () => {

    const fakerCategoryDatabase = new FakerCategoryDatabase([])

    const categoryService = new CategoryService(fakerCategoryDatabase);  

    const inputCategory: inputSaveCategoryServiceDto = { 
        title: 'Alimentos vegetais', 
        description: 'Oléo Vegetal',
        owner: 'Grupo L.A'
    }


    const outputData = await categoryService.createCategory(inputCategory);
    
    const category = await categoryService.getCategory(outputData.owner, outputData.name);
    
    expect(category.title).toBeDefined();
    expect(category.owner).toBeDefined();
    expect(category.description).toBeDefined(); 
    expect(category.title).toBe('Alimentos vegetais'); 
    expect(category.owner).toBe('Grupo L.A'); 
    expect(category.description).toBe('Oléo Vegetal'); 


})