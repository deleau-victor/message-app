import axios from 'axios'
import { NavigateFunction } from 'react-router-dom'
import getAuthToken from '../utils/getAuthToken'
import { authentification } from '../utils/RoutesAPI'

const fetchUser = async (navigate: NavigateFunction, setUser: any) => {
	const authToken = await getAuthToken()

	// Récupération du token du client
	if (!localStorage.getItem('authToken')) {
		navigate('/login')
	}
	const { data } = await axios.post(authentification, authToken)
	if (data.status) {
		// Mise à jour de l'utilisateur
		setUser(data.user)
	} else {
		// Token qui ne correspond à aucun utilisateur, retour au login
		localStorage.removeItem('authToken')
		navigate('/login')
	}
}

export default fetchUser
