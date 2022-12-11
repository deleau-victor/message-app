import { createContext, useContext, useMemo, useState } from 'react'

interface UserContextValue {
	user:
		| {
				firstName: string
				lastName: string
				email: string
				isAvatarImageSet: boolean
				avatarImage: string
		  }
		| undefined
	setUser: React.Dispatch<
		React.SetStateAction<
			| {
					firstName: string
					lastName: string
					email: string
					isAvatarImageSet: boolean
					avatarImage: string
			  }
			| undefined
		>
	>
}

const UserContext = createContext<UserContextValue | null>(null)

interface UserProvider {
	children: React.ReactNode
}

const UserProvider = ({ children }: UserProvider) => {
	const [user, setUser] = useState<UserContextValue['user']>()

	const value = useMemo(
		() => ({
			user,
			setUser,
		}),
		[user, setUser],
	)

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export const useUser = () => useContext(UserContext)

export default UserProvider
