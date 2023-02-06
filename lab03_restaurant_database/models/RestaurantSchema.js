const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  address: { 
    building: {
      type: Number
    },
    street: {
      type: String,
      trim: true
    },
    zipcode: {
      type: String,
      uppercase: true,
      trim: true
    }
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  cuisine: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  restaurant_id:{
    type: String,
    required: true
  },
  created: { 
    type: Date,
    default: Date.now
  },
  updatedat: { 
    type: Date,
    default: Date.now
  },
});

//Declare Virtual Fields
RestaurantSchema.virtual("fullAddress")
  .get(function() {
    return `${this.address.building} ${this.address.street}, ${this.city}, ${this.zipcode}`
})

//Custom Schema Methods
//1. Instance Method Declaration
RestaurantSchema.methods.getFullName = function () {
  return `${this.firstname} ${this.lastname}`
}

RestaurantSchema.methods.getFormattedSalary = function () {
  return `$${this.salary}`
}

//2. Static method declararion
RestaurantSchema.statics.getRestaurantById = function(eid) {
  return this.find({_id: eid}).select("firstname lastname salary");
}


//Writing Query Helpers
RestaurantSchema.query.sortByRestaurantId = function(flag) {
  let sortOrder = 0
  if (flag === "ASC") sortOrder = 1
  if (flag === "DESC") sortOrder = -1
  return this.sort({'restaurant_id': sortOrder})
}

RestaurantSchema.query.byCuisine = function(type) {
  return this.where({'cuisine': type})
}



RestaurantSchema.pre('save', (next) => {
  console.log("Before Save")
  let now = Date.now()
   
  this.updatedat = now
  // Set a value for createdAt only if it is null
  if (!this.created) {
    this.created = now
  }
  
  // Call the next function in the pre-save chain
  next()
});

RestaurantSchema.pre('findOneAndUpdate', (next) => {
  console.log("Before findOneAndUpdate")
  let now = Date.now()
  this.updatedat = now
  console.log(this.updatedat)
  next()
});


RestaurantSchema.post('init', (doc) => {
  console.log('%s has been initialized from the db', doc._id);
});

RestaurantSchema.post('validate', (doc) => {
  console.log('%s has been validated without saving', doc._id);
});

RestaurantSchema.post('save', (doc) => {
  console.log('%s has been saved', doc._id);
});

RestaurantSchema.post('remove', (doc) => {
  console.log('%s has been removed', doc._id);
});

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
module.exports = Restaurant;