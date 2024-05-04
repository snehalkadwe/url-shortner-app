const express = require('express');
const {
	generateShortUrl,
	getUrlAnalystic,
	getShortIdDetails,
} = require('../controllers/urlController'); // {method_names} this is called destructor
const router = express.Router();

router.post('/', generateShortUrl);
router.get('/:shortId', getShortIdDetails);
router.get('/analytics/:id', getUrlAnalystic);

module.exports = router;
