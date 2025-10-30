import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PokemonListProps {
  pokemonList: PokemonListItem[];
  onSelectPokemon: (name: string) => void;
  favorites: number[];
}

const PokemonList: React.FC<PokemonListProps> = ({ 
  pokemonList, 
  onSelectPokemon,
  favorites 
}) => {
  const renderItem = ({ item }: { item: PokemonListItem }) => {
    const pokemonId = parseInt(item.url.split("/")[6]);
    const isFavorite = favorites.includes(pokemonId);
    
    return (
      <TouchableOpacity
        onPress={() => onSelectPokemon(item.name)}
        className="bg-white rounded-2xl p-4 m-2 shadow-md items-center border-2 border-gray-200 active:border-red-500"
        style={{ width: "45%" }}
      >
        {isFavorite && (
          <View className="absolute top-2 right-2 z-10">
            <Text className="text-2xl">❤️</Text>
          </View>
        )}
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`,
          }}
          className="w-24 h-24"
        />
        <Text className="text-sm font-bold capitalize text-gray-800 mt-2 text-center">
          {item.name}
        </Text>
        <Text className="text-xs text-gray-500 font-semibold">
          #{pokemonId.toString().padStart(3, "0")}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={pokemonList}
      renderItem={renderItem}
      keyExtractor={(item) => item.name}
      numColumns={2}
      contentContainerStyle={{ padding: 8 }}
      columnWrapperStyle={{ justifyContent: "space-between" }}
    />
  );
};

export default PokemonList;