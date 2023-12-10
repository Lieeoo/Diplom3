const Router = require ('express')
const router = new Router()
const DeviceController = require('../controllers/deviceController')
const authMiddleware = require('../middleware/authMiddleware')


router.post('/',authMiddleware, DeviceController.create)
router.get('/',authMiddleware,DeviceController.getALL)
router.get('/:id',authMiddleware,DeviceController.getOne)

module.exports = router