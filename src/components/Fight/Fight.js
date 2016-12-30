import React, { Component } from 'react'
import Fighter from '../Fighter/Fighter'

const styles = {
  fight: {
    maxWidth: '800px',
    margin: '1em auto',
    textAlign: 'center'
  },
  fightDescription: {
    padding: '0 10px'
  }
}

class Fight extends Component {
  render() {
    const fightData = this.props.fightData

    return (
      <div key={fightData.id} style={styles.fight}>
        { this.props.fightDescription && <h1 style={styles.fightDescription}>{this.props.fightDescription}</h1>}
        <Fighter
          fighterId={fightData.fighter1_id}
          otherFighterId={fightData.fighter2_id}
          profileImage={fightData.fighter1_profile_image}
          firstName={fightData.fighter1_first_name}
          lastName={fightData.fighter1_last_name}
          weight={fightData.fighter1weight}
          record={fightData.fighter1record}
          fighter1={true}
          {...this.props}
        />
        <Fighter
          fighterId={fightData.fighter2_id}
          otherFighterId={fightData.fighter1_id}
          profileImage={fightData.fighter2_profile_image}
          firstName={fightData.fighter2_first_name}
          lastName={fightData.fighter2_last_name}
          weight={fightData.fighter2weight}
          record={fightData.fighter2record}
          fighter2={true}
          {...this.props}
        />
      </div>
    )
  }
}

export default Fight
