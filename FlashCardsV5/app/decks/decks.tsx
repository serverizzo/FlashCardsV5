import { View, Text, Button } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../utils/supabase";
import { ThemedText } from "@/components/ThemedText";

export default function Decks() {
  return (
    <SafeAreaView>
      <ThemedText>Decks</ThemedText>

      <View >
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </SafeAreaView>
  );
}
