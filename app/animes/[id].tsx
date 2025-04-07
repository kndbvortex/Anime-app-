import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Linking,
  FlatList,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "@/constants/icons";
import useFetch from "@/services/useFetch";
import {
  AnimeDetails,
  fetchAnimeDetails,
  fetchAnimeRecommendations,
} from "@/services/api";
import TrendingCard from "@/components/TrendingCard";
import { useEffect, useState } from "react";
import { addBookmark, isBookmarked, removeBookmark } from "@/services/bookmark";

interface AnimeInfoProps {
  label: string;
  value?: string | number | null;
}

const AnimeInfo = ({ label, value }: AnimeInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="dark:text-light-200 font-bold text-xl">{label}</Text>
    <Text className="dark:text-light-100 text-md mt-2">{value || "N/A"}</Text>
  </View>
);

const Details = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  // Destructure to get refetch functions
  const {
    data: anime,
    loading,
    refetch: refetchAnime,
  } = useFetch(() => fetchAnimeDetails(id as string));

  const [isThisAnimeBookmarked, setisThisAnimeBookmarked] =
    useState<boolean>(false);
  const [loadingBookmarkStatus, setLoadingBookmarkStatus] =
    useState<boolean>(true);

  useEffect(() => {
    const checkInitialBookmarkStatus = async () => {
      setLoadingBookmarkStatus(true);
      const bookmarked = await isBookmarked(anime?.mal_id);
      setisThisAnimeBookmarked(bookmarked);
      setLoadingBookmarkStatus(false);
    };

    checkInitialBookmarkStatus();
  }, [id, anime?.mal_id]); // Keep anime?.mal_id in case the fetch fails initially


  const handleBookmarkPress = async () => {
    if (!anime?.mal_id) {
      console.warn("Anime ID is missing.");
      return;
    }

    setisThisAnimeBookmarked(!isThisAnimeBookmarked);

    if (isThisAnimeBookmarked) {
      const success = await removeBookmark(anime.mal_id);
      if (!success) {
        setisThisAnimeBookmarked(true);
        console.log("Failed to remove bookmark 1.");
      }
    } else {
      const success = await addBookmark(anime);
      if (!success) {
        setisThisAnimeBookmarked(false);
        console.log("Failed to add bookmark.....");
      }
    }
  };
  const {
    data: animes,
    loading: animesloading,
    error: animessError,
    refetch: refetchAnimes,
  } = useFetch(() => fetchAnimeRecommendations(id as string));

  useEffect(() => {
    refetchAnime();
    refetchAnimes();
    console.log(id);
  }, [id]);

  if (loading || animesloading)
    return (
      <SafeAreaView className="dark:bg-primary flex-1">
        <ActivityIndicator />
      </SafeAreaView>
    );

  return (
    <View className="dark:bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <View className="w-full h-[550px] mx-auto overflow-hidden">
          {/* Card container with relative positioning for absolute child elements */}
          <View className="relative">
            {/* Background image */}
            <View className="w-full h-48 bg-gray-200">
              <Image
                source={{
                  uri:
                    anime?.trailer?.images?.maximum_image_url ||
                    anime?.trailer?.images?.large_image_url ||
                    anime?.images?.jpg?.large_image_url,
                }}
                className="w-full h-[400px] object-cover"
                resizeMode="cover"
              />
              {anime?.trailer?.youtube_id && (
                <TouchableOpacity
                  className="absolute bottom-5 right-5 top-[250] rounded-full size-14 bg-white flex items-center justify-center"
                  onPress={() => {
                    Linking.openURL(anime?.trailer?.url);
                  }}
                >
                  <Image
                    source={icons.play}
                    className="w-6 h-6 ml-1"
                    resizeMode="stretch"
                  />
                </TouchableOpacity>
              )}
            </View>

            {/* Overlapping poster image that extends into the content area */}
            <View className="absolute left-5 bottom-[-310]">
              <Image
                source={{
                  uri:
                    anime?.images?.jpg?.large_image_url ||
                    anime?.images?.jpg?.image_url ||
                    anime?.images?.webp?.large_image_url,
                }}
                className="w-32 h-40 object-cover rounded-lg shadow-lg border-2 border-white"
                resizeMode="cover"
              />
              {/* <Image
                source={{ uri: "/api/placeholder/120/160" }}
                alt="Movie poster"
                className="w-32 h-40 object-cover rounded-lg shadow-lg border-2 border-white"
              /> */}
            </View>

            <View className="absolute left-[35%] top-[410]">
              <Text className="dark:text-white font-bold text-3xl">
                {anime?.title}
              </Text>
              <Text className="dark:dark:text-light-300 text-md mt-1">
                {anime?.title_japanese}
              </Text>
            </View>

            <View className="absolute bottom-5 right-5 top-[350] flex-row items-center bg-white px-2 py-1 rounded-md h-10">
              <Image source={icons.star} className="size-4 b" />
              <Text className="text-selected font-bold text-md">
                {anime?.score?.toFixed(1) || "N/A"}/10
              </Text>
              <Text className="text-selected font-bold text-md">
                ({anime?.scored_by?.toLocaleString() || "0"} votes)
              </Text>
            </View>

            <View className="absolute right-[15%] top-[290%]">
              <View className="flex-row items-center gap-x-1 mt-2">
                <Text className="dark:text-light-200 text-md p-2">
                  {anime?.year ||
                    anime?.aired?.from?.split("T")[0]?.split("-")[0]}{" "}
                </Text>
                <Text className="dark:text-light-200 text-md">|</Text>
                <Text className="dark:text-light-200 text-md p-2">
                  {anime?.episodes || "?"} episodes
                </Text>
                <Text className="dark:text-light-200 text-md">|</Text>
                <Text className="dark:text-light-200 text-md p-2">
                  {" "}
                  {anime?.status}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          {animes && (
            <View className="mt-3 ml-5">
              <Text className="text-2xl dark:text-white font-bold mb-3">
                You will like also
              </Text>
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                className="mb-3 mt-3"
                data={animes}
                contentContainerStyle={{
                  gap: 26,
                }}
                renderItem={({ item, index }) => (
                  <TrendingCard movie={item} index={index} />
                )}
                keyExtractor={(item) => item.entry.mal_id.toString()}
                ItemSeparatorComponent={() => <View className="w-4" />}
              />
            </View>
          )}
        </View>

        <View className="flex-col items-start justify-center mt-5 px-5">
          <AnimeInfo label="Synopsis" value={anime?.synopsis} />

          <AnimeInfo
            label="Genres"
            value={anime?.genres?.map((g) => g.name).join(" • ") || "N/A"}
          />

          <View className="flex flex-row justify-between w-full">
            <AnimeInfo label="Type" value={anime?.type || "N/A"} />
            <AnimeInfo
              label="Season"
              value={
                anime?.season
                  ? `${
                      anime.season.charAt(0).toUpperCase() +
                      anime.season.slice(1)
                    } ${anime.year}`
                  : "N/A"
              }
            />
          </View>

          <View className="flex flex-row justify-between w-full">
            <AnimeInfo label="Rating" value={anime?.rating || "N/A"} />
            <AnimeInfo label="Source" value={anime?.source || "N/A"} />
          </View>

          <AnimeInfo
            label="Studios"
            value={anime?.studios?.map((s) => s.name).join(" • ") || "N/A"}
          />

          <AnimeInfo
            label="Producers"
            value={anime?.producers?.map((p) => p.name).join(" • ") || "N/A"}
          />
        </View>
      </ScrollView>

      <View className="absolute bottom-[0] left-0 right-0 bg-selected py-4 flex flex-row items-center justify-between z-50 w-full">
        <TouchableOpacity onPress={router.back}>
          <Image
            source={icons.arrow}
            className="size-8 mr-1 mt-0.5 ml-2"
            tintColor="white"
          />
        </TouchableOpacity>
        <Text className="text-white font-semibold text-lg">Detail</Text>
        <TouchableOpacity className="p-1 mr-5" onPress={handleBookmarkPress}>
          <Image
            source={
              isThisAnimeBookmarked
                ? icons.bookmarkFilled
                : icons.bookmarkOutline
            }
            className="w-5 h-7"
            tintColor={isThisAnimeBookmarked ? "#FDC700" : "#FFFBEB"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;
