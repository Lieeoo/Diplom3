const { use } = require("express/lib/application");
const {Additional_education,Napravlenie,Task,Student} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { type } = require("express/lib/response");




class Additional_education_Controller {
    async create(req, res) {
        const {id_institution, name,   description } = req.body
if(!id_institution||!name) return res.json({message: "учреждение или название не задано"})
        const type = await Additional_education.create(
            {id_institution,
                name,
                description })
        return res.json(type)
    }



    async getALL(req,res) 
    { 
        const types = await Additional_education.findAndCountAll()
        return res.json(types)    
    }

    async getONE(req,res) 
    { const {id } = req.body
    const types = await Additional_education.findOne({where:{id}})
        return res.json(types)    
    }

    async delete(req,res,next) 
    {const {id } = req.body
    if(!id) return next(ApiError.badrequest('не введен айди'))


    const types = await Additional_education.destroy({where:{id}})
    return res.json({message: "удаление успешно"})
        
    }


    
    async addNAPR(req,res,next)
    {try{  const {id, napr_id } = req.body
   
 
    Additional_education.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
         
        // добавим Тому курс по JavaScript
        Napravlenie.findOne({where: {id: napr_id}})
            .then(course=>{
                if(!course) return next(ApiError.badrequest('некорректный айди'));
                event.addNapravlenieOBR(course, {through:{test:1}});
                return res.json({message:"направление добавлено"})
        });
        
}); }catch(e)
{
    return next(ApiError.badRequest(e.message))
}}



async getNAPR(req,res,next) 
{try{
    const {id } = req.body
    Additional_education.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
        event.getNapravlenieOBRs().then(courses=>{
            return res.json(courses)
           
            
        });
    });
}catch(e)
{
    return next(ApiError.badRequest(e.message))
}
}



async getSTUD(req,res,next) 
{try{
    const {id } = req.body
    Additional_education.findOne({where: {id}})
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
   
 
    Additional_education.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
         
        // добавим Тому курс по JavaScript
        Student.findOne({where: {id: stud_id}})
            .then(course=>{
                if(!course) return next(ApiError.badrequest('некорректный айди'));
                event.addStudent(course, {through:{test:1}});
                return res.json({message:"студент добавлен"})
        });
        
}); }catch(e)
{
    return next(ApiError.badRequest(e.message))
}}




async addTask(req,res,next)
{try{  const {id, task_id } = req.body


Event.findOne({where: {id}})
.then(event=>{
    if(!event) return next(ApiError.badrequest('некорректный айди'));
     
    // добавим Тому курс по JavaScript
    Task.findOne({where: {id: task_id}})
        .then(course=>{
            if(!course) return next(ApiError.badrequest('некорректный айди'));
            event.addTask(course, {through:{test:1}});
            return res.json({message:"план добавлен"})
    });
    
}); }catch(e)
{
return next(ApiError.badRequest(e.message))
}}





async getTask(req,res,next) 
{try{
const {id } = req.body
Event.findOne({where: {id}})
.then(event=>{
    if(!event) return next(ApiError.badrequest('некорректный айди'));
    event.getTasks().then(courses=>{
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




async getExel(req,res,next) 
{try{
var{ oFile }= req.files
var sFilename = oFile.name;
var reader = new FileReader();
reader.onload = function(e) {
    var data = e.target.result;
    var cfb = XLS.CFB.read(data, {type: 'binary'});
    var wb = XLS.parse_xlscfb(cfb);
    wb.SheetNames.forEach(function(sheetName) {
        var sv = XLS.utils.make_csv(wb.Sheets[sheetName]);   
        var ojs = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]); 
        console.log(ojs);
        ojs.forEach(function (el){
          console.log(el.name)
        })
    });
};
 reader.readAsBinaryString(oFile);













/*function filePicked(oEvent) {
    var oFile = oEvent.target.files[0];
    var sFilename = oFile.name;
    var reader = new FileReader();
    reader.onload = function(e) {
        var data = e.target.result;
        var cfb = XLS.CFB.read(data, {type: 'binary'});
        var wb = XLS.parse_xlscfb(cfb);
        wb.SheetNames.forEach(function(sheetName) {
            var sv = XLS.utils.make_csv(wb.Sheets[sheetName]);   
            var ojs = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]); 
            console.log(ojs);
            ojs.forEach(function (el){
              console.log(el.name)
            })
        });
    };
     reader.readAsBinaryString(oFile);
}*/


}catch(e)
{
return next(ApiError.badRequest(e.message))
}}

























}
module.exports= new Additional_education_Controller()