var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  phone: String
});

var listingSchema = mongoose.Schema({
  id: Number,
  street: String,
  status: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  sq_ft: Number,
  lat: Number,
  ing: Number,
})

User = mongoose.model('User', userSchema);
Listing = mongoose.model('Lising', listingSchema);

module.exports = {
    User:User,
    Listing: Listing
};
