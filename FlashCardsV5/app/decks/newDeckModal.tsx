import { View, Text, Modal } from "react-native";
import React, { useEffect } from "react";

interface Props {
  showNewDeckModal: boolean;
  setShowNewDeckModal: (showNewDeckModal: boolean) => void;
}

export default function NewDeckModal({
  showNewDeckModal,
  setShowNewDeckModal,
}: Props) {
  useEffect(() => {
    console.log("showNewDeckModal is", showNewDeckModal);
  }, [showNewDeckModal]);
  return (
    <Modal
      animationType="slide"
      visible={showNewDeckModal}
      onRequestClose={() => setShowNewDeckModal(false)}
    >
      <Text>NewDeckModal</Text>
    </Modal>
  );
}
