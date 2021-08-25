export const ADD_TOKEN = 'ADD_TOKEN'
export const UPDATE_AUTH = 'UPDATE_TOKEN'
export const ADD_USER = 'UPDATE_USER'

const addToken = (token,state) => {
  localStorage.setItem("auth",token)
  return state
} 

const updateAuth = (state) => {
  return {
    ...state,
    currentUser:JSON.parse(localStorage.getItem("user")),
    token:localStorage.getItem("auth")
  }
}

const addUser = (user, state) => {
  localStorage.setItem("user",JSON.stringify(user))
  return state
}


export const authReducer = (state, action) => {
  switch (action.type) {
    case ADD_TOKEN:
      return addToken(action.token, state);
    case UPDATE_AUTH:
      return updateAuth(state)
    case ADD_USER:
      return addUser(action.user,state)
    default:
      return state;
  }
};