'use strict';

function formatChollo(cholloItem) {
	const formatedCholloItem = {};
	formatedCholloItem.guid = cholloItem.guid.trim();
	formatedCholloItem.title = cholloItem.title.replace(/'/g, ' ').trim();
	formatedCholloItem.link = cholloItem.link.trim();
	formatedCholloItem.pubDate = cholloItem.pubDate.trim();
	formatedCholloItem.image = cholloItem.image[0]['$'].url.trim();
	formatedCholloItem.merchant = '';
	formatedCholloItem.price = '';
	formatedCholloItem.contentSnippet = cholloItem.contentSnippet.replace(
		/'/g,
		' ',
	).trim();
	formatedCholloItem.content = cholloItem.content.replace(/'/g, ' ');
	formatedCholloItem.categories = JSON.stringify(cholloItem.categories).trim();

	if (
		cholloItem.merchant &&
    cholloItem.merchant[0] &&
    cholloItem.merchant[0]['$'] &&
    cholloItem.merchant[0]['$'].name
	) {
		formatedCholloItem.merchant = cholloItem.merchant[0]['$'].name.replace(
			/'/g,
			' ',
		).trim();
	}

	if (
		cholloItem.merchant &&
    cholloItem.merchant[0] &&
    cholloItem.merchant[0]['$'] &&
    cholloItem.merchant[0]['$'].price
	) {
		formatedCholloItem.price = cholloItem.merchant[0]['$'].price.trim();
	}

	return formatedCholloItem;
}

module.exports = {
	formatChollo,
};
