'use strict';

// config and services
const config = require('../../config');
const logger = require('../../services/logging.service');
const pgService = require('../../services/pg.service');
const TABLE = config.connectors.chollometro.ddbbTable;

async function findExistingGuid(guid, channelId) {
	try {
		logger.debug(
			__filename,
			'findExistingGuid',
			'Checking if guid already exists in DDBB',
		);

		const query = {
			name: 'fetch-offers',
			text: `SELECT * FROM ${TABLE} where guid = $1 AND channel_id = $2`,
			values: [guid, channelId],
		};

		const existingDataId = await pgService.query(query);
		return existingDataId.rows;
	} catch (e) {
		logger.error(__filename, 'findExistingGuid', e);
	}
}

async function insertRecord(
	guid,
	title,
	link,
	pubDate,
	image,
	merchantName,
	price,
	contentSnippet,
	content,
	categories,
	channelId,
) {
	try {
		logger.debug(__filename, 'insertRecord', 'Inserting in ddbb new record');

		await pgService.insert(
			`
      INSERT INTO ${TABLE} (
				guid, base_url, title, url_chollo, publish_date, image,
				merchant, price, content_snippet, content, categories, channel_id
			)
      VALUES (
				'${guid}', '${config.connectors.chollometro.baseUrl}', '${title}', '${link}',
				'${pubDate}', '${image}', '${merchantName}', '${price}', '${contentSnippet}',
				'${content}', '${categories}', ${channelId}
      )
      `,
		);
	} catch (e) {
		logger.error(__filename, 'insertRecord', e);
	}
}

module.exports = {
	findExistingGuid,
	insertRecord,
};
