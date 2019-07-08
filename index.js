const express = require('express');
const superagent = require('superagent');
const { getHotNews, getNewsContent } = require('./tool');
// const { translateText } = require('./translate')
const { translateText } = require('./translate-youdao')

const app = express();

let hotNews = []

// 百度热点新闻
superagent.get('https://www.itworldcanada.com/news').end((err, res) => {
  if (err) {
    console.log('抓取失败 ->', err)
  } else {
    hotNews = getHotNews(res, 'div.module-category div.list-story ul li a')
    hotNews = hotNews.map(item => {
      console.log('item',item)
      // 新闻详情内容
      superagent.get('https://www.itworldcanada.com/article/canadian-telecom-summit-debates-policies-and-competition/418858').end((err, response) => {
        if (err) {
          console.log('抓取失败 ->', err)
        } else {
          const content = getNewsContent(response, 'div.entry-content > p')
          item.content = content
        }
      })
      return item;
    })
  }
})



app.get('/', function(req, res){
  // 百度api id未授权，测试未通过
  // translateText().then(response => {
  //   res.send(response.data)
  // })
  res.send(hotNews)
})

app.listen(4000, function() {
  console.log('App is running at http://localhost:3000')
})
