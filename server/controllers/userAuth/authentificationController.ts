import User from '../../models/userModel'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

type user = {
	authToken: string
}

const authentification = async (req: any, res: any, next: any) => {
	try {
		// Récupération et vérification du token d'authentification
		const { authToken }: user = req.body
		const privateKey = process.env.PRIVATE_KEY!
		const decodedToken: any = jwt.verify(authToken, privateKey!)
		const user = await User.findOne({
			_id: decodedToken._id,
			'authTokens.authToken': authToken,
		})

		if (!user) throw new Error()

		return res.json({ status: true, user })
	} catch (error) {
		next(error)
	}
}

export default authentification
