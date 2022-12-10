import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import chalk from 'chalk'
import userRoutes from './routes/userRoutes'
import bodyParser from 'body-parser'

const log = console.log
const succes = (text: string) => {
	log(chalk.greenBright.bold(text))
}
const error = (text: string) => {
	log(chalk.bgRed.bold(text))
}

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json({ limit: '16mb' }))
app.use(bodyParser.raw({ limit: '16mb' }))
app.use(bodyParser.text({ limit: '16mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '16mb' }))
app.use(express.json({ limit: '16mb' }))
app.use(express.urlencoded({ extended: true, limit: '16mb' }))
app.use(express.raw({ limit: '16mb' }))
app.use(express.text({ limit: '16mb' }))

app.use('/api/auth', userRoutes)

mongoose.set('strictQuery', true)

mongoose
	.connect(process.env.MONGO_URL!)
	.then((res: any) => succes('Connected to Database - Initial Connection'))
	.catch((err: any) => error(err.message))

const server = app.listen(process.env.PORT!, () => {
	console.log('')
	succes('Server Started on port 5000')
	console.log('')
	console.log(
		chalk.bold.white('          local:'),
		chalk.white(`http://localhost:${process.env.PORT}`),
	)
	console.log('')
})
