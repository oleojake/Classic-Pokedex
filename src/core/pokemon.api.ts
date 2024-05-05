import type { PokeAPI, PokemonFromList } from "./model.api";
const API_URL = "https://pokeapi.co/api/v2";

export const getPokemonDescription = async (id: string): Promise<String> => {
	try {
		const res = await fetch(`${API_URL}/pokemon-species/${id}/`);
		const data = await res.json();
		return data.flavor_text_entries[0].flavor_text.replace(
			String.fromCharCode(12),
			" "
		);
	} catch (error) {
		throw new Error("Error to obtain the Pokémon");
	}
};

export const getPokemonById = async (id: string): Promise<PokeAPI> => {
	try {
		const res = await fetch(`${API_URL}/pokemon/${id}/`);
		const data = (await res.json()) as PokeAPI;
		return data;
	} catch (error) {
		throw new Error("Error to obtain the Pokémon");
	}
};

export const getPokemonByUrl = async (url: string): Promise<PokeAPI> => {
	try {
		const res = await fetch(url);
		const data = (await res.json()) as PokeAPI;
		return data;
	} catch (error) {
		throw new Error("Error to obtain the Pokémon");
	}
};

export const getFirstGenerationPokemon = async () => {
	try {
		const res = await fetch(`${API_URL}/pokemon/?limit=151/`);
		const data = await res.json();
		return data.results;
	} catch (error) {
		throw new Error("Error to obtain the Pokémon");
	}
};

export const getPokemonListInfo = async (): Promise<PokeAPI[]> => {
	try {
		const res = await getFirstGenerationPokemon();
		const promises: any[] | PromiseLike<any[]> = [];
		res.forEach((element: PokemonFromList) => {
			promises.push(getPokemonByUrl(element.url));
		});
		const pokemonList: PokeAPI[] = await Promise.all(promises);
		return pokemonList;
	} catch (error) {
		throw new Error("Error to obtain the Pokémon");
	}
};
