import authentification from '../../middlewares/authentifications'
import User from '../../models/userModel'

type user = {
	bufferedImage: string
	authToken: any
}

const setAvatar = async (req: any, res: any, next: any) => {
	try {
		console.log(req.body)

		const { bufferedImage, authToken }: user = req.body
		const token = authToken.authToken

		if (await authentification(token)) {
			const res = await User.findOneAndUpdate(
				{ 'authTokens.authToken': token },
				{ avatarImage: bufferedImage },
			)
			console.log(res)
		} else {
			return res.json({ status: false })
		}

		return res.json({ status: true })
	} catch (error) {
		next(error)
	}
}

export default setAvatar
