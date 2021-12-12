import { SET_SONG, ADD_SONG } from '../utils/constants';

const songReducer = (state = {}, action) => {
  const { songs } = action;
  switch (action.type) {
    case SET_SONG:
        if (songs) {
         return songs
        } else {
          return null
        }
    case ADD_SONG:
      return {
        ...state,
        next: songs.next,
        items: [...state.items, ...songs.items]
      };
    default:
      return state;
  }
};

export default songReducer;