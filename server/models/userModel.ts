import { model, Schema } from 'mongoose'
import isEmail from 'validator/lib/isEmail.js'
import isStrongPassword from 'validator/lib/isStrongPassword.js'
import isAlpha from 'validator/lib/isAlpha.js'

interface IUser {
	firstName: string
	lastName: string
	email: string
	password: string
	acceptTerms: boolean
	isAvatarImageSet: boolean
	avatarImage: File
	authTokens: any
}

const userSchema = new Schema<IUser>({
	firstName: {
		type: String,
		min: 2,
		max: 30,
		required: true,
		trim: true,
		validate(v: string) {
			if (!isAlpha)
				throw new Error('Le prénom ne doit contenir que des caractères alpha')
		},
	},
	lastName: {
		type: String,
		min: 2,
		max: 30,
		required: true,
		trim: true,
		validate(v: string) {
			if (!isAlpha)
				throw new Error('Le nom ne doit contenir que des caractères alpha')
		},
	},
	email: {
		type: String,
		required: true,
		trim: true,
		unique: true,
		validate(v: string) {
			if (!isEmail(v)) throw new Error('E-mail non valide')
		},
	},
	password: {
		type: String,
		required: true,
		min: 8,
		max: 50,
		validate(v: string) {
			if (!isStrongPassword(v)) {
				throw new Error(
					'Le mot de passe doit contenir au moins 8 caratères, une minuscule, une majuscule, un chiffre et un caractère spécial',
				)
			}
		},
	},
	acceptTerms: {
		type: Boolean,
	},
	isAvatarImageSet: {
		type: Boolean,
		default: false,
	},
	avatarImage: {
		type: String,
		default: '',
	},
	authTokens: [
		{
			authToken: {
				type: String,
				required: true,
			},
		},
	],
})

userSchema.methods.toJSON = function () {
	const user = this.toObject()
	delete user.password
	delete user.acceptTerms
	delete user._id
	return user
}

const User = model<IUser>('Users', userSchema)
export default User
