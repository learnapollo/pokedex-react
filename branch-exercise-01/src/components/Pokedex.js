import React from 'react'

export default class Pokedex extends React.Component {

  render () {
    return (
      <div className='w-100 bg-light-gray min-vh-100'>
        <div className='tc pt4'>
          Hey, there are 0 Pokemons in your pokedex
        </div>
      </div>
    )
  }
}
