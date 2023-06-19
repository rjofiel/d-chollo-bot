'use strict';

// libs
const { Pool } = require('pg');

// config and services
const config = require('../config');
const logger = require('./logging.service');

const pool = new Pool({
	user: config.postgreSQL.user,
	host: config.postgreSQL.host,
	database: config.postgreSQL.database,
	password: config.postgreSQL.password,
	port: config.postgreSQL.port,
});
async function query(queryToRun) {
	try {
		logger.debug(__filename, 'query', `Querying ${queryToRun}`);
		const client = await pool.connect();
		const fetch = await client.query(queryToRun);
		client.release();
		return fetch;
	} catch (e) {
		logger.error(__filename, 'query', e);
	}
}

async function insert(queryToRun) {
	try {
		logger.debug(__filename, 'Insert', `Querying ${queryToRun}`);
		const inserted = await pool.query(queryToRun);
		return inserted;
	} catch (e) {
		logger.error(__filename, 'Insert', e);
	}
}

module.exports = {
	pool,
	query,
	insert,
};
