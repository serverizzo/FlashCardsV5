import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../utils/supabase";
import { ThemedText } from "@/components/ThemedText";
import { useUser } from "../context/userContext"

export default function Decks() {
    const { userId, setUserId } = useUser();

    useEffect(() => {
        getDecks();
    }, [userId])

    async function getDecks() {
        console.log("getting decks")
        const data = await supabase
        .from("deck")
        .select("deck_name")
        .eq("user_id", userId)

        console.log(data)

    }

  return (
    <SafeAreaView>
      <ThemedText>Decks</ThemedText>

      <View >
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </SafeAreaView>
  );
}
