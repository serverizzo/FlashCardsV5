import { View, Text, useColorScheme, StyleSheet } from "react-native";
import React from "react";

export function ThemedText({...props}) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return(
  <Text style={isDarkMode ? colorStyles.darkText : colorStyles.lightText}
    {...props}
    />
  )
}

const colorStyles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
  lightInput: {
    borderColor: "gray",
    color: "black",
    backgroundColor: "white",
  },
  darkInput: {
    borderColor: "lightgray",
    color: "white",
    backgroundColor: "#1c1c1e",
  },

  lightText: {
    color: "black",
  },
  darkText: {
    color: "white",
  },
});
