import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import Inbox from './pages/Inbox'
import './styles/output.css'
import UserContextProvider from './context/UserContext'

function App() {
	return (
		<div data-theme="coffee">
			<BrowserRouter>
				<Routes>
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/" element={<Inbox />} />
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
