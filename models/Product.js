const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  features: [{
    type: String,
    required: true
  }],
  specifications: {
    sensor: String,
    resolution: String,
    iso: String,
    video: String,
    display: String,
    connectivity: [String],
    battery: String,
    dimensions: String,
    weight: String
  },
  images: [{
    url: String,
    alt: String
  }],
  category: {
    type: String,
    required: true,
    enum: ['dslr', 'mirrorless', 'compact', 'action', 'drone']
  },
  brand: {
    type: String,
    required: true,
    enum: ['sony', 'canon', 'nikon', 'fujifilm', 'panasonic', 'olympus', 'leica', 'other']
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  releaseDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Create slug from name before saving
productSchema.pre('save', function(next) {
  if (this.isModified('name')) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
