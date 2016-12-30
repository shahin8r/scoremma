import React, { Component } from 'react'
import Votes from '../../containers/Vote/VoteContainer'
import { Card, CardMedia, CardTitle } from 'material-ui/Card'

const styles = {
  card: {
    width: '300px',
    display: 'inline-block',
    margin: '2em 10px',
    paddingBottom: '2em'
  },
  avatar: {
    background: '#000'
  }
}

class Fighter extends Component {
  render() {
    return (
      <Card style={styles.card}>
        <CardMedia overlay={<CardTitle title={this.props.record} />}>
          <img style={styles.avatar} src={this.props.profileImage} role="presentation" />
        </CardMedia>
        <CardTitle title={this.props.firstName + ' ' + this.props.lastName} subtitle={this.props.weight + 'lbs'} />

        <Votes fighter1={this.props.fighter1} fighterId={this.props.fighterId} otherFighterId={this.props.otherFighterId} {...this.props}/>
      </Card>
    )
  }
}

export default Fighter
