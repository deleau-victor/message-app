import React, { useEffect } from 'react'
import { Formik, Form } from 'formik'
import RegisterSchema from './RegisterSchema'
import InitialValues from './InitialValues'
import Button from '../UI/Button'
import userIcon from '../../assets/images/icon/user.svg'
import mailIcon from '../../assets/images/icon/mail.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'
import { registerRoute } from '../../utils/RoutesAPI'
import { useNavigate } from 'react-router-dom'
import InputField from '../UI/forms/InputField'

type registerValues = {
	firstName: string
	lastName: string
	email: string
	password: string
	confirmPassword: string
	acceptTerms: boolean
}

const RegisterForm = () => {
	const navigate = useNavigate()
	//
	const handleSubmit = async (values: registerValues) => {
		const { data } = await axios.post(registerRoute, values)

		if (!data.status) toast.error(data.errorMessage)
		if (data.status) {
			localStorage.setItem('authToken', JSON.stringify(data.authToken))
			navigate('/')
		}
	}

	useEffect(() => {
		if (localStorage.getItem('registered-user')) {
			navigate('/')
		}
	}, [])

	return (
		<>
			<ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="dark"
			/>
			<Formik
				initialValues={InitialValues}
				validationSchema={RegisterSchema}
				onSubmit={(values) => handleSubmit(values)}
			>
				{() => (
					<Form className="flex flex-col w-full mx-auto items-center mt-4">
						<div className="grid grid-cols-field gap-y-2 gap-x-6">
							{/* Inputs */}
							<InputField name="firstName" label="prénom" img={userIcon} />
							<InputField name="lastName" label="nom" img={userIcon} />
							<InputField
								name="email"
								label="email"
								img={mailIcon}
								size="col-span-2"
							/>
							<InputField
								name="password"
								label="mot de passe"
								size="col-span-2"
								type="password"
							/>
							<InputField
								name="confirmPassword"
								label="mot de passe"
								size="col-span-2"
								type="password"
								placeholder="Confirmez votre mot de passe"
							/>
							<InputField
								name="acceptTerms"
								size="col-span-2"
								height="h-12"
								label="J'ai lu et j'accepte les conditions"
								type="checkbox"
							/>
						</div>

						<div className="mt-4">
							<Button type="submit">S'inscrire</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default RegisterForm
