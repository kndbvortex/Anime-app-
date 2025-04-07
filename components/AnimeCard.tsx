import { Link } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";

import { icons } from "@/constants/icons";

export interface AnimeCardProps {
  mal_id: number;
  images: {
    jpg: {
      image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  score: number;
  year: number;
  type: string;
  episodes?: number;
}

const AnimeCard = ({
  mal_id,
  images,
  title,
  score,
  year,
  type,
  episodes,
}: AnimeCardProps) => {
  return (
    <Link href={`/animes/${mal_id}`} asChild>
      <TouchableOpacity className="w-[30%]">
        <Image
          source={{
            uri:
              images?.jpg?.large_image_url ||
              images?.webp?.image_url ||
              "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
          }}
          className="w-full h-52 rounded-lg"
          resizeMode="cover"
        />

        <Text className="text-sm font-bold dark:text-white mt-2" numberOfLines={1}>
          {title}
        </Text>

        <View className="flex-row items-center justify-start gap-x-1">
          <Image source={icons.star} className="size-4" />
          <Text className="text-xs dark:text-white font-bold uppercase">
            {score ? score.toFixed(1) : "N/A"}
          </Text>
        </View>

        <View className="flex-row items-center justify-between">
          <Text className="text-xs dark:text-light-300 font-medium mt-1">
            {year || "TBA"}
          </Text>
          <Text className="text-xs font-medium dark:text-light-300 uppercase">
            {type || "TV"}
            {episodes ? ` • ${episodes} ep` : ""}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default AnimeCard;
