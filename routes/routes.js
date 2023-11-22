const express = require('express')
const router = express.Router()
const indexController = require('../controllers/indexController')
const messagesController = require('../controllers/messagesController')
const userController = require('../controllers/userController')


//const {requireAuth} = require('../middleware/authMiddleware')


router.use(express.static('views/login&signup'))
router.use(express.static('views/messagesView'))
router.use(express.static('views/publicView'))

router.get('/', indexController.login_get)
router.post('/',indexController.login_post)

router.get('/messages',messagesController.messages_get)
router.post('/messages',messagesController.messages_post)

router.get('/user/:id', userController.user_get)
router.post('/user/:id', userController.user_post)


module.exports = router