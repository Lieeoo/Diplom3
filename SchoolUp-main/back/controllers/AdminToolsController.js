const { use } = require("express/lib/application");
const uuid= require("uuid");
const path = require("path")
const {Class,User,Event,Family,Student}= require('../models/model')//запрос девайса из базы данных
//const {Student} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { json } = require("express/lib/response");
const jwt= require('jsonwebtoken')

class AdminToolController {
    async create(req,res,next) 
    {
        try{ 
            const {exelmassive} = req.body
//name fullname birthday group_of_risk PFDO sex number letter
let i=0;
let cls
let student
let family
while(i<req.body.length){
    cls = await Class.findOne(
        {       where: {
                [Op.and]: [
                    { number:exelmassive[i].number },
                    {  letter:exelmassive[i].letter }
                  ]
                }, },
    )
       if(!cls) 
          cls = await Class.create({number:req.body[i].number,
             letter:exelmassive[i].letter, 
             birthday:exelmassive[i].birthday});


          family = await Family.create({/*family_status:exelmassive[i].family_status,*/
          material_condition:exelmassive[i].material_condition,
          educationFather:exelmassive[i].educationFather,
          educationMother:exelmassive[i].educationMother,
          fatherStat:exelmassive[i].fatherStat,
          motherStat:exelmassive[i].motherStat})



          student = await Student.create({name:req.body[i].name,
             fullname:exelmassive[i].fullname,
              class_ID:cls.id, 
              birthday:exelmassive[i].birthday,
               group_of_risk:exelmassive[i].group_of_risk,
               family_id:family.id,
               PFDO:exelmassive[i].PFDO,
               sex:exelmassive[i].sex});     

    i++;
}       


           
            return res.json({message:"заполнение учеников произведено успешно"})
        }
        catch(e)
        {
            return next(ApiError.badRequest(e.message))
        }
    


}












async addsomeclasses(req,res,next) 
{
    try{ 
        let {exelmassive} = req.body
//name fullname birthday group_of_risk PFDO sex number letter
let i=0;
let cls
let student
let family
while(i<req.body.length){
cls = await Class.findOne(
    {       where: {
            [Op.and]: [
                { number:exelmassive[i].number },
                {  letter:exelmassive[i].letter }
              ]
            }, },
)
   if(!cls) 
      cls = await Class.create({number:req.body[i].number,
         letter:exelmassive[i].letter, 
         birthday:exelmassive[i].birthday});


      family = await Family.create({/*family_status:exelmassive[i].family_status,*/
      material_condition:exelmassive[i].material_condition,
      educationFather:exelmassive[i].educationFather,
      educationMother:exelmassive[i].educationMother,
      fatherStat:exelmassive[i].fatherStat,
      motherStat:exelmassive[i].motherStat})



      student = await Student.create({name:req.body[i].name,
         fullname:exelmassive[i].fullname,
          class_ID:cls.id, 
          birthday:exelmassive[i].birthday,
           group_of_risk:exelmassive[i].group_of_risk,
           family_id:family.id,
           PFDO:exelmassive[i].PFDO,
           sex:exelmassive[i].sex});     

i++;
}       


       
        return res.json({message:"заполнение учеников произведено успешно"})
    }
    catch(e)
    {
        return next(ApiError.badRequest(e.message))
    }



}







}
module.exports= new AdminToolController()