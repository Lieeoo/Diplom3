const Router = require ('express')
const router = new Router()
const TypeController = require('../controllers/typeController')
const checkrole = require('../middleware/checkRoleMiddleware')


router.post('/',checkrole('ADMIN'), TypeController.create)
router.get('/',TypeController.getALL)


module.exports = router