'use strict'

const http = require('http');
const fs = require('fs');
const PORT = 3000;

http.createServer((request,response)=>{
  console.log('request:method', request.method);
  console.log('request:url',request.url);
  console.log('request:header', request.headers);
  //console.log('response', response);

  //let reqData = data.toString();
  let getInfo = request.method;
  let urlInfo = request.url;
  let headerInfo = request.header;
  let reqData = "";
  if(request.method === "GET"){
    fs.readFile(`./public/${urlInfo}`, (err, data) => {
      if(err){
        console.log('###### EEERRROOR',err);
        //fs.readFile(`./public/404.html`);
      }
      else{
       // console.log('FILE', data.toString());
        reqData = data.toString();
        console.log('new data', reqData);
        response.end(reqData);
      }
    });
  }

}).listen(PORT);