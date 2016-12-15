import React from 'react'
import styled from 'styled-components'

const Title = styled.div`
  color: #7F7F7F;
  font-size: 32px;
  font-weight: 300;
`

export default class Pokedex extends React.Component {

  render () {
    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <Title className='tc pa5'>
          Hey, there are 0 Pokemons in your pokedex
        </Title>
      </div>
    )
  }
}
