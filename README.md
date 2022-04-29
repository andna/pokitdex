## Getting Started

First, install the node module packages the development server:

```bash
npm install
# or
yarn install
```

Then, run the Pok'it Dex.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Decitions Taken


- The pokemon api delivers 2 types of pokemon Info:
  1. List with Pokemons names. `{ name: 'charizard', url:'apiUrlForCharizard'}`
  1. Individual info for each Pokemon with all its data: `{name: 'charizard-mega-x', species: { name: 'charizard'}, etc... }`
  - For this reason, I decided to have a first load of the list (i), but just show an specific amount of Pokemon for the first page.
    - Each Pokemon loads indivualy its data (ii) to fill their own card.
- `PokemonCard.tsx` is a component which works both for:
  - The cards shown in the paginated list of pokemons.
  - The inner card showing all the info when access to the individual page.
      - This info is not rendered while the card is in "list mode".
- Added headings to Group Pokemons in Generations according to their index, (from 10 000 and up it's for Alternative Forms).


- For adding Pokemon:
  - Used 3 kinds of LocalStorage variables:
    1. One with the customized array of Pokemons, with the customly added pokemons "unshifted" at the beginnig.
    1. Individual variables for each Custom Pokemon added 
        - Almost identical to the individually loaded data for each Pokemon (ii). 
    1. One counter to know the current "length" of the custom pokemons added.
  - Added it's own Custom Heading at the beginning of the pokemon list.
  - Added a deleter inside the Custom Pokemons individual page, deleting its trace from the 3 LocalStorage variables.
  


- Nice-To-Haves started but decided not to be published in this release cause of their lack of priority:
  - Search & Filter Pokemons
  - Animate sprites on hover or inner page based on these: [these](https://l-lin.github.io/font-awesome-animation/#animation-list) 
  
  
