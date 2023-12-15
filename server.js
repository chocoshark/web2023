var express = require("express");
var bodyParser = require("body-parser");

server = express();
var fs = require("fs");

server.use(express.static("magichoco"));//web root
//server.use(express.static("md110"));//web root
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());

// const fileUpload = require("express-fileupload");
// server.use(fileUpload())
const formidable  = require('formidable')
 


var DB = require("nedb-promises");
var ContactDB = DB.create("contact.db");
var PortfolioDB = DB.create("portfolio.db");
// PortfolioDB.insert([ 插入資料庫
//     {href: "#portfolioModal1",imgSrc:"img/mc.jpg",title:"魔法戀愛巧",title2:"初戀是什麼感覺？啊你沒初戀？來吃看看這塊巧克力吧！甜中帶苦，苦盡甘來……這就是初次戀愛的滋味鴨……！！"},
//     {href: "#portfolioModal1",imgSrc:"img/mcc.jpg",title:"魔法松露",title2:"圓圓可愛的松露裡面裝滿不同內餡，奶油、果仁、焦糖、棉花糖……還有大人口味的利口酒能選擇鴨！"},
//     {href: "#portfolioModal1",imgSrc:"img/mcs.jpg",title:"魔法生巧",title2:"滑順絲絨、新鮮似奶油的柔軟口感，入口即化，彷彿在吃軟綿綿少女的臉頰鴨～～"},
//     {href: "#portfolioModal1",imgSrc:"img/mcsc.jpg",title:"魔法馬卡龍",title2:"外酥內軟甜滋滋、口感紮實，又香又甜，有圓形、心型不同形狀，想要買來告白也可以鴨！"},
// ])
 
 
//var sharp=
server.set("view engine", "ejs");
server.set("views", __dirname+"/views");


server.post("/contact",   function(req, res){
    //res.send("");
    // 連結留言板插入資料庫
      console.log(req.body);
    ContactDB.insert(req.body);
      res.send();
     res.redirect("/index.html");

    res.send("");
    //var form = formidable({maxFileSize: 200*1024});
     const form = new formidable.IncomingForm();
    // form.maxFileSize = 200*1024;
   
//   新增圖片上傳(未做)
     form.parse(req, function (err,fields,files){
        console.log(fields);
        console.log(files);
        fs.renameSync(files.imgSrc.filepath, "Bs5_Vue/upload/"+files.imgSrc.originalFilename);
        var newData = fields;
        newData.imgSrc = "upload/"+files.imgSrc.originalFilename;
        PortfolioDB.insert(newData);
        res.redirect("/");
     });
    
});

server.get("/contact",   function(req, res){
    
    
    //var form = formidable({maxFileSize: 200*1024});
    const form = new formidable.IncomingForm();
    // form.maxFileSize = 200*1024;
     form.parse(req, function (err,fields,files){
        console.log(fields);
        console.log(files);
        
      
        res.redirect("/");
     });
 
})
   

    //email to manager
    //res.send();
  

server.get("/service", function(req, res){

    Services = [
        { icon: "fa-shopping-cart", title: "E-Commerce", desc: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur porro laborum fuga repellat necessitatibus corporis nulla, in ex velit recusandae obcaecati maiores, doloremque quisquam similique, tempora aspernatur eligendi delectus! Rem." },
        { icon: "fa-laptop", title: "Responsive Design", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime qua architecto quo inventore harum ex magni, dicta impedit." },
        { icon: "fa-lock", title: "Web Security", desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit." }
    ]
    res.send(Services);
})

server.get("/portfolio", function(req, res){
    //res.send("U Got it!");
//  找到資料庫裡的資料(介紹巧克力)
    PortfolioDB.find({}).then(results => {
        if(results !=null){
            res.send(results);
        }else{
            res.send("Error!")
        }
    }) 
    //   res.send(portfolio);
})


 



server.listen(5500, function(){
    console.log("Server is running at port 8000!")
})