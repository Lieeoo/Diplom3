const { use } = require("express/lib/application");
const {Family} = require('../models/model');
const {Student} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class familyController {
    async create(req, res) {
        const {family_status,material_condition,educationFather,educationMother,fatherStat,motherStat} = req.body
        const family = await Family.create({family_status,material_condition,educationFather,educationMother,fatherStat,motherStat})
        return res.json(family)
    }



    async getALL(req,res) 
    {const types = await Family.findAll()
        return res.json(types)

        
    }



    async famred(req,res,next)//устарел
    {const {id,family_status,material_condition,educationMother,educationFather,fatherStat,motherStat }= req.body
    if(!id){
        return next(ApiError.badrequest('отсутствует айди'))
    }
    let candidate = await Family.findOne({where:{id}})


        if(candidate){
            if (family_status)
            await Family.update({ family_status/*,lname: lname,mname: mname,comm: comm */}, {
                where: {id}
              });
            if (material_condition)
              await Family.update({ material_condition/*,lname: lname,mname: mname,comm: comm */}, {
                  where: {id}
                });
                if (educationMother)
                await Family.update({ educationMother/*,lname: lname,mname: mname,comm: comm */}, {
                    where: {id}
                  });
                  if (educationFather)
                await Family.update({ educationFather/*,lname: lname,mname: mname,comm: comm */}, {
                    where: {id}
                  });
                  if (fatherStat)
                  await Family.update({ fatherStat/*,lname: lname,mname: mname,comm: comm */}, {
                      where: {id}
                    });
                    if (motherStat)
                    await Family.update({ motherStat/*,lname: lname,mname: mname,comm: comm */}, {
                        where: {id}
                      }); 
                        

         candidate = await Family.findOne({where:{id}})     
        return res.status(200).json(candidate)
        }
        else
        {
           return next(ApiError.badrequest('некорректный айди'))
        }

    }

    async famred2(req,res,next)
    {const {id,family_status,material_condition,educationMother,educationFather,fatherStat,motherStat }= req.body
    if(!id){
        return next(ApiError.badrequest('отсутствует айди'))
    }
    let candidate = await Family.findOne({where:{id}})
    family_status=family_status ||candidate.family_status
    material_condition=material_condition||   candidate.material_condition
    educationMother=educationMother|| candidate.educationMother
    educationFather=educationFather|| candidate.educationFather
    fatherStat=fatherStat||candidate.fatherStat
    motherStat=motherStat||candidate.motherStat
    
    if(!candidate) return next(ApiError.badrequest('событие не найдено'))
    await Family.update({family_status,material_condition,educationMother,educationFather,fatherStat,motherStat},
      {
        where: {id}
      });
        let candidate1 = await Event.findOne({where:{id}})     
        return res.json(candidate1)
    }





    async getONE(req,res) 
    {let {id}= req.body
    //const {id} = req.params
        const device = await Family.findOne(
            {
                where: {id},
               // include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        return res.json(device)
    }








    async getChilds(req,res,next) 
    {let {family_id, /*limit,page*/}= req.body
    /* page = page || 1
     limit = limit || 30
     let ofset =(page-1)*limit/** */

     let childs;
    if(family_id ){
                childs= await Student.findAndCountAll({where: {family_id}})

                 }
             
                 else {
                     return next(ApiError.badrequest('поле семьи пустое'))

                 }
                 return res.json(childs)
 }

 async deletePusto(req,res,next) 
    {let id, family_id;
        let stud;
       let fam = Family.max({id})
       schetchik= fam.id;
        where(schetchik>0) 
        {id=schetchik;
        family_id= id;
 
        stud=  Student.findOne({where: {family_id} })
        if(!stud)
        Family.destroy({where: {id} })
            
        }
      
        
    }

        
    


    async delete(req,res,next) 
    {let {id}= req.body
    if(id){
        let family_id=id
       let fam = Family.findOne({where: {id} })
        if(fam) {
            let stud = Student.findOne({where: {family_id} })
            if (!stud) 
            Family.destroy({where: {id} })
            else return next(ApiError.badrequest('у этой семьи еще есть дети'))
           // Student.destroy({where: {family_id} })
            return res.json({message: "удаление успешно"})
            //Student.destroy({where: {fam,id==family_id} })
        }
        else return next(ApiError.badrequest('задан некорректный айди'))  
    } 
    else return next(ApiError.badrequest('поля пусты'))     
    }







}
module.exports= new familyController()