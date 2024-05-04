const shortid = require('shortid');
const URL = require('../models/url');

async function generateShortUrl(req, res) {
	const body = req.body;
	// 400 status code means bad request
	if (!body.url) return res.status(400).json({ error: 'url is required' });
	const shortID = shortid();
	await URL.create({
		shortId: shortID,
		redirectURL: body.url,
		totalVisits: [],
	});

	return res.render('home', {
		id: shortID,
	});
	// return res.json({ id: shortID });
}

async function getUrlAnalystic(req, res) {
	const shortId = req.params.id;
	const result = await URL.findOne({ shortId });
	return res.json({
		totalVisits: result.totalVisits.length,
		analytics: result.totalVisits,
	});
}

async function getShortIdDetails(req, res) {
	const shortId = req.params.shortId;
	const result = await URL.findOneAndUpdate(
		{
			shortId,
		},
		{
			// $push is used because it is an array
			$push: {
				totalVisits: {
					timestamp: Date.now(),
				},
			},
		}
	);
	return res.json({ shortUrlDetails: result });
}

module.exports = {
	generateShortUrl,
	getUrlAnalystic,
	getShortIdDetails,
};
