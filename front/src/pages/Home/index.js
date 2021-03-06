import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import ReactLoading from 'react-loading';

import logo from '../../assets/logo.png';
import { GET_ALL_POKEMONS } from '../../graphql/queries';
import { pokemonsVar } from '../../graphql/cache';
import Pokemon from '../../components/Pokemon';
import { Title, Search, ItemsContainer, Logo, Header } from './styles';

let interval;

const Home = () => {
  const { loading, data } = useQuery(GET_ALL_POKEMONS);
  const [pokemons, setPokemons] = useState([]);
  const [search, setSearch] = useState('');
  const savedPokemons = pokemonsVar();

  useEffect(() => {
    if (savedPokemons) {
      setPokemons(savedPokemons);
    } else {
      if (!loading && data) {
        setPokemons(data.pokemons);
        localStorage.setItem('pokemons', JSON.stringify(data.pokemons));
        (function () {
          pokemonsVar(JSON.parse(localStorage.getItem('pokemons')));
        })();
      }
    }
  }, [loading, data, savedPokemons]);

  useEffect(() => {
    clearTimeout(interval);

    interval = setTimeout(() => {
      if (search.trim().length > 2) {
        const query = pokemons.filter((i) =>
          // i.name.toLowerCase().includes(search),
          i.name.includes(search)
          // console.log(i.name.includes(search))
        );

        // console.log(query);

        if (query) {
          setPokemons(query);
        }
      } else {
        if (savedPokemons) {
          setPokemons(savedPokemons);
        } else {
          if (data) {
            setPokemons(data.pokemons);
          }
        }
      }
    }, 300);
  }, [search]);

  return (
    <>
      <Header>
        <Logo src={logo} /> <Title>Pokemon Explorer</Title>
      </Header>

      <Search>
        <input
          value={search}
          data-testid="search-field"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
        />

        <button data-testid="button" onClick={() => setSearch('')}>
          Clear
        </button>
      </Search>

      <ItemsContainer>
        {loading ? (
          <ReactLoading
            type="bubbles"
            color="#bf360c"
            height="15%"
            width="15%"
          />
        ) : (
          pokemons.map((pokemon) => (
            <Pokemon key={pokemon.id} pokemon={pokemon} />
          ))
        )}
      </ItemsContainer>
    </>
  );
};

export default Home;
