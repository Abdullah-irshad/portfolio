const express =  require("express");
const bodyParser =  require("body-parser");
// const request = require("request");
// const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();

const port = 3000;

app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended: true}));

var ApiKey =

mailchimp.setConfig({
    apiKey : ApiKey,
    server : "us20"
})



app.listen(process.env.PORT || port, ()=> console.log('app listen at port ${port}'));

app.get("/",function(req,res){

    res.sendFile(__dirname+"/index.html")

})

app.get("/about", function(req,res){
    res.sendFile(__dirname+"/About.html")
})

app.get("/contact", function(req,res){
    res.sendFile(__dirname+"/contact.html")
})
app.get("/blog", function(req,res){
    res.sendFile(__dirname+"/blog.html")
})
app.post("/",function (req,res){

    var fname = req.body.fname
    var email = req.body.email

    const listId = "337641f1f5";
    // const url = "https://us20.api.mailchimp.com/3.0/lists/"+listId;

    var code = "";

    const data = {
        email_address : email,
        status : "subscribed",
        merge_fields : {
            FNAME : fname
        }
    }


      const run = async () => {
          const response = await mailchimp.lists.batchListMembers(listId,{
              members : [data]
          })

          console.log(response)
          code = response.total_created;
      }

      run();

    res.sendFile(__dirname+"/index.html")

    // const data = {
    //     email_address : email,
    //     status : "subscribed",
    //     merge_fields : {
    //         FNAME :fname,
    //         LNAME : sname
    //     }
    // }

    // const jsonData = JSON.stringify(data);

    // const option = {
    //     method : "POST",
    //     auth : "Abdullah:"+ApiKey
    // }

    // const request =  https.request(url, option, function(response){
    //     response.on("data", function(data){
    //         console.log(JSON.parse(data))
    //     })
    // })

    // request.write(jsonData)
    // request.end()




})

// api key 

// list id 
// 337641f1f5
