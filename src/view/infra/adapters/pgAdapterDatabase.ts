import pgp from 'pg-promise'


export class PgAdapterDatabase{ 
    connectionPgAdapter
    constructor() { 
        this.connectionPgAdapter = pgp()('postgres://anotai:admin123@localhost:5432/anotai_db')
    }

    async query(query: string, params: any[] ){ 

        return await this.connectionPgAdapter.query(query, params)

    }

    async close( ) { 
        await this.connectionPgAdapter.$pool.end(); 
    }
}