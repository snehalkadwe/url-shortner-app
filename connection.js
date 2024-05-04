const mongoose = require('mongoose');
mongoose.set('strictQuery', true); // this will hode warnings
async function connectToMongoDB(url) {
	return mongoose.connect(url);
}

module.exports = {
	connectToMongoDB,
};
