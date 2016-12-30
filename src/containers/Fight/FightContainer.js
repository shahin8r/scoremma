import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as firebase from 'firebase'
import firebaseConfig from '../../utils/Firebase'
import moment from 'moment'
import injectTapEventPlugin from 'react-tap-event-plugin'
import fetchFights from './FightActions'
import Fight from '../../components/Fight/Fight'
import Votes from '../Vote/VoteActions'
import Notification from '../../components/Notification/Notification'
import AppBar from 'material-ui/AppBar'
import FontIcon from 'material-ui/FontIcon'
import Chip from 'material-ui/Chip'
import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import RefreshIndicator from 'material-ui/RefreshIndicator'

firebase.initializeApp(firebaseConfig)

injectTapEventPlugin();

const storeData = (store) => {
  const data = {
    fights: store.FightReducer.fights,
    currentEvent: store.FightReducer.currentEvent,
    fightsFetched: store.FightReducer.fetched,
    fightsRejected: store.FightReducer.rejected,
    fightsFetching: store.FightReducer.fetching,
    votes: store.VoteReducer.votes,
    votesFetched: store.VoteReducer.fetched,
    votesRejected: store.VoteReducer.rejected,
    votesFetching: store.VoteReducer.fetching,
    votesSending: store.VoteReducer.sending
  }

  if (data.fights) {
    data.fights.map((fight) => {
      if (fight.is_main_event || fight.is_title_fight){
        fight.total_rounds = [1, 2, 3, 4, 5]
      } else {
        fight.total_rounds = [1, 2, 3]
      }

      return fight
    })
  }

  return data
}

const styles = {
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    margin: '0 auto 1em'
  },
  chip: {
    margin: 10
  },
  footer: {
    margin: '2em 0',
    fontSize: '12px',
    textTransform: 'uppercase',
    color: '#ccc',
    letterSpacing: '1px'
  },
  footerLink: {
    textDecoration: 'none',
    color: '#aaa'
  }
}

class FightContainer extends Component {
  componentWillMount() {
    this.props.dispatch(fetchFights())
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.votes && this.props.currentEvent !== nextProps.currentEvent) {
      this.props.dispatch(Votes.getVotes(nextProps.currentEvent.id))
    }
  }

  render() {
    let fights

    if (this.props.currentEvent) {
      const VoteActions = bindActionCreators(Votes, this.props.dispatch)

      fights = this.props.fights.map((fightData, i) => {
        const fightId = fightData.id.toString()

        let fightDescription
        if (fightData.is_main_event && fightData.is_title_fight) {
          fightDescription = 'Main Event and Title Fight'
        } else if (fightData.is_main_event) {
          fightDescription = 'Main Event'
        } else if (fightData.is_title_fight) {
          fightDescription = 'Title Fight'
        }

        return (
          <div key={i}>
            <Divider />
            <Fight
              fightDescription={fightDescription}
              eventData={this.props.currentEvent}
              fightData={fightData}
              votes={this.props.votes && this.props.votes.fights[fightId]}
              votesFetched={this.props.votesFetched}
              {...VoteActions} />
          </div>
        )
      })
    } else if (this.props.fightsFetching) {
      fights = <RefreshIndicator size={40} left={-20} top={100} status="loading" style={{marginLeft: '50%'}}/>
    } else if (this.props.fightsRejected) {
      fights = this.props.fightsRejected
    }

    return (
      <div>
        <AppBar title={this.props.fightsFetched ? this.props.currentEvent.base_title : 'ScoreMMA'} showMenuIconButton={false} style={{position: 'fixed', top: '0'}}/>

        { this.props.fightsFetched && (
          <div style={styles.chips}>
            <Chip style={styles.chip}>
              <Avatar icon={<FontIcon className="material-icons">account_balance</FontIcon>} />
              {this.props.currentEvent.arena}
            </Chip>
            <Chip style={styles.chip}>
              <Avatar icon={<FontIcon className="material-icons">place</FontIcon>} />
              {this.props.currentEvent.location}
            </Chip>
            <Chip style={styles.chip}>
              <Avatar icon={<FontIcon className="material-icons">access_time</FontIcon>} />
              {moment(this.props.currentEvent.event_date).format('lll')}
            </Chip>
          </div>
        )}

        {fights}

        {this.props.fightsFetched && (
          <div style={styles.footer}>
            <p>Made by <a href="//github.com/shahin8r" style={styles.footerLink}>shahin8r</a></p>
          </div>
        )}

        <Notification votesSending={this.props.votesSending} />
      </div>
    )
  }
}

export default connect(storeData)(FightContainer)
