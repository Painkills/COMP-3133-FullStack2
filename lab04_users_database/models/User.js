const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    validate(value) {
      if (value.length < 4){
         throw new Error("Username must contain at least 4 characters");
      }
    }
  },
  email: {
    type: String,
    required: true,
    //index: true, //Optional if unique is defined
    unique: [true, "A user with that Email already exists."],
    trim: true,
    lowercase: true,
    validate: (value) => {
      var regexCheck = /[a-z]+@[a-z]+\.[a-z]+/;
      return regexCheck.test(value);
    }
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    suite: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
      validate: (value) => {
        var regexCheck = /^[a-zA-Z\s]+$/;
        return regexCheck.test(value);
      }
    },
    zipcode: {
      type: String,
      required: true,
      trim: true,
      validate: (value) => {
        var regexCheck = /^\d{5}-\d{4}$/;
        return regexCheck.test(value);
      }
    },
    geo: {
      lat: {
        type: Number,
        required: true,
        trim: true
      },
      lng: {
        type: Number,
        required: true,
        trim: true
      }
    },
  },
  phone: {
    type: String,
    required: true,
    validate: (value) => {
      var regexCheck = /\d{1}-\(?\d{3}\)?-\d{3}-\d{4}/;
      return regexCheck.test(value);
    }
  },
  website: {
    type: String,
    required: true,
    validate: (value) => {
      var regexCheck = /(http)+s?(\:\/\/).*[A-Za-z0-9]+\.[A-Za-z0-9]*/;
      return regexCheck.test(value);
    }
  },
  company: {
    name: {
      type: String,
      required: true
    },
    catchPhrase: {
      type: String,
      required: true
    },
    bs: {
      type: String,
      required: true
    }
  }
});

const User = mongoose.model("User2", UserSchema);
module.exports = User;