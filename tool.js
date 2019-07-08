const cheerio = require('cheerio');

const getHotNews = (res, regExp) => {
  let hotNews = [];

  let $ = cheerio.load(res.text)
  $(regExp).each((idx, ele) => {
    let news = {
      title: $(ele).text(),
      herf: $(ele).attr('href')
    }
    hotNews.push(news)
  });

  return hotNews;
}

const getNewsContent = (res, regExp) => {
  let contents = ''

  let $ = cheerio.load(res.text)
  $(regExp).each((idx, ele) => {
    contents += $(ele).text()
  })
  return contents
}

module.exports = {
  getHotNews,
  getNewsContent
}
