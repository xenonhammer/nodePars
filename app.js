// const iconv = require('iconv-lite');

// // str = iconv.decode(Buffer.from('привет'), 'win1251');
// buf = iconv.decode(Buffer.from('РїСЂРёРІРµС‚'), 'windows-1251');
// buf1 = iconv.encode(buf, 'windows-1251');
// // console.log('str', str)
// console.log('buf', buf)
// console.log('buf1', buf1)
/////////////////////////////////////////////
// const fs = require('fs')
// const request = require('request');
// const Iconv = require('iconv').Iconv;
// request({ 
//     uri: 'https://freelance.ru/projects/?spec=116&page=1',
//     method: 'GET',
//     encoding: 'binary'
// }, function (error, response, body) {
//     body = new Buffer(body, 'binary');
//     conv = new Iconv('windows-1251', 'utf-8');
//     body = conv.convert(body).toString();
//     
//         }) 
// });
///////////////////////////////////////////////
const axios = require('axios');
const iconv = require('iconv-lite')
const cheerio = require('cheerio');
const fs = require('fs')

axios.get('https://freelance.ru/projects/?spec=116&page=1',
{
    responseType: 'arraybuffer',
    responseEncoding: 'binary'  
})
.then(response => iconv.decode(Buffer.from(response.data), 'windows-1251'))
.then(response =>{
    fs.appendFile("data.json", JSON.stringify(response), error => {
    if(error) throw error; 
    console.log("Асинхронная запись файла завершена.")})
})

  