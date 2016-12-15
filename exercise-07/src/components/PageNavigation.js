import React from 'react'

export default class PageNavigation extends React.Component {

  static propTypes = {
    onClick: React.PropTypes.func.isRequired,
    isPrevious: React.PropTypes.bool.isRequired,
  }

  render () {
    return (
      <div
        onClick={this.props.onClick}
        style={{ minWidth: 200 }}
        className='link dim mw4 ma2 flex justify-center items-center'
      >
        <div className='silver tc v-mid fw4 f1 pointer'>{this.props.isPrevious ? '<' : '>'}</div>
      </div>
    )
  }
}
