import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { UserProvider } from "./context/userContext";
import { MyDarkTheme } from "./themedComponents/MyDarkTheme";
import { DeckProvider } from "./context/deckContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? MyDarkTheme : DefaultTheme}>
      <UserProvider>
        <DeckProvider>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(stack)/cardlistroute" options={{ title:'Card List', headerShown: true }} />            
            <Stack.Screen name="(stack)/decklistroute" options={{ title:'Deck List', headerShown: true }} />            
            <Stack.Screen name="+not-found" />
          </Stack>
          <StatusBar style="auto" />
        </DeckProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
