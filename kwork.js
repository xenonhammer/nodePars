const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs')

var data = [];
var i = 0;

function kworkParser(
    data,
    url = 'https://kwork.ru/projects?', 
    category = "c=11", 
    pageNum = 0, 
    breakpoint = 10,
    website = 'kwork'
    ) {   

    axios.get(url)
    .then(response => {
        let $ = cheerio.load(response.data);
        $('.card.want-card').each((i, elem) => {
            data.push(
            {i = {
                'id': Math.floor(Math.random()*999999999),
                'title': $(elem).find('.wants-card__header-title:first-child').text(),
                'link': $(elem).find('.wants-card__header-title a').attr('href'),
                'price': $(elem).find('.wants-card__header-price.wants-card__price.m-hidden').text().replace(/[^0-9](fs12)?/ig, ''),
                'description': $(elem).find('.first-letter.hidden').text() 
                    ? $(elem).find('.first-letter.hidden').text().replace(/Скрыть/ig, '') 
                    : $(elem).find('.first-letter').text(),
                'website': website
            }});
        });
        pageNum += 1    
        let page = `&page=${pageNum}`;
        url = url.replace(/(c\=[0-9]{1,3})?&page=+[0-9]{1,3}/igm, '')
        url = url + category + page
        i++
        console.log('data', data)
        if(pageNum === breakpoint){
            return JSON.stringify(data);
        };

        kworkParser(data, url, category, pageNum, breakpoint)
    }) 
}

kworkParser(data)
