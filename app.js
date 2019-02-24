const env = require('./.env');

const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(env.token, { polling: true });


bot.on ('text', (ctx) => {
    const chatId = ctx.chat.id;

    texto = ctx.text;
    nome = ctx.from.first_name;
    var comando = texto;

    if (comando === '/start'){
        bot.sendMessage(chatId, nome + ", você é gay");
    }
});