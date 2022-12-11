import { ErrorMessage, Field } from 'formik'
import React, { FC, MouseEvent, useState } from 'react'
import eyeIcon from '../../../assets/images/icon/eye.svg'
import eyeoffIcon from '../../../assets/images/icon/eye-off.svg'

type Props = {
	name: string
	img?: string
	size?: 'col-span-2'
	type?: string
	placeholder?: string
	label: string
	height?: string
}

const InputField: FC<Props> = ({
	name,
	img,
	size,
	type = 'text',
	placeholder,
	label,
	height,
}) => {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

	const handleFocus = (event: MouseEvent<HTMLDivElement>) => {
		let input: HTMLInputElement
		input = event.currentTarget.children[0].children[1] as HTMLInputElement
		input.focus()
	}

	const handleShowPassword = (event: MouseEvent<HTMLImageElement>) => {
		setIsPasswordVisible(!isPasswordVisible)
		event.currentTarget.src.includes(eyeIcon)
			? event.currentTarget.setAttribute('src', eyeoffIcon)
			: event.currentTarget.setAttribute('src', eyeIcon)
	}

	return (
		<div
			className={`flex flex-col items-center ${
				type !== 'checkbox' ? 'min-h-[92px]' : null
			} ${size ? size : null} ${height ? height : null}`}
		>
			{type === 'text' || type === 'password' ? (
				<>
					<div className="fieldSection" onClick={(event) => handleFocus(event)}>
						<div className="fieldInput">
							<label htmlFor={name} className="text-gray-400">
								{label[0].toUpperCase() + label.slice(1)}
							</label>
							<Field
								type={
									type === 'password'
										? isPasswordVisible
											? 'text'
											: 'password'
										: type
								}
								id={name}
								name={name}
								className="fieldComponent"
								placeholder={
									placeholder ? placeholder : `Entrez votre ${label}`
								}
							/>
						</div>
						{type === 'password' || img ? (
							<div className="fieldIcon">
								{img ? <img src={img} alt="" className={'w-full'} /> : null}
								{type === 'password' ? (
									<img
										src={eyeIcon}
										alt=""
										className={'invisiblePassword'}
										onClick={(event) => handleShowPassword(event)}
									/>
								) : null}
							</div>
						) : null}
					</div>
				</>
			) : null}
			{type === 'checkbox' ? (
				<div className="flex justify-center">
					<Field
						name={name}
						type={type}
						className="checkbox checkbox-success mr-4"
					/>
					<label htmlFor={name} className="text-white">
						J'ai lu et j'accepte les conditions
					</label>
				</div>
			) : null}

			<ErrorMessage name={name} component="small" className="text-error" />
		</div>
	)
}

export default InputField
