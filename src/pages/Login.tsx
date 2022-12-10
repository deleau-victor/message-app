import React from 'react'
import { Link } from 'react-router-dom'
import LoginForm from '../components/loginForm/LoginForm'

type Props = {}

const Login = (props: Props) => {
	return (
		<>
			<div className="relative z-10 flex w-full h-screen justify-center bg-cover items-center bg-gradient-to-r from-green-300 to-purple-400">
				<div className="w-fit h-fit bg-[#272a37] p-8 rounded-xl text-white">
					<span>
						Don't have an account ? <Link to={'/Register'}>Register</Link>
					</span>
					<LoginForm />
				</div>
			</div>
		</>
	)
}

export default Login
