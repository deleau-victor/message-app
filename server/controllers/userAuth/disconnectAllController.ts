import User from '../../models/userModel'
import authentification from '../../middlewares/authentifications'

type user = {
	authToken: string
}

const disconnectAll = async (req: any, res: any, next: any) => {
	try {
		// Vérification de l'authentification de l'utilisateur
		const { authToken }: user = await req.body!
		const result = await authentification(authToken)
		const { user, userId } = result!

		if (user) {
			const disconnectUser = await User.findOneAndUpdate(
				{
					_id: userId,
				},
				{ $pullAll: { authTokens: { authToken } } },
			)

			if (!disconnectUser) throw new Error()

			return res.json({ status: true })
		}
	} catch (error) {
		next(error)
	}
}

export default disconnectAll
