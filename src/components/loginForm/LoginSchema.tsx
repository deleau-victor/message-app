import * as Yup from 'yup'

const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("L'email indiqué est invalide")
		.required("L'email est obligatoire"),
	password: Yup.string()
		.required('Le mot de passe est obligatoire')
		.max(50, 'Le mot de passe indiqué est invalide'),
})

export default LoginSchema
