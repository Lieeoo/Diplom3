const { use } = require("express/lib/application");
const uuid= require("uuid");
const path = require("path")
const {Class,User,Event,Family}= require('../models/model')//запрос девайса из базы данных
const {Student} = require('../models/model');
const ApiError = require('../errors/ApiError');
const { json } = require("express/lib/response");
const jwt= require('jsonwebtoken')
const { exec } = require("child_process");


class ClassController {
    async create(req,res,next) 
    {
        try{
            let {letter, number, birthday,facultyID} = req.body




            const klass = await Class.create({letter, number, birthday,facultyID});
            return res.json(klass)
        }
        catch(e)
        {
            next(ApiError.badRequest(e.message))
        }
    }

    async convertToPdf(req, res) {

        if (!req.file) {
            console.log("Файл не получен");
            return res.status(400).send("Файл не был загружен");
        } else {
            console.log("Файл получен:", req.file.path);
            // Тут можете временно вернуть ответ клиенту
            return res.send("Файл успешно загружен");
        }

        /*console.log("a");

        if (!req.file) {
            return next(ApiError.badRequest("Файл не был загружен"));
        }
    
        const docPath = req.file.path;
        const pdfPath = req.file.destination + '/' + req.file.filename + '.pdf';
    
        // Команда для конвертации файла в PDF с использованием LibreOffice
        const convertCommand = `libreoffice --headless --convert-to pdf --outdir "${req.file.destination}" "${docPath}"`;
    
        exec(convertCommand, (error) => {
            if (error) {
                console.error(`Ошибка при конвертации: ${error}`);
                return res.sendStatus(500);
            }
    
            // Отправляем сконвертированный PDF обратно на клиент
            res.sendFile(pdfPath, (err) => {
                if (err) {
                    console.error(err);
                    res.sendStatus(500);
                }
                // После отправки можно удалить исходный и сконвертированный файлы
                fs.unlinkSync(docPath);
                fs.unlinkSync(pdfPath);
            });
        });
        */
    }


    async getMyClasses(req,res,next) //отличная тема для гет запроса
    { try{
        const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
        if (!token) {
            return res.status(401).json({message: "Не авторизован"})
        }
        const decoded = jwt.verify(token, process.env.jwt_key)
        if(!decoded.email){
            return next(ApiError.badrequest('некорректный логин'))
        }

        //const {id } = req.body
        User.findOne({where: {email:decoded.email}})
        .then(event=>{
            if(!event) return next(ApiError.badrequest('некорректный айди'));
            event.getClasss().then(courses=>{
               /* for(course of courses){
                    console.log(course.name);
                }/** */
                return res.json(courses)
               
                
            });
        });
    }catch(e)
    {
        return next(ApiError.badRequest(e.message))
    }
    }






    async getALL(req,res,next) //переделать бы его под нормальный 
    { let {letter, number, limit, page}= req.query
    try{
       
           
            const token = req.headers.authorization.split(' ')[1] // Bearer asfasnfkajsfnjk
            if (!token) {
                return res.status(401).json({message: "Не авторизован"})
            }
            const decoded = jwt.verify(token, process.env.jwt_key)
            if(!decoded.role){
                return next(ApiError.badrequest('некорректный логин'))
            }
            if(decoded.role!="ADMIN")
{
            User.findOne({where: {email:decoded.email}}).then(event=>{
            if(!event) return next(ApiError.badrequest('некорректный айди'));
            event.getClasses().then(courses=>{
               
                return res.json(courses)
               
                
            });
        });
            


}else

{

        page = page || 1
        limit = limit || 999
        let ofset =(page-1)*limit


        let classes;
        if(!letter && !number){
            classes= await Class.findAll({limit,ofset})//FindAll Находит всех, а финдэндкаунт еще и  выдает фронту количевство
        }
            else if(letter && !number){
                classes= await Class.findAll({where: {letter},limit,ofset})

            }
                else if(!letter && number){
                    classes= await Class.findAll({where: {number},limit,ofset})

                }
                    else if(letter && number){
                        classes= await Class.findAll({where: {number, letter},limit,ofset})

                    }
                        else if(letter && number){
                            classes= await Class.findAll({where: {number, letter},limit,ofset})

                        }
                    return res.json(classes)
                }
}
                catch(e)
                {
                    next(ApiError.badRequest(e.message))
                }
        }






    async getOne(req,res,next) 
    { try{
        const {id} = req.params
        const device = await Class.findOne(
            {
                where: {id},
                //include: [{model: DeviceInfo, as: 'info'}]
            },
        )
        if(device)
        return res.json(device)      
        return next(ApiError.badrequest('некорректный айди'))
        }
        catch(e)
        {
            next(ApiError.badRequest(e.message))
        }

    }
    

// вот и стало классу на год бофе
//надо реализовать удаление и редактирование классов
    async delete(req,res,next) 
    {let {id}= req.body
    try{ Class.destroy({where: {id} })
   
}
catch(e)
{
    next(ApiError.badRequest(e.message))
}


    
    }


async deleteWithStudents(req,res,next) 
{   let {id}= req.body
    try{ Class.destroy({where: {id} })
         Student.destroy({where:{class_ID:id}})
         return res.json({message: "удаление успешно"})
    }
    catch(e)
    {
        next(ApiError.badRequest(e.message))
    }
} 
   
   

async addEvent(req,res,next)
{try{  const {id, event_id } = req.body


Class.findOne({where: {id}})
.then(event=>{
    if(!event) return next(ApiError.badrequest('некорректный айди'));
     
    // добавим Тому курс по JavaScript
    Event.findOne({where: {id: event_id}})
        .then(course=>{
            if(!course) return next(ApiError.badrequest('некорректный айди'));
            event.addEvent(course, {through:{test:1}});
            return res.json({message:"направление добавлено"})
    });
    
}); }catch(e)
{
return next(ApiError.badRequest(e.message))
}}



async getEvents(req,res,next) 
{try{
    const {id } = req.body
    Class.findOne({where: {id}})
    .then(event=>{
        if(!event) return next(ApiError.badrequest('некорректный айди'));
        event.getEvents().then(courses=>{
           /* for(course of courses){
                console.log(course.name);
            }/** */
            return res.json(courses)
           
            
        });
    });
}catch(e)
{
    return next(ApiError.badRequest(e.message))
}
}







async addsomeclasses(req,res,next) 
{
    try{ 
        const {exelmassive} = req.body
//name fullname birthday group_of_risk PFDO sex number letter
let i=0;
let cls
let student
let family
if (exelmassive.length==0)
return res.json({message:"массив пуст мой царь"})

while(i<exelmassive.length){
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
module.exports= new ClassController()