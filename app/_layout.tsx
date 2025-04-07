import { Stack } from "expo-router";
import "./globals.css";
import { StatusBar } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
      />

      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="animes/[id]"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}
