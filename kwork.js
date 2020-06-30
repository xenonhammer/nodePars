const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

var parseData = [];

function kworkParser(
    parseData,
    category = "c=11", 
    url = `https://kwork.ru/projects?${category}`, 
    pageNum = 1, 
    breakpoint = 10,
    website = 'kwork',
    index = 0
    ) {   

    axios.get(url)
    .then(response => {
        let $ = cheerio.load(response.data);
        $('.card.want-card').each((i, elem) => {
            index++ 
            parseData.push(
            {[index] : {
                'id': Math.floor(Math.random()*999999999),
                'title': $(elem).find('.wants-card__header-title:first-child').text(),
                'href': $(elem).find('.wants-card__header-title a').attr('href'),
                'price': $(elem).find('.wants-card__header-price.wants-card__price.m-hidden').text().replace(/[^0-9](fs12)?/ig, ''),
                'description': $(elem).find('.first-letter.hidden').html() 
                    ? $(elem).find('.first-letter.hidden').html().replace(/Скрыть/ig, '') 
                    : $(elem).find('.first-letter').html(),
                'website': website
            }});
        });
        pageNum += 1    
        let page = `&page=${pageNum}`;
        url = url.replace(/(c\=[0-9]{1,3})?&page=+[0-9]{1,3}/igm, '')
        url = url + category + page

        fs.writeFile("data.json", JSON.stringify(parseData, null, 2), error => {
            if(error) throw error; // если возникла ошибка
            console.log("Асинхронная запись файла завершена.");
        })

        if(pageNum === breakpoint){
            return JSON.stringify(parseData);
        };
        kworkParser(parseData, category, url, pageNum, breakpoint, null, index)
    }) 
}

kworkParser(parseData)
