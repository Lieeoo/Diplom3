const Router = require ('express')
const router = new Router()
const DeviceController = require('../controllers/studentController')
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/', authMiddleware,DeviceController.create)// на вход  {name, fullname, class_ID, birthday, group_of_risk,family_id,PFDO,sex}  в результате создаст ученика
router.get('/',authMiddleware,DeviceController.getALL)//на вход {class_ID, family_id, limit, page} аналогична getSOME но если не указать класс или семью, будет выводить вообще всех
router.get('/:id',authMiddleware,DeviceController.getONE)//на вход {id} в джейсоне  подается айди ученика, получаешь инфу по семье и прочим штукам
router.post('/:id',authMiddleware,DeviceController.getSOME)//на вход  {class_ID, family_id, limit, page} где лимит это количевство учеников на странице а пейдж, номер страницы (по умолчанию 1)
router.delete('/:id',authMiddleware,DeviceController.delete)//подаешь на ввод айди ученика, и удаляется ученик
router.patch('/red', authMiddleware,DeviceController.studred2)//на ввод  {id,class_ID,name,fullname,birthday,group_of_risk,family_id,PFDO,sex } по желанию все кроме айди, если чего то кроме айди не будет, то он оставит это значением по умолчанию
router.patch('/redold', authMiddleware,DeviceController.studred)
router.patch('/addeduc',authMiddleware,DeviceController.getADDEDUC)

module.exports = router