'use strict';

// libs
const { REST } = require('@discordjs/rest');
const { WebSocketManager } = require('@discordjs/ws');
const { Client } = require('@discordjs/core');

const { EmbedBuilder } = require('@discordjs/builders');

// config and services
const config = require('./../config');
const logger = require('./logging.service');

function initDiscord() {
	try {
		logger.info(__filename, 'initDiscord', 'Starting and login Discord Client');
		const rest = new REST({ version: '10' }).setToken(config.discord.apiKey);
		const gateway = new WebSocketManager({
			token: config.discord.apiKey,
			intents: 0,
			rest,
		});

		const discordClient = new Client({ rest, gateway });

		gateway.connect();

		return discordClient;
	} catch (e) {
		logger.error(__filename, 'initDiscord', e);
	}
}

function sendRichEmbed(richEmbed) {
	try {
		logger.info(__filename, 'sendRichEmbed', `Sending RichEmbed ${JSON.stringify(richEmbed)}`);
		const myRichEmbed = new EmbedBuilder();
		myRichEmbed.setAuthor(richEmbed.author ? { name: richEmbed.author } : null);
		myRichEmbed.setColor(richEmbed.color || null);
		myRichEmbed.setDescription(richEmbed.desc || null);
		myRichEmbed.setFooter(richEmbed.footer ? { text: richEmbed.footer[0] || '' } : null);
		myRichEmbed.setThumbnail(richEmbed.thumbnail || null);
		myRichEmbed.setTimestamp(richEmbed.timestamp || null);
		myRichEmbed.setTitle(richEmbed.title || null);
		myRichEmbed.setURL(richEmbed.URL || null);
		return myRichEmbed;
	} catch (e) {
		console.error(e);
		logger.error(__filename, 'sendRichEmbed', e);
	}
}

module.exports = {
	initDiscord,
	sendRichEmbed,
};
