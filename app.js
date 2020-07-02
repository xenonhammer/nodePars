
const fs = require('fs')
const {kworkParser} = require('./models/kwork');
const freelanceParser = require('./models/freelanceru');
  

     let category = 'spec=116'
     let parseData = {};
    
freelanceParser(parseData, category)
  .then(data => {
      fs.writeFile("data.json", JSON.stringify(data, null, 2), error => {
          if(error) throw error; // если возникла ошибка
          console.log("Асинхронная запись файла завершена.");
      })
  })
  .catch(error =>
      console.log('error', error.message)
  )
  
      
  
  
  