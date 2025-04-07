import { Tabs } from "expo-router";
import { Image, Text, useColorScheme, View } from "react-native";

import { icons } from "@/constants/icons";
import React, { useState, useCallback } from "react";


function TabIcon({ focused, icon, title }: any) {
  const colorScheme = useColorScheme();
  const colors = {
    text: colorScheme === "dark" ? "white" : "black",
  };
  if (focused) {
    return (
      <View className="flex flex-column w-full flex-1 min-w-[112px] min-h-14 mt-6 justify-center items-center">
        <Image source={icon} tintColor="#0296E5" className="size-5" />
        <Text className="text-selected text-base font-bold">
          {title}
        </Text>
      </View>
    );
  }

  return (
    <View className="flex flex-column w-full flex-1 min-w-[112px] min-h-14 mt-6 justify-center items-center">
      <Image source={icon} tintColor={colorScheme=="dark"? "white": "black"} className="size-5 block" />
      <Text className="dark:text-gray-300 text-base font-bold">
        {title}
      </Text>
    </View>
  );
}

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarStyle: {
          backgroundColor: colorScheme == "dark" ? "#242A32" : "#FBFCFD",
          marginHorizontal: 0,
          marginBottom: 1,
          height: 60,
          position: "absolute",
          bottom: -3,
          overflow: "hidden",
          borderColor: "#0296E5",
          borderTopWidth: 1, // Added border top
          borderTopColor: "#0296E5", // Added border top color (matching your accent color)
          flexDirection: "row", // Ensure items are in a row
          justifyContent: "center", // Center the items horizontally
          alignItems: "center",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "index",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Search" />
          ),
        }}
      />

      <Tabs.Screen
        name="bookmark"
        options={{
          title: "Save",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.save} title="Bookmark" />
          ),
        }}
      />
      
    </Tabs>
  );
}
