const Router = require ('express')
const router = new Router()
const TypeController = require('../controllers/additEducController')
const checkrole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')



router.delete('/',checkrole('ADMIN'), TypeController.delete)//на ввод айди и он удалит к хренам этот чертов план
router.post('/',checkrole('ADMIN'), TypeController.create)// на ввод  {year_of_plan, goals_of_educational_activity,target_priorities_1to4,target_priorities_5to9,target_priorities_10to11,tasks }
router.get('/',authMiddleware,TypeController.getALL)// вообще ничего на ввод нинада
router.post('/id',authMiddleware, TypeController.getONE)// на вход айди
router.post('/addNAPR',authMiddleware, TypeController.addNAPR)// на вход айди
router.post('/getNAPR',authMiddleware, TypeController.getNAPR)// на вход айди
router.post('/getSTUD',authMiddleware, TypeController.getSTUD)// на вход айди
router.post('/addSTUD',authMiddleware, TypeController.addSTUD)// на вход айди
router.post('/addTask',authMiddleware, TypeController.addTask)// на вход айди
router.post('/getTask',authMiddleware, TypeController.getTask)// на вход айди
module.exports = router