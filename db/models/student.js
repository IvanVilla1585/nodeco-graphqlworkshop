const mongoose = require('mongoose')

const STATUS = ['ACTIVE', 'INACTIVE']

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  average: {
    type: Number,
    default: 0.0
  },
  status: {
    type: String,
    enum: STATUS,
    default: STATUS[0],
  },
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