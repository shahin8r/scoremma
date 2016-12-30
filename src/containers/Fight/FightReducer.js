const initialState = {
  fights: [],
  currentEvent: null,
  fetching: false,
  fetched: false,
  rejected: false
}

const FightReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'FETCH_FIGHTS_PENDING': {
      return {
        ...state,
        fetching: true
      }
    }

    case 'FETCH_FIGHTS_REJECTED': {
      return {
        ...state,
        fetching: false,
        rejected: action.payload
      }
    }

    case 'FETCH_FIGHTS_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        fights: action.payload.fights,
        currentEvent: action.payload.currentEvent
      }
    }

    default: {
      return state
    }
  }
}

export default FightReducer
