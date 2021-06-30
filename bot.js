const TelegramBot = require('node-telegram-bot-api');
const token = '';
const bot = new TelegramBot(token, {polling: true});
const axios = require('axios')

bot.onText(/\/echo (.+)/, async (msg, match) => {
  const chatId = msg.chat.id
  const params = match[1].split(' ')
  const bus = params[0]; 
  if (!bus) {
    bot.sendMessage(chatId, 'Error: no bus ID');
  }
  const dateReq = params[1]
  if (!dateReq) {
    bot.sendMessage(chatId, 'Error: no date');
  }
  const res = await axios.get(`http://localhost:4010/getBusInfo/${bus}/${dateReq}`)
  var date = new Date(null);
  const seconds = res.data.time/1000
  console.log(res)
  date.setSeconds(seconds); 
  var time = date.toISOString().substr(11, 8);
  const resp = `Автобус: ${bus}\n\nМаршрут на карте: ${res.data.map}\n\nВремени затрачено: ${time}\n\nПройдено (метров): ${res.data.totalDistance/100}`

  bot.sendMessage(chatId, resp);
});
