const Router = require ('express')
const router = new Router()
const DeviceController = require('../controllers/DormitoryController')
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/', checkrole('ADMIN'),DeviceController.create)
router.get('/',authMiddleware,DeviceController.getALL)
router.get('/:id',authMiddleware,DeviceController.getONE)
router.delete('/',authMiddleware,DeviceController.delete)


module.exports = router