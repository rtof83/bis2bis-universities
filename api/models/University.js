import mongoose from 'mongoose';

const University = mongoose.model('University', {
  alpha_two_code: String,
  web_pages: Array,
  name: String,
  country: String,
  domains: Array,
  'state-province': String
});

export default University;
