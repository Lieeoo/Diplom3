const Router = require ('express')
const router = new Router()
const TypeController = require('../controllers/napravlenieController')
const checkrole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')



router.delete('/',checkrole('ADMIN'), TypeController.delete)//на ввод name или id и собственно это все что есть
router.post('/',checkrole('ADMIN'), TypeController.create)//на ввод name и собственно это все что есть
router.get('/',authMiddleware,TypeController.getALL)// ваще ничо не требует


module.exports = router