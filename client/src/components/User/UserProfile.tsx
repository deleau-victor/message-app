import React, { FC } from 'react'
import { useUser } from '../../context/UserContext'
import Button from '../UI/Button'
import SetAvatar from './SetAvatar'

type Props = {
	isUserProfileOpen: boolean
	onClick: () => void
}

const UserProfile: FC<Props> = ({ isUserProfileOpen, onClick }) => {
	const { user } = useUser()!

	return (
		<>
			{isUserProfileOpen ? (
				<div className="absolute w-[20%] h-[50%] bg-secondary left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl flex flex-col items-center z-50">
					<div>Hello</div>
					<SetAvatar
						avatar={user!.avatarImage}
						isAvatarSet={user!.isAvatarImageSet}
					></SetAvatar>
					<Button onClick={() => onClick()}>Close</Button>
				</div>
			) : (
				''
			)}
		</>
	)
}

export default UserProfile
