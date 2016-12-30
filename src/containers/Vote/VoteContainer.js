import React, { Component } from 'react'
import Vote from '../../components/Vote/Vote'

class VoteContainer extends Component {
  render() {
    return (
      <div>
        {this.props.fightData.total_rounds.map((round) => {
          let fighterVotes = 0
          let otherFighterVotes = 0
          let voted = false

          if (this.props.votes && this.props.votes.hasOwnProperty('round' + round)) {
            if (this.props.votes['round' + round].hasOwnProperty(this.props.fighterId)) {
              fighterVotes = this.props.votes['round' + round][this.props.fighterId].votes
            }

            if (this.props.votes['round' + round].hasOwnProperty(this.props.otherFighterId)) {
              otherFighterVotes = this.props.votes['round' + round][this.props.otherFighterId].votes
            }
          }

          const totalVotes = fighterVotes + otherFighterVotes
          const percentageVotes = Math.round(fighterVotes / totalVotes * 100)

          if (localStorage.getItem('hasVoted')) {
            const hasVoted = JSON.parse(localStorage.getItem('hasVoted'))
            hasVoted.forEach((fight) => {
              if (this.props.eventData.id === fight.eventId && this.props.fightData.id === fight.fightId && round === fight.round && this.props.fighterId === fight.fighterId) {
                voted = true
              }
            })
          }

          return (
            <Vote
              key={this.props.fightData.id + round}
              round={round}
              fighterVotes={fighterVotes}
              percentageVotes={percentageVotes}
              eventData={this.props.eventData}
              fightData={this.props.fightData}
              fighterId={this.props.fighterId}
              sendVote={this.props.sendVote}
              unVote={this.props.unVote}
              votesFetched={this.props.votesFetched}
              voted={voted}
            />
          )
        })}
      </div>
    )
  }
}

export default VoteContainer
