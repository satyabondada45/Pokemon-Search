import { useState } from "react";

function App(){

const [pokemon,setPokemon] = useState(null);
const [loading,setLoading] = useState(false);
const [search,setSearch] = useState("");
const [error,setError] = useState("");

async function getPokemon(){

setLoading(true);

setError("");

try{

const response = await fetch(
`https://pokeapi.co/api/v2/pokemon/${search}`
);

if(!response.ok){
throw new Error("Pokemon not found");
}

const data = await response.json();

setPokemon(data);

}
catch(error){

setError("Pokemon not found");

setPokemon(null);

}

setLoading(false);
}

return(

<div>

<input
type="text"
placeholder="enter pokemon"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

<button onClick={getPokemon}>
get pokemon
</button>

{loading && <h3>Loading...</h3>}

{error && <h2>{error}</h2>}

{pokemon && !loading && (

<div className="pokemon-card">

<h3>Name: {pokemon.name}</h3>

<h3>Weight: {pokemon.weight} Kg</h3>

<h3>Type: {pokemon.types[0].type.name}</h3>

<img
src={pokemon.sprites.other["official-artwork"].front_default}
width="300px"
alt={pokemon.name}
/>

</div>

)}

</div>

)

}

export default App;