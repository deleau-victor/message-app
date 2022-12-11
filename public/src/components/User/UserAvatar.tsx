import React, { FC } from 'react'
import getFileFromBase64 from '../../utils/getFileFromBase64'
import userDefault from '../../assets/images/icon/user-default.svg'

type Props = {
	isAvatarImageSet: boolean
	avatarImage?: string
	onClick: () => void
}

const UserAvatar: FC<Props> = ({ isAvatarImageSet, avatarImage, onClick }) => {
	return (
		<div className="avatar cursor-pointer" onClick={onClick}>
			<div className="w-14 rounded-full ring-primary ring-4 bg-[#272a37] ring-offset-[#272a37] ring-offset-4">
				<img
					src={
						isAvatarImageSet
							? window.URL.createObjectURL(
									getFileFromBase64(avatarImage!, 'UserProfile'),
							  )
							: userDefault
					}
					alt="user picture"
				/>
			</div>
		</div>
	)
}

export default UserAvatar
