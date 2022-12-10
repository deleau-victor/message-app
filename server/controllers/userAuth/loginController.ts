import User from '../../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

type user = {
	email: string
	password: string
}

const login = async (req: any, res: any, next: any) => {
	try {
		const { email, password }: user = req.body
		const user = await User.findOne({ email })

		// Vérification de l'existence d'un compte en fonction de l'email
		if (!user) {
			return res.json({
				errorMessage: "L'email ne correspond à aucun utilisateur",
				status: false,
			})
		}

		// Vérification du mot de passe
		const isPasswordValid = await bcrypt.compareSync(password, user.password)
		if (!isPasswordValid) {
			return res.json({
				errorMessage: 'Le mot de passe est erroné',
				status: false,
			})
		}

		//Génération d'un token de connexion
		const privateKey = process.env.PRIVATE_KEY!
		const authToken = jwt.sign({ _id: user._id.toString() }, privateKey!, {
			algorithm: 'HS512',
		})
		user.authTokens.push({ authToken })
		user.save()

		return res.json({ status: true, authToken })
	} catch (error) {
		next(error)
	}
}

export default login
