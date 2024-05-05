import type { PokeAPI, Stats } from "./model.api";

export const firstCapitalLetter = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1);
};

export const sortPokemonByNumber = (pokemonList: PokeAPI[]): PokeAPI[] => {
	pokemonList.sort((p1, p2) => (p1.id < p2.id ? -1 : p1.id > p2.id ? 1 : 0));
	return pokemonList;
};

export const filterPokemonByType = (
	pokemonList: PokeAPI[],
	type: string
): PokeAPI[] => {
	const pokemonFiltered = pokemonList.filter((pokemon: PokeAPI) => {
		if (
			pokemon.types[0].type.name.includes(type) ||
			(pokemon.types[1] && pokemon.types[1].type.name.includes(type))
		) {
			return pokemon;
		}
	});
	return pokemonFiltered;
};

export const getParsedStats = (
	pokemonStats: { stat: { name: string }; base_stat: number }[]
): Stats => {
	let parsedStats: Stats = {
		hp: 0,
		attack: 0,
		defense: 0,
		specialAttack: 0,
		specialDefense: 0,
		speed: 0,
		total: 0,
	};

	pokemonStats.map((stat: { stat: { name: string }; base_stat: number }) => {
		switch (stat.stat.name) {
			case "hp":
				parsedStats.hp = stat.base_stat;
				break;
			case "attack":
				parsedStats.attack = stat.base_stat;
				break;
			case "defense":
				parsedStats.defense = stat.base_stat;
				break;
			case "special-attack":
				parsedStats.specialAttack = stat.base_stat;
				break;
			case "special-defense":
				parsedStats.specialDefense = stat.base_stat;
				break;
			case "speed":
				parsedStats.speed = stat.base_stat;
				break;
		}
	});
	parsedStats.total =
		parsedStats.hp +
		parsedStats.attack +
		parsedStats.defense +
		parsedStats.specialAttack +
		parsedStats.specialDefense +
		parsedStats.speed;

	return parsedStats;
};
