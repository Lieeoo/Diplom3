const Router = require ('express')
const router = new Router()
const DeviceController = require('../controllers/classController')
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/', checkrole('ADMIN'),DeviceController.create)
router.get('/',authMiddleware,DeviceController.getALL)
router.get('/:id',authMiddleware,DeviceController.getOne)
router.delete('/',authMiddleware,DeviceController.delete)
router.delete('/s',authMiddleware,DeviceController.deleteWithStudents)
router.post('/addEvent', authMiddleware,DeviceController.addEvent)
router.post('/getEvents', authMiddleware,DeviceController.getEvents)
router.post('/addsomeclasses', checkrole('ADMIN'),DeviceController.addsomeclasses)

module.exports = router