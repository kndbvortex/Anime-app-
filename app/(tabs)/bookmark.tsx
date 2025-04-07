import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import useFetch from "@/services/useFetch";
import { useFocusEffect } from "@react-navigation/native";

import { icons } from "@/constants/icons";

import BookmarkCard from "@/components/bookmarkCard";
import {
  addBookmark,
  isBookmarked,
  removeBookmark,
  loadBookmarks,
} from "@/services/bookmark";
import { useCallback, useEffect, useState } from "react";

export default function Bookmark() {
  const router = useRouter();
  const [reloadKey, setReloadKey] = useState(0);
    const [loading, setLoading] = useState(false);
  


  const {
    data: animes,
    loading: moviesLoading,
    error: moviesError,
    refetch: loadAnime,
  } = useFetch(() => loadBookmarks());

  useFocusEffect(
      useCallback(() => {
        loadAnime();
        setReloadKey((prevKey) => prevKey + 1);
      }, [loadBookmarks])
    )
  

  return (
    <View className="flex-1 dark:bg-primary" key={reloadKey}>
      <ScrollView
        className="flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.image} className="w-20 h-20 mt-20 mb-5 mx-auto" />

        {moviesLoading || loading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            className="mt-10 self-center"
          />
        ) : moviesError ? (
          <Text>Error: {moviesError?.message}</Text>
        ) : (
          <View className="flex-1 mt-5">
            <>
              <Text className="text-4xl dark:text-white font-bold mt-5 mb-3">
                Watch List
              </Text>

              <FlatList
                data={animes}
                renderItem={({ item }) => <BookmarkCard {...item} />}
                keyExtractor={(item) => item.mal_id.toString()}
                numColumns={1}
                className="mt-2 pb-32"
                scrollEnabled={false}
                ListEmptyComponent={() => (
                  <View>
                    <Text className="text-xl m-auto">
                      Nothing bookmarked yet. Why not dive in and find your next
                      favorite anime?
                    </Text>
                  </View>
                )}
              />
            </>
          </View>
        )}
      </ScrollView>
    </View>
  );
}
