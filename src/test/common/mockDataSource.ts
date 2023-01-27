
export class MockDataSource {
    createQueryRunner() {
        return {
            connect: (()=> {}),
            startTransaction: (()=> {}),
            commitTransaction: (()=> {}),
            rollbackTransaction: (()=>{}),
            release: (()=>{})
        }
    }
}