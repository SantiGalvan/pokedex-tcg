import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLoader } from "../../contexts/LoaderContext";

const PokedexIndex = () => {

    const [pokemonDetail, setPokemonDetail] = useState();

    const { loader, setLoader } = useLoader();

    const fetchPokemon = async () => {
        try {

            // Setto il loader a true
            setLoader(true);

            const res = await axios.get('https://pokeapi.co/api/v2/pokemon/');
            const pokemonList = res.data.results;

            // Ottieni dettagli per ogni Pokémon
            const detailedPokemons = await Promise.all(

                pokemonList.map(async (pokemon) => {
                    const details = await axios.get(pokemon.url);
                    return details.data;
                })

            );

            // Creo una nuova variabile dove aggiungerò i tipi con nome e immagine
            const resolvedPokemons = await Promise.all(

                detailedPokemons.map(async (pokemon) => {

                    const dataTypes = await Promise.all(

                        pokemon.types.map(async ({ type }) => {

                            // Prendo tutti i tipi
                            const typeRes = await axios.get(type.url);

                            // Cerco l'immagine per ogni tipo, se c'è, se no metto ''
                            const image = typeRes.data.sprites?.['generation-viii']?.['sword-shield']?.name_icon || '';

                            // restituisco un oggetto con nome e immagine
                            return { name: type.name, image }
                        })

                    );

                    // Al vecchio oggetto aggiungo i datTypes creati da me
                    return { ...pokemon, dataTypes }

                })

            );

            // Imposto il setTimeout per vedere il loader
            setTimeout(() => {

                // Aggiungo tutti Pokemon con anche i dataTypes
                setPokemonDetail(resolvedPokemons);

                setLoader(false);

            }, 500);


        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        fetchPokemon();
    }, [])

    return (
        <section id="pokedex-index">
            {loader ||
                <div className="container mx-auto py-8">
                    <h1 className="text-center text-6xl font-semibold mb-4">Pokedex</h1>
                    <div className="flex justify-center items-center gap-4 flex-wrap">

                        {pokemonDetail?.map(pokemon => (
                            <Link to={`/pokedex/${pokemon.id}`} className='py-4 basis-1/5 rounded-md shadow-lg flex flex-col items-center justify-center overflow-hidden hover:scale-110 cursor-pointer ease-in-out duration-200' key={`pokemon-${pokemon.id}`}>
                                <img className="select-none drag" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
                                <h2 className="capitalize text-2xl">{pokemon.name}</h2>

                                {/* Badge dei tipi */}
                                <div className="flex justify-center items-center gap-2 my-4">

                                    {pokemon.dataTypes.map(({ name, image }, i) => (
                                        <div key={`type-${i}`}>
                                            <img src={image} alt={name} className="h-6 w-[95px] rounded-md select-none drag" />
                                        </div>
                                    ))}

                                </div>

                            </Link>
                        ))}

                    </div>
                </div>
            }
        </section>
    )
}

export default PokedexIndex;