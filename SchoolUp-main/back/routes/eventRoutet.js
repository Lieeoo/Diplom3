const Router = require ('express')
const router = new Router()
const TypeController = require('../controllers/eventController')
const checkrole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')



router.delete('/',checkrole('ADMIN'), TypeController.delete) //на ввод 
router.post('/',authMiddleware, TypeController.create)
router.get('/',authMiddleware,TypeController.getALL)
//router.post('/napravlenie_set',authMiddleware, TypeController.addNAPR)//на ввод name и собственно это все что есть
//router.post('/napravlenie_give',authMiddleware, TypeController.getNAPR)
router.post('/stud_set',authMiddleware, TypeController.getSTUD)//на ввод name и собственно это все что есть
router.post('/stud_give',authMiddleware, TypeController.addSTUD)
router.post('/give',authMiddleware,TypeController.getONE)
router.post('/redact',authMiddleware,TypeController.eventred)
router.post('/addPlan_Of_Class',authMiddleware,TypeController.addPlan_Of_Class)
router.post('/getPlan_Of_Class',authMiddleware,TypeController.getPlan_Of_Class)
module.exports = router