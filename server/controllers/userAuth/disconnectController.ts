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
		const disconnectUser = await User.findOneAndUpdate(
			{
				_id: decodedToken._id,
				'authTokens.authToken': authToken,
			},
			{ $pull: { authTokens: { authToken: authToken } } },
		)

		if (!disconnectUser) throw new Error()

		return res.json({ status: true })
	} catch (error) {
		next(error)
	}
}

export default disconnect
