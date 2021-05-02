
const express = require('express');
let app = express();

app.get('/question', function(req, res){ 
  let myanswer = (req.query.myanswer  || "");
  res.send(`<html>
   	          <body>
  	            <form   method="get"   action="/check">
                  <label for="answer">Who invented the Web</label>
                  <input type="text" name="answer" value="${myanswer}">
                  <input type="submit" value="Send">
                </form>
              </body>
            </html>`
         );
});

app.get('/check', function(req, res) { 
  let answer = req.query.answer;
  let response = `Correct, ${answer} did`;

  if (answer !== 'Tim Berners Lee') {
    response = `Incorrect, ${answer} didn't`;
  }
  
  res.send(`<html>
  	          <body>
  	            ${response} invent the Web
  	            <br><a href="/question?myanswer=${answer}">try again</a>
              </body>
            </html>`
         );
});

app.listen(8080);

