import React from 'react'
import UserProvider from '../context/UserContext'
import Homepage from '../components/Homepage'

const Inbox = () => {
	return (
		<UserProvider>
			<Homepage />
		</UserProvider>
	)
}

export default Inbox
