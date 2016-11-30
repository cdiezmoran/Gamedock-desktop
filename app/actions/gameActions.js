import callApi from '../utils/apiCaller';

export const ADD_GAME = 'ADD_GAME';
export const ADD_GAMES = 'ADD_GAMES';
export const DELETE_GAME = 'DELETE_GAME';

export function addGame(game) {
  return {
    type: ADD_GAME,
    game,
  };
}

export function addGames(games) {
  return {
    type: ADD_GAMES,
    games,
  };
}

export function fetchGames() {
  return (dispatch) => {
    return callApi('games').then(res => {
      dispatch(addGames(res.games));
    });
  };
}
