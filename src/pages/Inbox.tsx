import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SetAvatar from '../components/updateUser/SetAvatar'
import authToken from '../hooks/useToken'
import { authentification } from '../utils/RoutesAPI'

type user = {
	_id: string
	firstName: string
	lastName: string
	email: string
	avatarImage: File
}

const Inbox = () => {
	const navigate = useNavigate()
	const [user, setUser] = useState<user>()

	useEffect(() => {
		if (!localStorage.getItem('authToken')) {
			navigate('/login')
		}

		const fetchData = async () => {
			const { data } = await axios.post(authentification, authToken)
			if (data.status) {
				console.log(data.user)

				setUser(data.user)
			}
		}
		fetchData()
	}, [])

	return (
		<>
			<div>Inbox</div>
			<div>{user?.email}</div>
			<SetAvatar />
		</>
	)
}

export default Inbox
