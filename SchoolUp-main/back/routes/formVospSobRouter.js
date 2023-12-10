const Router = require ('express')
const router = new Router()
const TypeController = require('../controllers/form_of_vosp_rabController')
const checkrole = require('../middleware/checkRoleMiddleware')
const authMiddleware = require('../middleware/authMiddleware')



router.delete('/',checkrole('ADMIN'), TypeController.delete) //на ввод 
router.post('/',checkrole('ADMIN'), TypeController.create)
router.get('/',authMiddleware,TypeController.getALL)
router.post('/napravlenie_set',authMiddleware, TypeController.addNAPR)//на ввод name и собственно это все что есть
router.post('/napravlenie_give',authMiddleware, TypeController.getNAPR)

router.post('/give',authMiddleware,TypeController.getONE)

module.exports = router