import React, { Component } from 'react'
import Snackbar from 'material-ui/Snackbar'

class Notification extends Component {
  constructor(props) {
    super(props)
    this.state = { open: false }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.open && nextState.open
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.votesSending) {
      this.setState({ open: true })
    } else {
      this.setState({ open: false })
    }
  }

  voteNotification() {
    let notificationMessage = ''

    if (this.props.votesSending) {
      if (this.props.votesSending.fighterId === this.props.votesSending.fightData.fighter1_id) {
        notificationMessage = `You voted that ${this.props.votesSending.fightData.fighter1_first_name} ${this.props.votesSending.fightData.fighter1_last_name} won round ${this.props.votesSending.round}`
      } else if (this.props.votesSending.fighterId === this.props.votesSending.fightData.fighter2_id) {
        notificationMessage = `You voted that ${this.props.votesSending.fightData.fighter2_first_name} ${this.props.votesSending.fightData.fighter2_last_name} won round ${this.props.votesSending.round}`
      }
    }

    return notificationMessage
  }

  render() {
    return (
      <Snackbar
        open={this.state.open}
        message={this.voteNotification()}
        autoHideDuration={4000}
      />
    )
  }
}

export default Notification
