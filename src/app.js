
var estoqueTotal = require ('./estoqueTotal');
const env = require('../Autenticacao/.env');

const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(env.token, { polling: true });

bot.onText(/\/estoque_total/, (ctx, match) => {
    const chatId = ctx.chat.id;
    estoqueTotal.estoque_total(ctx, bot);
})

bot.on ('text', (ctx) => {
    const chatId = ctx.chat.id;
    texto = ctx.text.split(" ");
    nome = ctx.from.first_name;
    console.log('ctx', ctx);

    var comando = texto[0];

    if (comando === '/start'){
        bot.sendMessage(chatId, nome + ", você é gay");
    }else if(comando === '/estoque_total'){

    }
});