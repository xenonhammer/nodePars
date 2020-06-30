const iconv = require('iconv-lite');

str = iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');
buf = iconv.encode("Sample input string", 'win1251');
buf1 = iconv.decode(Buffer.from(buf), 'win1251');
console.log('buf', buf1)