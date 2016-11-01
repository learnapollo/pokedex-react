# Hierarchy

* Pokedex: welcomes trainer, shows pokedex
  * PokemonPreview: used as a preview in the pokedex, when clicked opens PokemonPage
    * PokemonPage: queries a pokemon and uses PokemonCard to present it
      * PokemonCard: shows details of an existing pokemon and provides the update/delete mutations
  * PlaceholderPreview: can be clicked to go to AddPokemonCard
    * AddPokemonCard: used to add a new pokemon
