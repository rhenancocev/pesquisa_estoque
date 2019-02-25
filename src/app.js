var estoqueTotal = require ('./estoqueTotal');
var estoque = require('./estoque');
const enviaMensagem = require('../Tools/enviarMensagens');
const env = require('../Autenticacao/.env');

const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(env.token, { polling: true });

bot.onText(/\/estoque_total/, (ctx, match) => {
    const chatId = ctx.chat.id;
    estoqueTotal.estoque_total(ctx, bot);
});


bot.onText(/\/est/, (ctx, match) => {
    const chatId = ctx.chat.id;
    var texto = ctx.text;
    var estoqueProduto = texto.substring(5);

    estoque.est(ctx, bot, estoqueProduto);


});

bot.on('text', (ctx) => {
    texto = ctx.text.split(" ");
    nome = ctx.from.first_name;
    console.log('ctx', ctx);

    var comando = texto[0];

    if (comando === '/start'){
        enviaMensagem.enviarBoasVindas(ctx);

    }else if(comando === '/estoque_total'){

    }else if (comando === '/est'){

    }else if(comando === '/help'){
        enviaMensagem.help(ctx);    
    }
});
