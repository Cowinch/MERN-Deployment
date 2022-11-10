const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [
			true,
			"name is Required"
		],
		min: [3, 'must be longer than 3 characters']
	},
	image: {
		type: String,
		required: [
			true,
			"image is Required"
		],
		min: [3, 'must contain an image']
	},
	treasure: {
		type: String,
		required: [
			true,
			"treasure is Required"
		],
		min: [0, 'must list quantity of treasure']
	},
	catchPhrases: {
		type: String,
		required: [
			true,
			"catch phrases are Required"
		],
		min: [3, 'must be longer than 3 characters']
	},
	position: {
		type: String,
		required: [
			true,
			"Position is Required"
		],
	},
	pegLeg: {
		type: Boolean,
		required: [
			true,
		],
	},
	eyePatch: {
		type: Boolean,
		required: [
			true,
		],
	},
	hookHand: {
		type: Boolean,
		required: [
			true,
		],
	},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;