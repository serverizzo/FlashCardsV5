import { View, Text } from "react-native";
import React from "react";

export default function NavigateToDeckList() {
  // does nothing. This file is just needed for _layout.tsx not to throw an error. _layout.tsx, overrides the button press that would otherwise go to this route to navigate to the decklistroute. 
  return (
    <View>
      <Text>NavigateToDeckList</Text>
    </View>
  );
}
