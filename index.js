
process.env.NTBA_FIX_319 = 1;

require('make-promises-safe'); // eslint-disable-line import/no-unassigned-import

const Bluebird = require('bluebird');

Bluebird.config({
	cancellation: true,
});

const yaml = require('js-yaml');

const TelegramBot = require('node-telegram-bot-api');
const Agent = require('socks5-https-client/lib/Agent');

const token = process.env.TOKEN;
const useTor = process.env.NODE_ENV !== 'production';
const socksHost = process.env.SOCKS_HOST || 'localhost';

const bot = new TelegramBot(token, {
	polling: true,
	request: useTor ? {
		agentClass: Agent,
		agentOptions: {
			socksHost,
			socksPort: 9050,
		},
	} : {},
});

bot.on('message', msg => {
	bot.sendMessage(msg.chat.id, yaml.safeDump(msg));
});

bot.on('polling_error', error => {
	console.error(error);
});
bot.on('webhook_error', error => {
	console.error(error);
});
bot.on('error', error => {
	console.error(error);
});
