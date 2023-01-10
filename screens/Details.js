import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";

export default function Detail({ navigation }) {
  const {
    params: { prop },
  } = useRoute();

  return (
    <View>
      <Text style={{ marginTop: 50, fontSize: 50 }}>{prop}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
