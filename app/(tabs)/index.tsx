import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, Image, FlatList } from "react-native";
import { useRouter } from "expo-router";

import { fetchAnime, Anime } from "@/services/api";
import { icons } from "@/constants/icons";

import SearchBar from "@/components/SearchBar";
import AnimeCard from "@/components/AnimeCard";

const Index = () => {
  const router = useRouter();

  const [movies, setMovies] = useState<Anime[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string|null>("");

  const loadMovies = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const result = await fetchAnime({ query: "", page });
      if (result.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev: Anime[]) => [...prev, ...result]);
      }
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [page]);

  const handleEndReached = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const renderHeader = () => (
    <>
      <Image source={icons.image} className="w-20 h-20 mt-20 mb-5 mx-auto" />
      <SearchBar
        onPress={() => router.push("/search")}
        placeholder="Search for anime"
        autofocus={false}
      />
      <Text className="text-lg dark:text-white font-bold mt-5 mb-3">
        Latest Movies
      </Text>
    </>
  );

  const renderFooter = () =>
    loading ? (
      <ActivityIndicator size="large" className="my-5" color="#fff" />
    ) : null;

  return (
    <View className="flex-1 dark:bg-primary bg-white px-5 pt-10">
      {error ? (
        <Text className="text-red-500">Error: {error}</Text>
      ) : (
        <FlatList
          data={movies}
          ListHeaderComponent={renderHeader}
          ListFooterComponent={renderFooter}
          renderItem={({ item }) => <AnimeCard {...item} />}
          keyExtractor={(item) => item.mal_id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "flex-start",
            gap: 20,
            paddingRight: 5,
            marginBottom: 10,
          }}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      )}
    </View>
  );
};

export default Index;
