export {}

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			MONGO_URL: string
			PORT: number
			ENV: 'test' | 'dev' | 'prod'
		}
	}
}
