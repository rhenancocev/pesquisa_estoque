const env = require('../Autenticacao/.env');
const TelegramBot = require('node-telegram-bot-api');
// replace the value below with the Telegram token you receive from @BotFather

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(env.token, { polling: false });

module.exports = {
    enviarBoasVindas: function(ctx){
    const chatId = ctx.chat.id;
    const nome = ctx.from.first_name + ' ' + ctx.from.last_name;

    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, 'ChatId: ' + '<code>' + chatId + '</code>' +'\n\n' + 'Olá ' + nome + ', seja Bem-Vindo.'
        + '\n\n' + 'Caos tenha alguma dúvida referente aos comandos clique aqui -> /help', {parse_mode: "HTML"});

    },

    help: function(ctx){
        const chatId = ctx.chat.id;
        const nome = ctx.from.first_name;
        bot.sendMessage(chatId, nome + ", os comandos disponiveis são:"
                        + "\n\n" + "Para saber o estoque de todos os produtos, utilize o comando:"
                        + "\n" + "-> " + "/estoque_total"
                        + "\n\n" + "Para saber o estoque unitário, utilize o comando:"
                        + "\n" + "-> " + "/est <code>modelo do produto</code>" + "\n Exemplo: /est <code>IWP-001</code>", {parse_mode: "HTML"});
    },

        enviarRespostaCasoVazia: function(ctx, x, y){
        const chatId = ctx.chat.id;
        const nome = ctx.from.first_name;
        bot.sendMessage(chatId, nome + ", digite o comando " + x + " <code>" + y + "</code>." 
                                     + "\n Exemplo: " + x + " 123456789", { parse_mode: "HTML" })
        },

        enviarRespostaIfNotNumber: function(ctx, x, y){
        const chatId = ctx.chat.id;
        const nome = ctx.from.first_name;  
        bot.sendMessage(chatId, nome + ", o texto digitado: " + "<b>" + x + "</b>" 
                                     + ", não é um " + y + " válido!", { parse_mode: "HTML" } )

        },
        enviarMensagemDeEspera: function(ctx){
            const chatId = ctx.chat.id;
            const nome = ctx.from.first_name
            bot.sendMessage(chatId, 'Aguarde ' + nome + ', estamos gerando seu gráfico...');
        }

}