import User from '../../models/userModel'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

type user = {
	firstName: string
	lastName: string
	email: string
	password: string
	acceptTerms: boolean
}

const register = async (req: any, res: any, next: any) => {
	try {
		// Récupération des données de l'utilisateur
		const { firstName, lastName, email, password, acceptTerms }: user = req.body

		//Vérification de l'unicité de l'email
		const isEmailAlreadyUsed = await User.findOne({ email })
		if (isEmailAlreadyUsed) {
			return res.json({ errorMessage: 'Email déjà utilisée', status: false })
		}

		// Hashage du mot de passe
		let hashedPassword = await bcrypt.hashSync(password, 10)

		// Création de l'utilisateur
		const user = await User.create({
			firstName: firstName,
			lastName: lastName,
			email: email,
			password: hashedPassword,
			acceptTerms: acceptTerms,
		})

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

export default register
