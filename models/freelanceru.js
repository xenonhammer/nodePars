const axios = require('axios');
const iconv = require('iconv-lite')
const cheerio = require('cheerio');


const freelanceParser = function(category){

    return new Promise(async (resolve, reject) => {
        let parseData = {},
            url = `https://freelance.ru/projects/?${category}`, 
            pageNum = 1, 
            breakpoint = 4,
            website = 'freelance_ru',
            index = 0;
        while(pageNum <= breakpoint){
            console.log(`${pageNum}:${url}`)
            await axios.get(url,
                {
                    responseType: 'arraybuffer',
                    responseEncoding: 'binary'  
                })
            .then(response => iconv.decode(Buffer.from(response.data), 'windows-1251'))
            .then(response => {
                let $ = cheerio.load(response);
                $('.proj').each((i, elem) => {
                    index++
                    parseData[index] = {
                        'id': Math.floor(Math.random()*999999999),
                        'title': $(elem).find('.p_title a span').text(),
                        'href': $(elem).find('.p_title .ptitle').attr('href'),
                        'price': $(elem).find('.descr .visible-xs.cost_xs').text().replace(/(Бюджет: )?(р\.)?( +)?/ig, ''),
                        'description': $(elem).find('.descr p span').text().replace(/Бюджет:( +)(\d+)?( +)?(\d+)?( +)?(р\.)?(Договорная)?/mig, ''),
                        'website': website
                    };
                });
                return response
            })
            .catch(error =>{
                reject(error)
                return error
            })
            pageNum++    
            let page = `&page=${pageNum}`;

            url = url.replace(/(spec\=[0-9]{1,3})?&page=+[0-9]{1,3}/igm, '') + category + page;
        }
        console.log('Возвращаем данные\n')
        resolve(parseData);
    })
}
module.exports = freelanceParser;