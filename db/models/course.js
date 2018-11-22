const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number
  },
  students: {
    type: [{ type: mongoose.Schema.Types.ObjectId }]
  }
}, {timestamps: true});

if (!schema.options.toJSON) {
	schema.options.toJSON = {};
}

schema.options.toJSON.transform = (doc, ret) => {
	ret.id = ret._id;
	delete ret._id;
	return ret;
};

module.exports = schema;