const getAuthToken = async () => {
	let token: string
	return Promise.resolve()
		.then(() => {
			token = localStorage.getItem('authToken')!
		})
		.then(() => {
			let authToken = { authToken: token?.slice(1, token.length - 1) }
			return authToken
		})
}

export default getAuthToken
