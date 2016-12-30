import axios from 'axios'
import * as firebase from 'firebase'

const isEventNow = (event) => {
  if (new Date(event.event_dategmt) <= new Date() && new Date(event.end_event_dategmt) >= new Date()) {
    return event
  } else {
    return false
  }
}

const fetchFightsFromFirebase = (callback) => {
  firebase.database().ref('events').orderByChild('event_date').limitToLast(1).on('child_added', (snapshot) => {
    const currentEvent = snapshot.val()
    const fights = Object.values(currentEvent.fights)

    const response = {
      currentEvent,
      fights
    }

    callback(response)
  })
}


const fetchFights = () => {
  // crossorigin for proxying request to avoid cors
  const getEvent = axios.get('http://crossorigin.me/http://ufc-data-api.ufc.com/api/v3/us/events/')
  const getFights = (eventId) => axios.get(`http://crossorigin.me/http://ufc-data-api.ufc.com/api/v3/us/events/${eventId}/fights`)

  return dispatch => {
    dispatch({
      type: 'FETCH_FIGHTS_PENDING',
      payload: null
    })

    return getEvent
    .then(response => response.data)
    .then((events) => {
      const currentEvent = events.filter(isEventNow)[0]

      if (currentEvent.length < 1) {
        return fetchFightsFromFirebase((response) => {
          dispatch({
            type: 'FETCH_FIGHTS_FULFILLED',
            payload: response
          })
        })
      }

      // add event to firebase
      firebase.database().ref('events/' + currentEvent.id).once('value').then((snapshot) => {
        if (snapshot.val() === null) {
          firebase.database().ref('events/' + currentEvent.id).set(currentEvent)
        }
      })

      return getFights(currentEvent.id)
      .then(response => response.data)
      .then((fights) => {
        // add fights to firebase
        firebase.database().ref('events/' + currentEvent.id + '/fights').once('value').then((snapshot) => {
          if (snapshot.val() === null) {
            fights.forEach((fight, i) => {
              firebase.database().ref('events/' + currentEvent.id + '/fights/' + fight.id).set(fight)
            })
          }
        })

        dispatch({
          type: 'FETCH_FIGHTS_FULFILLED',
          payload: {
            currentEvent,
            fights
          }
        })
      })
      .catch((error) => {
        dispatch({
          type: 'FETCH_FIGHTS_REJECTED',
          payload: { error: 'Could not get fights from UFC API' }
        })
      })
    })
    .catch((error) => {
      dispatch({
        type: 'FETCH_FIGHTS_REJECTED',
        payload: { error: 'Could not get event from UFC API' }
      })
    })
  }
}

export default fetchFights
