import authentification from '../../middlewares/authentifications'
import User from '../../models/userModel'

type user = {
	bufferedImage: string
	authToken: any
}

const setAvatar = async (req: any, res: any, next: any) => {
	try {
		const { bufferedImage, authToken }: user = req.body
		const token = authToken.authToken

		// Vérification de l'authentification de l'utilisateur
		const result = await authentification(token)
		const { user, userId } = result!

		if (user) {
			const userToUpdate = await User.findOneAndUpdate(
				{ _id: userId },
				{ avatarImage: bufferedImage, isAvatarImageSet: true },
			)
		} else {
			return res.json({ status: false })
		}

		return res.json({ status: true })
	} catch (error) {
		next(error)
	}
}

export default setAvatar
