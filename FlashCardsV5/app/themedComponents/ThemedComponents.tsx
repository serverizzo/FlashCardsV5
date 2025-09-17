import {
  View,
  Text,
  useColorScheme,
  StyleSheet,
  TextInput,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";

export function ThemedText({ ...props }) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";
  return (
    <Text
      style={isDarkMode ? colorStyles.darkText : colorStyles.lightText}
      {...props}
    />
  );
}

export function ThemedInput({ ...props }) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const baseStyles = {height: 80}

  return (
    <TextInput
      style={isDarkMode ? [colorStyles.darkInput, baseStyles] : [colorStyles.lightInput, baseStyles]}
      placeholderTextColor={"gray"}
      
      {...props}
    />
  );
}

export function ThemedModal({ children, ...props }: any) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return (
    <Modal
      backdropColor={isDarkMode ? "rgba(46, 46, 46, 1)" : "white"}
      {...props}
    >
      {children}
    </Modal>
  );
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
    backgroundColor: "rgba(46, 46, 46, 1)",
    
  },

  lightText: {
    color: "black",
  },
  darkText: {
    color: "white",
  },
});
