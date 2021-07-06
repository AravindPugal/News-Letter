const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});



app.post("/", (req, res) => {
  const https = require("https");
  let firstName = req.body.firstname;
  let lastName = req.body.lastname;
  let email = req.body.mail;
  console.log(firstName, lastName, email);
  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }]
  };//data
  const jsonData = JSON.stringify(data);
  const url = "https://us2.api.mailchimp.com/3.0/lists/22db106700";
  const option = {
    method: "POST",
    auth: "api-key"
  };
  const mailchimpReq = https.request(url, option, (mailchimpRes) => {
    if (mailchimpRes.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    }
    else {
      res.sendFile(__dirname + "/failure.html");
    }
  });
  // mailchimpReq.write(jsonData);
  mailchimpReq.end();

});//post end

app.post("/failure.html", (req, res) => {
  res.redirect("/");
});


app.listen(3000, () => {
  console.log("i am listening");
});



//API-KEY 99656e33bab80d9cabcde2ced72bb78bd122c48372-us2
//list id 22db106700
