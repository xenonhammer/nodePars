const axios = require('axios');
const cheerio = require('cheerio');

const kworkParser = function(category){   
    return new Promise( async (resolve, reject) => {
        let parseData = {},
            url = `https://kwork.ru/projects?${category}`, 
            pageNum = 1, 
            breakpoint = 6,
            website = 'kwork',
            index = 0

        while (pageNum <= breakpoint){
            console.log(`${pageNum}:${url}`)
            await axios.get(url) 
            .then(response => {
                let $ = cheerio.load(response.data);
                $('.card.want-card').each((i, elem) => {
                    index++;
                    parseData[index] = {
                        'id': Math.floor(Math.random()*999999999),
                        'title': $(elem).find('.wants-card__header-title:first-child').text(),
                        'href': $(elem).find('.wants-card__header-title a').attr('href'),
                        'price': $(elem).find('.wants-card__header-price.wants-card__price.m-hidden').text().replace(/[^0-9](fs12)?/ig, ''),
                        'description': $(elem).find('.first-letter.hidden').text() 
                            ? $(elem).find('.first-letter.hidden').text().replace(/Скрыть/ig, '') 
                            : $(elem).find('.first-letter').text(),
                        'website': website
                    };

                });
            })
            .catch(error =>{
                return reject(error);
            });
            pageNum += 1    
            let page = `&page=${pageNum}`;
            
            url = url.replace(/(c\=[0-9]{1,3})?(&page=+[0-9]{1,3})?/igm, '') + category + page;
        }
        console.log('Возвращаем данные')
        resolve(parseData)
    })
}
module.exports = kworkParser;