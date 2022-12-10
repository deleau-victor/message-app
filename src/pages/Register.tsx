import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/registerForm/RegisterForm'

type Props = {}

const Register = (props: Props) => {
	return (
		<>
			<div className="realtive z-10 flex w-full h-screen justify-center bg-cover items-center bg-gradient-to-r from-green-300 to-purple-400 ">
				<div className="w-fit h-fit bg-[#272a37] p-8 rounded-xl text-white">
					<span>
						Already have an account ? <Link to={'/Login'}>Login</Link>
					</span>
					<RegisterForm />
				</div>
			</div>
		</>
	)
}

export default Register
