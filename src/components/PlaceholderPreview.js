import React from 'react'
import { Link } from 'react-router'

export default class PlaceholderPreview extends React.Component {

  static propTypes = {
    trainerId: React.PropTypes.string.isRequired,
  }

  render () {
    return (
      <Link to={`/create/${this.props.trainerId}`}>
          <img src='https://cdn0.iconfinder.com/data/icons/math-business-icon-set/93/1_1-128.png' alt='Create a new Pokemon' className='w-10' />
          Create new Pokemon
      </Link>
    )
  }
}
