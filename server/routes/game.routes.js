import { Router } from 'express';
import * as GameController from '../controllers/game.controller';
const router = new Router();

// Get all Posts
router.route('/games').get(PostController.getGames);
