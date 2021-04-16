const express = require('express')

const app = express()
const port = process.env.PORT || 3000;
app.listen(port,()=>{
console.log('listening on any $port');
})

app.get('/',(req,res)=> {
    res.send('hello world');
 
})


app.post('/sendEmail',(req,res)=> {

    var email = req.query.email;
    var password = req.query.password;
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
        "Messages":[{
            "From": {
                "Email": "amirbennasr@gmail.com",
                "Name": "Data Pilot"
            },
            "To": [{
                "Email": "amirbennasr@gmail.com",
                "Name": "passenger 1"
            }],
            "Subject": 'Here is your delivery Sir.',
            "HTMLPart": `<h3> Results for you Sir :<br/> Date: ${Date()}`+'<br/>'+
                        `Salad :+ ${email}`+'<br/>'+
                        `Sauce : ${password} `
        }]
    })

    request.then((val)=> {
        console.log(val.body)
    });
    res.send('email sent')

})
const mailjet = require ('node-mailjet')
.connect('09fbe114cc7074580268f5b27994a2a1', '27c571b82b01d84df468be01cf64e843')

