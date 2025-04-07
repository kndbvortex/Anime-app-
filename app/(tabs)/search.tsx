import { useState, useEffect, useRef } from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";
import { images } from "@/constants/images";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import { fetchAnime, Anime } from "@/services/api";
import SearchBar from "@/components/SearchBar";
import AnimeCard from "@/components/AnimeCard";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: animeList = [],
    loading,
    error,
    refetch: loadAnime,
    reset,
  } = useFetch(() => fetchAnime({ query: searchQuery }), false);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        await loadAnime();
        
      } else {
        reset();
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <View className="flex-1 dark:bg-primary">
      <FlatList
        className="px-5"
        data={animeList as Anime[]}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item }) => <AnimeCard {...item} />}
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: "flex-start",
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            <View className="w-full flex-row justify-center mt-20 items-center">
              <Image source={icons.image} className="w-20 h-20 mb-5" />
            </View>
            <View className="mt-5 flex-1">
              <SearchBar
                placeholder="Search for anime"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </View>
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}
            {!loading &&
              !error &&
              searchQuery.trim() &&
              animeList?.length! > 0 && (
                <Text className="text-xl dark:text-white font-bold">
                  Search Results for{" "}
                  <Text className="text-selected">{searchQuery}</Text>
                </Text>
              )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className="mt-10 px-5">
              <Text className="text-center text-gray-500">
                {searchQuery.trim()
                  ? "No anime found"
                  : "Start typing to search for anime"}
              </Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};

export default Search;
