import * as types from "../constants/actionTypes";


export const setCurrentUser = isAuthenticated => ({
  type: types.SET_CURRENT_USER,
  isAuthenticated
});

export const setError = message => ({
  type: types.SET_ERROR,
  message
});



// export const allBookDataLoad = (data, isEnd, isNew) => ({
//   type: types.ALL_BOOK_DATA_LOAD,
//   data,
//   isEnd,
//   isNew
// });

// export const bookDataLoad = (data, isEnd, isNew) => ({
//   type: types.BOOK_DATA_LOAD,
//   data,
//   isEnd,
//   isNew
// });

// export const wishDataLoad = (data, isEnd, isNew) => ({
//   type: types.WISH_DATA_LOAD,
//   data,
//   isEnd,
//   isNew
// });

// export const wishRemoveSuccess = (wishIndex, bookIndex) => ({
//   type: types.WISH_REMOVE_SUCCESS,
//   wishIndex,
//   bookIndex
// });

// export const myChatListLoad = (list) => ({
//   type: types.MY_CHAT_LIST_LOAD,
//   list
// });

// export const chatDataLoad = (messages, user) => ({
//   type: types.CHAT_DATA_LOAD,
//   messages,
//   user
// });

// export const sendMessage = (message, author) => ({
//   type: types.SEND_MESSAGE,
//   message,
//   author
// });
