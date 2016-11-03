import React from 'react'
import { withRouter } from 'react-router'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import PokemonCard from './PokemonCard'

class PokemonPage extends React.Component {

  static propTypes = {
    data: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    params: React.PropTypes.object.isRequired,
  }

  render () {
    if (this.props.data.loading) {
      return (<div>Loading</div>)
    }

    return (
      <div>
        <PokemonCard pokemon={this.props.data.Pokemon} handleCancel={this.goBack}/>
      </div>
    )
  }

  goBack = () => {
    this.props.router.replace('/')
  }
}

const PokemonQuery = gql`query($id: ID!) {
    Pokemon(id: $id) {
      id
      imageUrl
      name
    }
  }
`

const PokemonPageWithData = graphql(PokemonQuery, {
  options: (ownProps) => ({
      variables: {
        id: ownProps.params.pokemonId
      }
    })
  }
)(withRouter(PokemonPage))

export default PokemonPageWithData
