const { use } = require("express/lib/application");
const {FormOfVospRab,Napravlenie} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class form_of_vosp_rab_Controller {
    async create(req, res) {
        const {name,
            picture_Need,
            time_of_event
             } = req.body
try{
        const type = await FormOfVospRab.create(
                {name,
                picture_Need,
                time_of_event })
        return res.json(type)
            }
            catch(e)
            {return next(ApiError.badrequest(e.message))



            }
    }



    async getALL(req,res) 
    { 
        const types = await FormOfVospRab.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await FormOfVospRab.findOne({where:{id}})
        return res.json(types)    
    }

    async delete(req,res,next) 
    {
        const {name,id} = req.body
        if(name)
        await FormOfVospRab.destroy({where:{name}})
        else if(id)
        await FormOfVospRab.destroy({where:{id}})
        else if(!id&&!name)
        return next(ApiError.badrequest('некорректные данные'))
        return res.json({message: "удаление успешно"})
    }
   


    async addNAPR(req,res,next)
    {try{  const {id, napr_id } = req.body
   
 
    FormOfVospRab.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
         
        // добавим Тому курс по JavaScript
        Napravlenie.findOne({where: {id: napr_id}})
            .then(course=>{
                if(!course) return next(ApiError.badrequest('некорректный айди'));
                event.addNapravlenie(course, {through:{test:1}});
                return res.json({message:"направление добавлено"})
        });
        
}); }catch(e)
{
    return next(ApiError.badRequest(e.message))
}}

async getNAPR(req,res,next) 
{try{
    const {id } = req.body
    FormOfVospRab.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
        event.getNapravlenies().then(courses=>{

            return res.json(courses)
           
            
        });
    });
}catch(e)
{
    return next(ApiError.badRequest(e.message))
}




}


}
module.exports= new form_of_vosp_rab_Controller()