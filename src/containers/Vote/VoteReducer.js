const initialState = {
  votes: null,
  fetching: false,
  fetched: false,
  sending: false
}

const VoteReducer = (state=initialState, action) => {
  switch (action.type) {
    case 'FETCH_VOTES_PENDING': {
      return {
        ...state,
        fetching: true
      }
    }

    case 'FETCH_VOTES_FULFILLED': {
      return {
        ...state,
        fetching: false,
        fetched: true,
        votes: action.payload
      }
    }

    case 'VOTE_PENDING': {
      return {
        ...state,
        fetching: true,
        sending: action.payload
      }
    }

    case 'UNVOTE_PENDING': {
      return {
        ...state,
        sending: false,
        fetching: true
      }
    }

    default: {
      return state
    }
  }
}

export default VoteReducer
