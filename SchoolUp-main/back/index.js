const express = require("express");
require('dotenv').config()
const sequelize = require('./db')
const PORT =process.env.PORT || 5500;  
const app = express();
const models = require('./models/model')// потом надо будет поменять на маврмодель!!!!!!!!!!!!!!!!!!!!!!!
const cors = require('cors');
const fileUpload = require('express-fileupload')
//const XLSX = require("xlsx")
const router = require("./routes/index");
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

app.use(express.static(path.resolve(__dirname, 'static')))
app.use(cors())
//app.use(XLSX())
app.use(express.json())
app.use(fileUpload( {}))
app.use('/api', router)//работает на адресе апи, что очевидно, судя по всему можно добавить дополнительные адреса и повстраивать своих штучек



app.use(errorHandler)//Обработка ошибок, должен идти строго последним

app.get('/',(req,res)=>{
res.status(200).json({message:'соединение успешно'})//код 200 значит что все отработало как надо если чо
console.log("кто то зашел в /арi")


})

 const start = async ()=> {
try{
   await sequelize.authenticate()
  // await sequelize.sync({ force: true })
  
  //await sequelize.sync({ alter: true })
  await sequelize.sync()
    app.listen(PORT, () => console.log("server start on port ",+ PORT));



}
catch(e){
    console.log(e)
}


 }


start() 


/*
const jsonParser = express.json();
  
app.post("/user", jsonParser, function (request, response) {
    console.log(request.body);
    if(!request.body) return response.sendStatus(400);
     
    response.json(request.body); // отправляем пришедший ответ обратно
});


//var tomUser = JSON.parse(authorisations.json);
//document.write(tomUser.name);


app.get("/", function(request, response){
      
    response.sendFile(__dirname + "/index.html");
});*/
  
