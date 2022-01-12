import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { CameraComponent } from "./Camera";

export default function App() {
  return <CameraComponent />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
