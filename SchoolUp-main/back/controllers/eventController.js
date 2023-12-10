const { use } = require("express/lib/application");
const {Event,Napravlenie, Student,Plan_Of_Class} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class eventController {

    async eventred(req,res,next)
    
    {try{
        let {id,plan_id,event_name,date_of_nach_event,date_of_conch_event,form_vosp_rab,network_interaction,
        who,invited_organizations,invited_parents,sertificate,project,
        picture_Adress,picture_Need,Archive }= req.body
    if(!id){
        return next(ApiError.badrequest('отсутствует айди'))
    }
    let candidate = await Event.findOne({where:{id}})
    plan_id=plan_id ||candidate.plan_id
    event_name=event_name||   candidate.event_name
    date_of_nach_event=date_of_nach_event|| candidate.date_of_nach_event
    date_of_conch_event=date_of_conch_event|| candidate.date_of_conch_event
    form_vosp_rab_id=form_vosp_rab_id||candidate.form_vosp_rab_id
    network_interaction=network_interaction||candidate.network_interaction
    who=who || candidate.who
    invited_organizations=invited_organizations||candidate.invited_organizations
    invited_parents=invited_parents||candidate.invited_parents
    sertificate=sertificate||candidate.sertificate
    project=project||candidate.project
    picture_Adress=picture_Adress||candidate.picture_Adress
    picture_Need=picture_Need||candidate.picture_Need
    Archive=Archive||candidate.Archive

    //invited_organizations=candidate.invited_organizations
    if(!candidate) return next(ApiError.badrequest('событие не найдено'))
    await Event.update({ plan_id,event_name,date_of_nach_event,date_of_conch_event,form_vosp_rab_id,network_interaction,
        who,invited_organizations,invited_parents,sertificate,project}, {
        where: {id}
      });
        let candidate1 = await Event.findOne({where:{id}})     
        return res.json(candidate1)
        }
        catch(e)
        {
            return next(ApiError.badRequest(e.message))
        }
    }








    async create(req,res,next)  {
        
        const {plan_id,
            event_name,
            date_of_nach_event,
            date_of_conch_event,
            form_vosp_rab_id,
            network_interaction,
            who,
            invited_organizations,
            invited_parents,
            sertificate ,project,
            picture_Adress,picture_Need,Archive
                } = req.body
          
          if (date_of_nach_event>date_of_conch_event)  date_of_conch_event==null


            try{
        const type = await Event.create( {plan_id,
            event_name,
            date_of_nach_event,
            date_of_conch_event,
            form_vosp_rab_id,
            network_interaction,
            who,
            invited_organizations,
            invited_parents,
            sertificate,project, 
            picture_Adress,
            picture_Need,Archive })
        return res.json(type)
            }

            catch {return next(ApiError.badrequest('некорректные данные или другая ошибка'))}
    }


/*    async addNAPR(req,res,next)
    {try{  const {id, napr_id } = req.body
   
 
    Event.findOne({where: {id}})
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
    Event.findOne({where: {id}})
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
}/** */


async getSTUD(req,res,next) 
{try{
    const {id } = req.body
    Event.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
        event.getStudents().then(courses=>{
            return res.json(courses)
           
            /*for(course of courses){
                console.log(course.name);
            }*/
        });
    });
}
catch(e)
{
    return next(ApiError.badRequest(e.message))
}}






async addSTUD(req,res,next)
    {try{  const {id, stud_id } = req.body
   
 
    Event.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
         
        // добавим Тому курс по JavaScript
                Student.findOne({where: {id: stud_id}})
            .then(course=>{
                if(!course) return next(ApiError.badrequest('некорректный айди'));
                event.addStudent(course, {through:{test:1}});
                return res.json({message:"направление добавлено"})
        });
        
}); }catch(e)
{
    return next(ApiError.badRequest(e.message))
}}



    async getALL(req,res) 
    {try{
        const types = await Event.findAndCountAll()
        return res.json(types)    }
        catch(e)
{
    return  next(ApiError.badRequest(e.message))
}
    }


    async getONE(req,res) 
    {try{
        const {id } = req.body
        const types = await Event.findOne({where: id})
        return res.json(types)   }
        catch(e)
{
    return  next(ApiError.badRequest(e.message))
}  
    }


    async delete(req,res,next) 
    { try{const {id} = req.body
    if(id)
    {
    await Event.destroy({where:{id}})
    return res.json({message: "удаление успешно"})  }
    return next(ApiError.badrequest('некорректные данные'))}
    catch(e)
{
    return next(ApiError.badRequest(e.message))
}  
    
    }
   




    async addPlan_Of_Class(req,res,next)
    {try{  const {id, plan_id } = req.body
   
 
    Event.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
         
        // добавим Тому курс по JavaScript
        Plan_Of_Class.findOne({where: {id: plan_id}})
            .then(course=>{
                if(!course) return next(ApiError.badrequest('некорректный айди'));
                event.addPlan_Of_Class(course, {through:{test:1}});
                return res.json({message:"план добавлен"})
        });
        
}); }catch(e)
{
    return next(ApiError.badRequest(e.message))
}}



async getPlan_Of_Class(req,res,next) 
{try{
    const {id } = req.body
    Event.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
        event.getPlan_Of_Classs().then(courses=>{
           /* for(course of courses){
                console.log(course.name);
            }/** */
            return res.json(courses)
           
            
        });
    });
}catch(e)
{
    return next(ApiError.badRequest(e.message))
}}


}
module.exports= new eventController()