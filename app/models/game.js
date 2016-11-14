import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: { type: String },
  icon: { type: String },
  releaseDate: { type: Date },
  description: { type: String },
  galleryImages: { type: [String] },
  galleryVideos: { type: [String] }
});

//TODO: Add validations

//TODO: Add Methods

mongoose.model('Game', GameSchema);
