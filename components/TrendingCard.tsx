import { Link, useRouter } from "expo-router";
import MaskedView from "@react-native-masked-view/masked-view";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { images as imageslist } from "@/constants/images";

interface AnimeRecommendation {
  entry: {
    mal_id: number;
    url: string;
    images: {
      jpg: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
      webp: {
        image_url: string;
        small_image_url: string;
        large_image_url: string;
      };
    };
    title: string;
  };
  url: string;
  votes: number;
}

interface TrendingCardProps {
  movie: AnimeRecommendation; // Use the AnimeRecommendation interface
  index: number;

}

const TrendingCard = ({
  movie: { entry, votes }, // Destructure to get entry and votes
  index,
  
}: TrendingCardProps) => {
  const { mal_id, images, title } = entry;
  const poster_url =
    images?.jpg?.large_image_url ||
    images?.webp?.large_image_url ||
    "https://placehold.co/600x400/1a1a1a/FFFFFF.png";
    

  return (
    <Link href={`/animes/${mal_id}`} asChild>
      <TouchableOpacity className="w-32 relative pl-5">
        <Image
          source={{ uri: poster_url }}
          className="w-32 h-48 rounded-lg"
          resizeMode="cover"
        />

        {/* <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          <MaskedView
            maskElement={
              <Text className="font-bold text-white text-6xl">{index + 1}</Text>
            }
          >
            <Image
              source={imageslist.rankingGradient}
              className="size-14"
              resizeMode="cover"
            />
          </MaskedView>
        </View> */}

        <Text
          className="text-sm font-bold mt-2 dark:text-light-200"
          numberOfLines={2}
        >
          {title}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default TrendingCard;
