import { View, TextInput, Image, useColorScheme } from "react-native";

import { icons } from "@/constants/icons";
import { useRef } from "react";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  autofocus?: boolean
}

const SearchBar = ({ placeholder, value, onChangeText, onPress, autofocus = true }: Props) => {
  // console.log(autofocus);
  const colorScheme = useColorScheme();
  
  return (
    <View className="flex-row items-center dark:bg-[#3A3F47] bg-slate-200 rounded-full px-5 py-2 opacity-40">
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 dark:text-white"
        placeholderTextColor={colorScheme == "dark" ? "#ffff" : "black"}
        autoFocus={autofocus}
      />
      <Image
        source={icons.search}
        className="w-6 h-6"
        resizeMode="contain"
        tintColor="#3A3F47"
      />
    </View>
  );
};

export default SearchBar;
