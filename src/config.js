'use strict';

require('dotenv').config();

module.exports = {
	botName: 'Sr.Ludox',
	channels: {
		chollometro: 'chollometro',
	},
	discord: {
		apiKey: process.env.DISCORD_APIKEY,
	},
	connectors: {
		maxDescriptionChars: 200,
		chollometro: {
			baseUrl: 'https://www.chollometro.com',
			ddbbTable: 'chollometro',
			enabled: JSON.parse(process.env.CONNECTORS_CHOLLOMETRO_ENABLED),
			messageColor: [255, 121, 0],
			timeout: parseInt(process.env.CONNECTORS_CHOLLOMETRO_TIMEOUT, 10), // in ms
			url: 'https://www.chollometro.com/rss/populares',
		},
	},
	logLevel: process.env.LOG_LEVEL || 'debug',
	postgreSQL: {
		host: process.env.PGHOST,
		password: process.env.PGPASSWORD,
		user: process.env.PGUSER,
		database: process.env.PGDATABASE,
		port: process.env.PGPORT,
	},
};
