'use strict';

// config and services
const chollosConnector = require('./chollometro/chollometro.connector');
const config = require('../config');
const logger = require('../services/logging.service');

function _connectorConfigMapper({ handler, name }) {
	try {
		logger.debug(__filename, '_connectorConfigMapper', 'Mapping');
		return {
			enabled: config.connectors[name].enabled,
			handler,
			name: config.channels[name],
			timeout: config.connectors[name].timeout,
		};
	} catch (e) {
		logger.error(__filename, '_connectorConfigMapper', e);
	}
}

function _loadConnectorsConfig() {
	try {
		logger.debug(__filename, '_loadConnectorsConfig', 'Loading connectors config');
		return [{ handler: chollosConnector, name: config.channels.chollometro }].map(_connectorConfigMapper);
	} catch (e) {
		logger.error(__filename, '_loadConnectorsConfig', e);
	}
}

function _scheduleConnector(connector, channel) {
	try {
		logger.debug(__filename, '_scheduleConnector', 'Scheduling connectors');
		setTimeout(async () => {
			await connector.handler.startConnector(channel);
			_scheduleConnector(connector, channel);
		}, connector.timeout);
	} catch (e) {
		logger.error(__filename, '_scheduleConnector', e);
	}
}

function start(channels) {
	try {
		logger.info(__filename, 'start', 'Initializing connectors');
		_loadConnectorsConfig().forEach((connector) => {
			connector.enabled ? _scheduleConnector(connector, channels[connector.name]) : '';
		});
	} catch (e) {
		logger.error(__filename, 'start', e);
	}
}

module.exports = {
	start,
};
