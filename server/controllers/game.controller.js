import Game from '../models/game';

export function getGames(req, res) {
  Game.find().exec((err, games) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ games });
  });
}
