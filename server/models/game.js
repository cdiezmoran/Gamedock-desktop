import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: { type: String },
  img: { type: String },
  releaseDate: { type: Date },
  description: { type: String },
  galleryImages: { type: [String] },
  galleryVideos: { type: [String] }
});

export default mongoose.model('Game', GameSchema);
