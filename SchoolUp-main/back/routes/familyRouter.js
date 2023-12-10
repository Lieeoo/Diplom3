/*сделть создание семьи, сделать удаление семьи, редактирование семьи, вывод семьи по ученику, вывод учеников по семейке */


const Router = require ('express')
const router = new Router()
const DeviceController = require('../controllers/familyController')
const authMiddleware = require('../middleware/authMiddleware')
const checkrole = require('../middleware/checkRoleMiddleware')

router.post('/', authMiddleware,DeviceController.create)//на вход  {family_status,material_condition,educationFather,fatherStat,motherStat} и оно сотворит семью
router.get('/',checkrole('ADMIN'),DeviceController.getALL)//просто выдает джейсон со всеми семьями, требует доступ админа
router.post('/:id',authMiddleware,DeviceController.getChilds)// на вход family_id, на вывод даст джейсон со всеми детьми этой семьи
router.delete('/:id',authMiddleware,DeviceController.delete)// на вход айди семьи и он удалит как семью,если в ней нет детей, а потом даст сообщение "удаление успешно"
router.post('/red',authMiddleware,DeviceController.famred2)// на вход {id,family_status,material_condition,educationMother,educationFather,fatherStat,motherStat } и он зарегистрирует те поля что были полными (не все из них могут быть полными)
router.purge('/', authMiddleware,DeviceController.deletePusto)//если удаляете классы, то вероятнее всего надо будет пройтись этой функцией после, для очистки пустых семей
router.post('/:idd',authMiddleware,DeviceController.getONE)//вводишь айди семьи получаешь семию
router.patch('/test',authMiddleware,DeviceController.getONE)//вводишь айди семьи получаешь семию
router.patch('/redold',authMiddleware,DeviceController.famred)
module.exports = router