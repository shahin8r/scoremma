import * as firebase from 'firebase'

const getVotes = (eventId) => {
  return dispatch => {
    dispatch({
      type: 'FETCH_VOTES_PENDING',
      payload: null
    })

    firebase.database().ref('votes/events/' + eventId).on('value', snapshot => {
      dispatch({
        type: 'FETCH_VOTES_FULFILLED',
        payload: snapshot.val()
      })
    })
  }
}

const sendVote = (eventData, fightData, round, fighterId) => {
  const hasVoted = localStorage.getItem('hasVoted')

  let voteData = []

  if (hasVoted) voteData = JSON.parse(hasVoted)

  voteData.push({
    eventId: eventData.id,
    fightId: fightData.id,
    round,
    fighterId
  })

  localStorage.setItem('hasVoted', JSON.stringify(voteData))

  return dispatch => {
    dispatch({
      type: 'VOTE_PENDING',
      payload: {
        eventData,
        fightData,
        round,
        fighterId
      }
    })

    firebase.database().ref('votes/events/' + eventData.id + '/fights/' + fightData.id + '/round' + round + '/' + fighterId + '/votes').transaction((votes) => {
      return (votes || 0 ) + 1
    })
  }
}

const unVote = (eventId, fightId, round, fighterId) => {
  const hasVoted = localStorage.getItem('hasVoted')

  let voteData = []

  if (hasVoted) voteData = JSON.parse(hasVoted)

  voteData.forEach((vote, i) => {
    if (vote.eventId === eventId && vote.fightId === fightId && vote.round === round && vote.fighterId === fighterId) voteData.splice(i, 1)
  })

  localStorage.setItem('hasVoted', JSON.stringify(voteData))

  return dispatch => {
    dispatch({
      type: 'UNVOTE_PENDING',
      payload: {
        eventId,
        fightId,
        round,
        fighterId
      }
    })

    firebase.database().ref('votes/events/' + eventId + '/fights/' + fightId + '/round' + round + '/' + fighterId + '/votes').transaction((votes) => {
      if (votes > 0) return (votes) - 1
    })
  }
}

export default { getVotes, sendVote, unVote }
