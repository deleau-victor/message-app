import User from '../models/userModel'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

const authentification = async (token: string) => {
	try {
		// Vérification du token d'authentification
		const privateKey = process.env.PRIVATE_KEY!
		const decodedToken: any = jwt.verify(token, privateKey!)
		const user = await User.findOne({
			_id: decodedToken._id,
			'authTokens.authToken': token,
		})

		if (!user) throw new Error()
		return { user: true, userId: decodedToken._id }
	} catch (error) {
		console.log(error)
	}
}

export default authentification
