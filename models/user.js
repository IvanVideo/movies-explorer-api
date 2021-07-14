const mongoose = require('mongoose');

const validateMail = /^[^@]+@[^@.]+\.[^@]+$/;

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validateMail.test(v),
      message: 'Недопустимое значение поля email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
