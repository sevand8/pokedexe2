import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

interface HeaderMenuProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ title, showBack, onBack }) => {
  return (
    <View className="bg-red-600 p-4 shadow-lg">
      {showBack && (
        <TouchableOpacity 
          onPress={onBack}
          className="mb-2 bg-red-700 px-4 py-2 rounded-lg self-start active:bg-red-800"
        >
          <Text className="text-white font-bold text-base">← Volver</Text>
        </TouchableOpacity>
      )}
      <Text className="text-center text-white text-3xl font-extrabold capitalize">
        {title}
      </Text>
    </View>
  );
};

export default HeaderMenu;

