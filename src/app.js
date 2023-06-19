'use strict';

// config and services
// const config = require('./config');
const discordService = require('./services/discord.service');
const logger = require('./services/logging.service');
const connectorService = require('./connectors/connector.service');
const { GatewayDispatchEvents } = require('@discordjs/core');

function app() {
	logger.info(__filename, 'app', 'Running APP');
	const discordClient = discordService.initDiscord();
	discordClient.once(GatewayDispatchEvents.Ready, async (c) => {
		for (const guild of c.data.guilds) {
			if (guild.id) {
				const allChannels = await c.api.guilds.getChannels(guild.id);
				const channels = {
					chollometro: {
						channel: allChannels.filter((cc) => cc.name === 'mierda-del-bot' || cc.name === '🔶ofertas🔶'),
						apiChannels: c.api.channels,
					},
				};

				for (const channel of channels.chollometro.channel) {
					await c.api.channels
						.createMessage(channel.id, {
							content: 'Chollometro',
						})
						.catch((e) => console.log('ERR', e));
				}

				connectorService.start(channels);
			}
		}
	});
}

module.exports = {
	app,
};