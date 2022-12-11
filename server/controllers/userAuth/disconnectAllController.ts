import User from '../../models/userModel'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

type user = {
	authToken: string
}

const disconnect = async (req: any, res: any, next: any) => {
	try {
		// Récupération et vérification du token d'authentification
		const { authToken }: user = await req.body!
		const privateKey = process.env.PRIVATE_KEY!
		const decodedToken: any = jwt.verify(authToken, privateKey!)
		const user = await User.findOneAndUpdate(
			{
				_id: decodedToken._id,
				'authTokens.authToken': authToken,
			},
			{ $pullAll: { authTokens: { authToken } } },
		)

		if (!user) throw new Error()

		return res.json({ status: true })
	} catch (error) {
		next(error)
	}
}

export default disconnect
