let token = localStorage.getItem('authToken')
let authToken = { authToken: token?.slice(1, token.length - 1) }

export default authToken
