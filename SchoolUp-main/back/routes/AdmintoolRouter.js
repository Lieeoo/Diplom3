const Router = require ('express')
const router = new Router()
const AdminController = require('../controllers/AdminToolsController')
const checkrole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')


router.get('/',authMiddleware,AdminController.create)// вообще ничего на ввод нинада
//router.delete('/',checkrole('ADMIN'), TypeController.delete)//на ввод айди и он удалит к хренам этот чертов план
router.patch('/',checkrole('ADMIN'), AdminController.create)// на ввод  {year_of_plan, goals_of_educational_activity,target_priorities_1to4,target_priorities_5to9,target_priorities_10to11,tasks }


module.exports = router