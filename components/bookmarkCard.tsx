import { Link } from "expo-router";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Alert,
  Pressable,
  Modal,
  Button
} from "react-native";

import { icons } from "@/constants/icons";
import { AnimeCardProps } from "@/components/AnimeCard";
import {
  removeBookmark,
} from "@/services/bookmark";
import { useState } from "react";

const BookmarkCard = ({
  mal_id,
  images,
  title,
  score,
  year,
  type,
  episodes,
}: AnimeCardProps) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [visible, setVisible] = useState(true);
  return (
    <Link href={`/animes/${mal_id}`} asChild className={visible? "":"hidden"}>
      <TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View className="bg-white shadow-xl shadow-selected w-[80%] rounded-lg p-5 m-auto">
            <View>
              <Text className="text-xl m-5">
                Do you want to delete{" "}
                <Text className="text-red-600 font-bold">{title} ?</Text>
              </Text>
              <View className="flex justify-between">
                <TouchableOpacity
                  className="w-[30%] bg-primary  flex rounded-lg h-10 align-center m-auto border-2 border-solid border-white shadow-primary"
                  onPress={() => {setModalVisible(false); removeBookmark(mal_id); setVisible(false)}}
                >
                  <View className="m-auto shadow-lg">
                    <Text className="text-center m-auto text-white">Yes</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="w-[30%] bg-white  flex rounded-lg h-10 align-center m-auto border-2 border-solid border-primary shadow-primary"
                  onPress={() => setModalVisible(false)}
                >
                  <View className="m-auto shadow-lg">
                    <Text className="text-center m-auto text-primary">No</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <View className="flex flex-row items-center ml-5 mb-5">
          <Image
            source={{
              uri:
                images?.jpg?.large_image_url ||
                images?.webp?.image_url ||
                "https://placehold.co/600x400/1a1a1a/FFFFFF.png",
            }}
            className="w-[40%] h-52 rounded-lg"
            resizeMode="cover"
          />
          <View className="flex-1 ml-3">
            <Text
              className="text-2xl font-bold dark:text-white"
              numberOfLines={2}
            >
              {title}
            </Text>
            <View className="flex flex-row items-center mt-2 text-md">
              <Image source={icons.star} className="size-4 mr-1" />
              <Text className="text-md dark:text-white font-bold uppercase">
                {score ? score.toFixed(1) : "N/A"}
              </Text>
            </View>
            <View className="mt-1">
              <Text className="text-md dark:text-light-300 font-medium">
                {year || "TBA"}
              </Text>
              <Text className="text-md font-medium dark:text-light-300 uppercase">
                {type || "TV"}
                {episodes ? ` • ${episodes} ep` : ""}
              </Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image source={icons.trash} className="size-8 m-3" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default BookmarkCard;
