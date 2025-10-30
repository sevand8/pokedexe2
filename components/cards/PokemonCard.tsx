import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

interface PokemonCardProps {
  pokemon: {
    id: number;
    name: string;
    sprites: {
      other: {
        ["official-artwork"]: {
          front_default: string;
        };
      };
    };
    types: { type: { name: string } }[];
  };
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const getTypeColor = (type: string): string => {
  const colors: { [key: string]: string } = {
    fire: "bg-orange-500",
    water: "bg-blue-500",
    grass: "bg-green-500",
    electric: "bg-yellow-400",
    psychic: "bg-pink-500",
    ice: "bg-cyan-400",
    dragon: "bg-purple-600",
    dark: "bg-gray-800",
    fairy: "bg-pink-300",
    normal: "bg-gray-400",
    fighting: "bg-red-700",
    flying: "bg-indigo-400",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    rock: "bg-yellow-800",
    bug: "bg-lime-500",
    ghost: "bg-purple-700",
    steel: "bg-gray-500",
  };
  return colors[type] || "bg-gray-400";
};

const PokemonCard: React.FC<PokemonCardProps> = ({ 
  pokemon, 
  isFavorite, 
  onToggleFavorite 
}) => {
  return (
    <View className="bg-white rounded-3xl p-6 shadow-xl w-full max-w-sm mb-5 items-center border-4 border-gray-100">
      <TouchableOpacity
        onPress={onToggleFavorite}
        className="absolute top-4 right-4 z-10 bg-gray-100 rounded-full p-2"
      >
        <Text className="text-3xl">{isFavorite ? "❤️" : "🤍"}</Text>
      </TouchableOpacity>

      <Text className="text-4xl font-extrabold capitalize text-gray-900 mb-1">
        {pokemon.name}
      </Text>
      <Text className="text-gray-500 text-lg font-semibold mb-4">
        #{String(pokemon.id).padStart(3, "0")}
      </Text>
      
      <Image
        source={{ uri: pokemon.sprites.other["official-artwork"].front_default }}
        className="w-56 h-56 my-4"
      />
      
      <View className="flex-row gap-3 flex-wrap justify-center">
        {pokemon.types.map((t) => (
          <View
            key={t.type.name}
            className={`${getTypeColor(t.type.name)} px-6 py-2 rounded-full shadow-md`}
          >
            <Text className="text-white font-bold capitalize text-base">
              {t.type.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default PokemonCard;
