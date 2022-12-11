import register from '../controllers/userAuth/registerController'
import express from 'express'
import login from '../controllers/userAuth/loginController'
import authentification from '../controllers/userAuth/authentificationController'
import setAvatar from '../controllers/userAuth/setAvatarController'
import disconnect from '../controllers/userAuth/disconnectController'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/authentification', authentification)
router.post('/setAvatar', setAvatar)
router.post('/disconnect', disconnect)

const UserRoutes = router
export default UserRoutes
