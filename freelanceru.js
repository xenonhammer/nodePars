const axios = require('axios');
const iconv = require('iconv-lite')
const cheerio = require('cheerio');
const fs = require('fs')

var parsedata = [];
var index = 0;

function freelanceParser(
    data,
    url = 'https://freelance.ru/projects/?', 
    category = "spec=116", 
    pageNum = 0, 
    breakpoint = 2,
    website = 'freelance_ru'
    ) {   

    axios.get(url)
    .then(response => iconv.decode(Buffer.from(response.data), 'utf-8').toString())
    .then(response => {
        let $ = cheerio.load(response);
        $('.proj').each((i, elem) => {
            parsedata.push(
            {index : {
                'id': Math.floor(Math.random()*999999999),
                'title': $(elem).find('.p_title a span').text(),
                'link': $(elem).find('.p_title .ptitle').attr('href'),
                'price': $(elem).find('.descr .visible-xs.cost_xs').text().replace(/(Бюджет: )?(р\.)?( +)?/ig, ''),
                'description': $(elem).find('.descr p span').text().replace(/Бюджет:( +)(\d+)?( +)?(\d+)?( +)?(р\.)?(Договорная)?/mig, ''),
                'website': website
            }});
        });
        pageNum += 1    
        let page = `&page=${pageNum}`;
        url = url.replace(/(c\=[0-9]{1,3})?&page=+[0-9]{1,3}/igm, '')
        url = url + category + page
        index++

        fs.appendFile("data.json", JSON.stringify(parsedata), error => {
            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись файла завершена.");
        })  

        // console.log('data', parsedata)
        if(pageNum === breakpoint){
            return parsedata;
        };

        freelanceParser(parsedata, url, category, pageNum, breakpoint)
    })
}

 freelanceParser(parsedata)
