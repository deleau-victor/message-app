import { FC, useMemo } from 'react'

type IButton = {
	type?: 'button' | 'submit' | 'reset' | undefined
	variant?:
		| 'btn-primary'
		| 'btn-secondary'
		| 'btn-accent'
		| 'btn-ghost'
		| 'btn-info'
		| 'btn-success'
		| 'btn-warning'
		| 'btn-error'
	size?: 'btn-lg' | '' | 'btn-sm' | 'btn-xs'
	children: string | JSX.Element
	onClick?: () => void
}

const Button: FC<IButton> = ({
	type = 'button',
	variant = 'btn-primary',
	size = '',
	children,
	onClick,
}) => {
	return (
		<button type={type} className={`btn ${variant} ${size}`} onClick={onClick}>
			{children}
		</button>
	)
}

export default Button
