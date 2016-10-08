'use strict'

const http = require('http');
const fs = require('fs');
const qs = require('querystring');
const PORT = 3000;

http.createServer((request,response)=>{
  console.log('requesturl######:',request.url);
  console.log('method####', request.method);

  //let reqData = data.toString();
  let getInfo = request.method;
  let urlInfo = request.url;


  let type = 'html';

  if(urlInfo === "/"){
    urlInfo = "/index.html";

  }
  else if(urlInfo.split(".")[1] === "css"){
    console.log("CSS", urlInfo);
    urlInfo ="/css/styles.css";
    type = "css";
  }

    if(request.method === "GET"){
      fs.readFile(`./public${urlInfo}`, (err, data) => {
        if(err){
          fs.readFile(`./public/404.html`);
          response.writeHead(404, {
            "Content-Type": `text/html`,
            "Content-Length": err.toString().length
          });
        }
        else{
          //console.log("data",data);
          response.writeHead(200, {
            "Content-Type": `text/${type}`,
            "Content-Length": data.toString().length
          });
            response.write(data.toString());
          response.end();
        }
      });
    }



    if(request.method === "POST"){
      request.on('data', (data)=>{



        let elementPost;
        elementPost = data.toString();
        let parsedData = qs.parse(elementPost);
        const fileName = './public/'+parsedData.elementName.toLowerCase() + '.html';
      let html = `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>The Elements - ${parsedData.elementName}</title>
          <link rel="stylesheet" href="/css/styles.css">
        </head>
        <body>
          <h1>${parsedData.elementName}</h1>
          <h2>${parsedData.elementSymbol}</h2>
          <h3>Atomic number ${parsedData.elementAtomicNumber}</h3>
          <p>${parsedData.elementDescription}.</p>
          <p><a href="/">back</a></p>
        </body>
        </html>
        `;

      fs.writeFile(fileName, html, (err)=>{
        if (err){
          response.end(err.message);

        }else{

          let statusCode = 200;

          response.writeHead(statusCode, {
            'Content-Type': 'application/json',
          });
          response.end(JSON.stringify({'success':true}));
        }
      });

    });
  }


}).listen(PORT);