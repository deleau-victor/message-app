import axios from 'axios'
import { Form, Formik } from 'formik'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { loginRoute } from '../../utils/RoutesAPI'
import InputField from '../UI/forms/InputField'
import LoginInitialValues from './LoginInitialValues'
import LoginSchema from './LoginSchema'
import mailIcon from '../../assets/images/icon/mail.svg'
import Button from '../UI/Button'

type loginValues = {
	email: string
	password: string
}

const LoginForm = () => {
	//
	const navigate = useNavigate()

	const handleSubmit = async (values: loginValues) => {
		const { data } = await axios.post(loginRoute, values)

		if (!data.status) toast.error(data.errorMessage)
		if (data.status) {
			localStorage.setItem('authToken', JSON.stringify(data.authToken))
			navigate('/')
		}
	}

	useEffect(() => {
		if (localStorage.getItem('authToken')) {
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
				initialValues={LoginInitialValues}
				validationSchema={LoginSchema}
				onSubmit={(values) => handleSubmit(values)}
			>
				{() => (
					<Form className="flex flex-col w-full mx-auto items-center mt-4">
						<div className="grid grid-cols-field gap-y-2 gap-x-6">
							{/* Inputs */}
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
						</div>
						<div className="mt-4">
							<Button type="submit">Connexion</Button>
						</div>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default LoginForm
