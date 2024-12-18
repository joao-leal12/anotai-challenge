import { PgAdapterDatabase } from "../view/infra/adapters/pgAdapterDatabase"


export const generateCatalog = async (owner: string) => { 

    const connection = new PgAdapterDatabase(); 


    const outputAllCatalogs = await connection.query(`
        select 
        c.title as "category_title", 
        c.description as "category_description", 
        p.title, 
        p.description, 
        p.price 
        
        from product p 
        left join category c
        on c.owner = p.owner
        where p.owner = $1
        `, [owner])

 
    

    return { 
        owner,
        catalog: { 
            ...outputAllCatalogs
        }
    }



}