import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon'
import CircularProgress from 'material-ui/CircularProgress'
import { red500 } from 'material-ui/styles/colors'

const style = {
  round: {
    display: 'block',
    margin: '2em auto 0 auto',
    width: '200px',
    boxShadow: 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px'
  },
  votes: {
    padding: '5px'
  },
  percentage: {
    color: '#ccc'
  },
  button: {
    borderRadius: 0,
    background: '#aaa'
  },
  buttonVoted: {
    borderRadius: 0,
    background: red500
  }
}

class Vote extends Component {
  render() {
    return (
      <div style={style.round}>
        <div style={style.votes}>
          {this.props.votesFetched ? (
            <div>
              <b>{this.props.fighterVotes}<span style={style.percentage}> / {this.props.percentageVotes >= 0 ? this.props.percentageVotes : 0}%</span></b>
            </div>
          ) : <CircularProgress size={18} />}
        </div>

        <RaisedButton
          label={'Round ' + this.props.round}
          fullWidth={true}
          labelColor={'#fff'}
          buttonStyle={this.props.voted ? style.buttonVoted : style.button}
          onTouchTap={() => {
            if (this.props.voted) {
              this.props.unVote(this.props.eventData.id, this.props.fightData.id, this.props.round, this.props.fighterId)
            } else {
              this.props.sendVote(this.props.eventData, this.props.fightData, this.props.round, this.props.fighterId)
            }
          }}
          icon={<FontIcon className="material-icons">add</FontIcon>}
        />
      </div>
    )
  }
}

export default Vote
