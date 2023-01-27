

export class MockLoggerService {
    getLogger() {
        return {
            info: (()=> {}),
            error: (()=> {})
        }
    }
}