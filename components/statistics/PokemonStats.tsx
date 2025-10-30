import React from "react";
import { View, Text } from "react-native";

interface PokemonStatsProps {
  pokemon: {
    stats: { stat: { name: string }; base_stat: number }[];
  };
}

const PokemonStats: React.FC<PokemonStatsProps> = ({ pokemon }) => {
  const getStatColor = (value: number): string => {
    if (value >= 100) return "bg-green-500";
    if (value >= 70) return "bg-yellow-500";
    if (value >= 40) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <View className="bg-white rounded-3xl p-5 shadow-lg w-full max-w-sm mb-5 border-2 border-gray-100">
      <Text className="text-2xl font-extrabold mb-4 text-gray-900">
        📊 Estadísticas
      </Text>
      
      {pokemon.stats.map((stat, index) => (
        <View key={index} className="mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="capitalize text-gray-700 font-semibold text-base">
              {stat.stat.name.replace("-", " ")}
            </Text>
            <Text className="font-bold text-gray-900 text-base">
              {stat.base_stat}
            </Text>
          </View>
          
          <View className="bg-gray-200 rounded-full h-3 overflow-hidden shadow-inner">
            <View
              className={`${getStatColor(stat.base_stat)} h-full rounded-full`}
              style={{ width: `${(stat.base_stat / 255) * 100}%` }}
            />
          </View>
        </View>
      ))}
      
      <View className="mt-3 pt-3 border-t border-gray-200">
        <View className="flex-row justify-between">
          <Text className="text-gray-700 font-bold text-base">Total:</Text>
          <Text className="text-gray-900 font-extrabold text-lg">
            {pokemon.stats.reduce((acc, stat) => acc + stat.base_stat, 0)}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default PokemonStats;
