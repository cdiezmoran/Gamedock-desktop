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

mongoose.model('Game', GameSchema);
