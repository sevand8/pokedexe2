import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "@/global.css";
import PokemonCard from "@/components/cards/PokemonCard";
import HeaderMenu from "@/components/menu/HeaderMenu";
import PokemonStats from "@/components/statistics/PokemonStats";
import PokemonList from "@/components/menu/PokemonList";
import PokemonInfo from "@/components/cards/PokemonInfo";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
  abilities: { ability: { name: string } }[];
}

interface PokemonListItem {
  name: string;
  url: string;
}

export default function App() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
      const data = await response.json();
      setPokemonList(data.results);
    } catch (error) {
      console.error("Error al cargar la lista:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonDetails = async (name: string) => {
    setDetailLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setSelectedPokemon(data);
    } catch (error) {
      console.error("Error al cargar detalles:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleSelectPokemon = (name: string) => {
    fetchPokemonDetails(name);
  };

  const handleBack = () => {
    setSelectedPokemon(null);
  };

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-red-600">
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-red-50">
      <HeaderMenu 
        title={selectedPokemon ? selectedPokemon.name : "Pokédex"} 
        showBack={!!selectedPokemon}
        onBack={handleBack}
      />
      
      <ScrollView className="flex-1">
        {!selectedPokemon ? (
          <PokemonList
            pokemonList={pokemonList}
            onSelectPokemon={handleSelectPokemon}
            favorites={favorites}
          />
        ) : detailLoading ? (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#dc2626" />
          </View>
        ) : (
          <View className="items-center p-4">
            <PokemonCard 
              pokemon={selectedPokemon}
              isFavorite={favorites.includes(selectedPokemon.id)}
              onToggleFavorite={() => toggleFavorite(selectedPokemon.id)}
            />
            <PokemonStats pokemon={selectedPokemon} />
            <PokemonInfo pokemon={selectedPokemon} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
