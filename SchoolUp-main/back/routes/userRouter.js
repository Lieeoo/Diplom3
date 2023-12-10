const Router = require ('express')
const userController = require('../controllers/userController')
const router = new Router()
//const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')



router.get('/whoami',authMiddleware,userController.aboutme)
router.post('/whoamiredact',authMiddleware,userController.aboutmered)

router.post('/registration',userController.registration)
router.post('/login',userController.login)
router.get('/auth',authMiddleware,userController.check)
router.post('/addClass',checkrole('ADMIN'),userController.addClass)//нужна админам для добавления классов пользователю
router.post('/getClass',checkrole('ADMIN'),userController.getClass)// нужна чтобы видеть какие классы за кем закреплены
router.get('/all',checkrole('ADMIN'),userController.getALL)
router.get('/role',authMiddleware,userController.givemyrole)



module.exports = router