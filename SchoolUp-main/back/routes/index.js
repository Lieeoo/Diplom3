const Router = require ('express')
const router = new Router()
//const deviceRouter= require ('./deviceRouter')
const userRouter= require ('./userRouter')
//const brandRouter= require ('./brandRouter')
//const typeRouter= require ('./typeRouter')
const classRouter= require ('./classRouter')
const studentRouter= require ('./studentRouter')
const familyRouter= require ('./familyRouter')
const planRouter= require ('./planRouter')
const eventRouter= require ('./eventRoutet')
const napravlenieRouter= require ('./napravlenieRoutet')
const AdditionalEducationRouter= require ('./additEducRouter')
const taskRouter= require ('./taskRouter')
const institutionRouter= require ('./institutionRouter')
const classPlanRouter= require ('./classPlanRouter')
const form_of_vosp_sobRouter= require ('./formVospSobRouter')
const naprOBRRouter= require ('./naprObrRouter')
const AdminToolRouter= require ('./AdmintoolRouter')
const DormitoryRouter= require ('./DormitoryRouter')
const RoomRouter= require ('./RoomRouter')
const Contract_to_agreement_Router= require ('./ContractToagreementRouter copy')
const Res_Agr_Router= require ('./ResAgrRouter')
const Faculty_Router= require ('./FacultyRouter')



router.use('/adooon',AdminToolRouter)//
router.use('/naprOBR',naprOBRRouter)//
router.use('/formVospSob',form_of_vosp_sobRouter)//
router.use('/classPlan',classPlanRouter)//
router.use('/user',userRouter)//
router.use('/additEduc',AdditionalEducationRouter)//
router.use('/task',taskRouter)//
router.use('/institution',institutionRouter)//
router.use('/class',classRouter)//
router.use('/student',studentRouter)//
router.use('/family',familyRouter)//
router.use('/napravlenie',napravlenieRouter)//
router.use('/event',eventRouter)//
router.use('/plan',planRouter)//
router.use('/Dormitory',DormitoryRouter)//
router.use('/Room',RoomRouter)//
router.use('/Contract_to_agreement',Contract_to_agreement_Router)//
router.use('/Res_Agr',Res_Agr_Router)//
router.use('/Faculty',Faculty_Router)//


module.exports = router