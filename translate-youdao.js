const axios = require('axios');
const sha256 = require('js-sha256');

const YOUDAO_FANYI_URL = 'http://openapi.youdao.com/api'
const APPID = '63d8404e4620a303'
const KEY = 'zjnPsikef88rqeEtEv8LfrjQk1HSs9ox'
const SALT = (new Date).getTime();
const CURTIME = Math.round(new Date().getTime()/1000);

const translateText = (query) => {
  const QUERY = query || 'apple'
  const SIGN = sha256(APPID+QUERY+SALT+CURTIME+KEY)
  return axios({
    method: 'post',
    url: YOUDAO_FANYI_URL,
    responseType: 'json',
    data: {
      q: QUERY,
      appKey: APPID,
      salt: SALT,
      from: 'auto',
      to: 'zh-CHS',
      curtime: CURTIME,
      sign: SIGN,
      signType: "v3"
    },
    transformResponse: [function (data) {
    // Do whatever you want to transform the data
      console.log('data', data)
      return data;
    }],
  })
}

module.exports = {
  translateText
}
