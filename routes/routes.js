const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')
const messagesController = require('../controllers/messagesController')
const userController = require('../controllers/userController')
const logoutUserController = require('../controllers/logoutUserController')
const {authenticateToken}=require('../middleware/authMiddleware')
const {redirectToMessageIfLoggedIn}= require('../middleware/redirectToMessagesIfLoggedIn')


//const {requireAuth} = require('../middleware/authMiddleware')

router.use(express.json())


router.use(express.static('views/login&signup'))
router.use(express.static('views/messagesView'))
router.use(express.static('views/publicView'))

router.get('/', redirectToMessageIfLoggedIn,indexController.login_get)
router.post('/',redirectToMessageIfLoggedIn,indexController.login_post)

router.get('/messages',authenticateToken,messagesController.messages_get)
router.post('/messages',authenticateToken,messagesController.messages_post)

router.get('/user/:id',userController.user_get)
router.post('/user/:id', userController.user_post)

router.get('/logout', logoutUserController.logout_get)


module.exports = router