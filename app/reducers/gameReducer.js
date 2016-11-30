import { ADD_GAME, ADD_GAMES, DELETE_GAME } from '../actions/gameActions';

// Initial State
const initialState = { data: [] };

const GameReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAME :
      return {
        data: [action.game, ...state.data],
      };

    case ADD_GAMES :
      return {
        data: action.games,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all games
export const getGames = state => state.games.data;

export default GameReducer;
