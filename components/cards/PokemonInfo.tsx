import React from "react";
import { View, Text } from "react-native";

interface PokemonInfoProps {
  pokemon: {
    height: number;
    weight: number;
    base_experience: number;
    abilities: { ability: { name: string } }[];
  };
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ pokemon }) => {
  return (
    <View className="bg-white rounded-3xl p-5 shadow-lg w-full max-w-sm mb-5 border-2 border-gray-100">
      <Text className="text-2xl font-extrabold mb-4 text-gray-900">
        📋 Información
      </Text>
      
      <View className="space-y-3">
        <View className="flex-row justify-between py-2 border-b border-gray-200">
          <Text className="text-gray-700 font-semibold text-base">📏 Altura:</Text>
          <Text className="font-bold text-gray-900 text-base">
            {pokemon.height / 10} m
          </Text>
        </View>
        
        <View className="flex-row justify-between py-2 border-b border-gray-200">
          <Text className="text-gray-700 font-semibold text-base">⚖️ Peso:</Text>
          <Text className="font-bold text-gray-900 text-base">
            {pokemon.weight / 10} kg
          </Text>
        </View>
        
        <View className="flex-row justify-between py-2 border-b border-gray-200">
          <Text className="text-gray-700 font-semibold text-base">⭐ Experiencia:</Text>
          <Text className="font-bold text-gray-900 text-base">
            {pokemon.base_experience}
          </Text>
        </View>
        
        <View className="py-2">
          <Text className="text-gray-700 font-semibold mb-2 text-base">
            🎯 Habilidades:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {pokemon.abilities.map((a, index) => (
              <View 
                key={index}
                className="bg-red-100 px-3 py-1 rounded-full"
              >
                <Text className="font-bold text-red-800 capitalize text-sm">
                  {a.ability.name.replace("-", " ")}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

export default PokemonInfo;