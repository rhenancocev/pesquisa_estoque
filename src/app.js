var estoqueTotal = require ('./estoqueTotal');
var estoque = require('./estoque');
const enviaMensagem = require('../Tools/enviarMensagens');
const funcoes = require('../Tools/funcoes');
const env = require('../Autenticacao/.env');
const acesso = require('../Autenticacao/acesso');

const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(env.token, { polling: true });
var pessoasAutorizadas = acesso.pessoasAutorizadas;

bot.onText(/\/estoque/, (ctx, match) => {
    const chatId = ctx.chat.id;
    var texto = ctx.text;
    var estoqueProduto = texto.substring(9);
    var autorizado = funcoes.autorizacao(pessoasAutorizadas, chatId);
    const x = '/estoque';
    const y = 'Modelo do Produto';

    if (estoqueProduto === ''){
        enviaMensagem.enviarRespostaCasoVazia(ctx, x, y);
    } if (autorizado){
        estoque.est(ctx, bot, estoqueProduto);
    }else{
        funcoes.autorizacaoNegada(ctx);
        
    }
});

bot.onText(/\/Estoque_total/, (ctx, match) => {
    const chatId = ctx.chat.id;
    var autorizado = funcoes.autorizacao(pessoasAutorizadas, chatId);

    if (autorizado){
        estoqueTotal.estoqueTodos(ctx,bot);
    }else{
        funcoes.autorizacaoNegada(ctx);
        
    }
});

bot.on('text', (ctx) => {
    texto = ctx.text.split(" ");
    nome = ctx.from.first_name;
    console.log('ctx', ctx);

    var comando = texto[0];

    if (comando === '/start'){
        enviaMensagem.enviarBoasVindas(ctx);

    }else if(comando === '/Estoque_total'){

    }else if (comando === '/estoque'){

    }else if(comando === '/help'){
        enviaMensagem.help(ctx);    
    }
});
