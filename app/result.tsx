// app/result.tsx
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Text, Alert, Platform } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Ionicons } from "@expo/vector-icons";

export default function ResultScreen() {
  const { base64 } = useLocalSearchParams();
  const router = useRouter();

  const saveImage = async () => {
    try {
      if (!base64) {
        throw new Error("No base64 image data found");
      }
  
      const filename = FileSystem.documentDirectory + "generated.png";
  
      await FileSystem.writeAsStringAsync(filename, base64 as string, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission denied", "Cannot save image without permission.");
        return;
      }
  
      const asset = await MediaLibrary.createAssetAsync(filename);
      await MediaLibrary.createAlbumAsync("AI Avatars", asset, false);
  
      Alert.alert("Saved", "Image saved to your gallery 🎉");
    } catch (error) {
      console.error("Save failed:", error);
      Alert.alert("Failed", "Something went wrong while saving the image.");
    }
  };  

  return (
    <View style={styles.container}>
      <Image source={{ uri: `data:image/png;base64,${base64}` }} style={styles.image} />

      {/* Top Navigation Buttons */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.replace("/create")}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/create")}>
          <Text style={styles.finishButton}>Finish</Text>
        </TouchableOpacity>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveImage}>
        <Ionicons name="download-outline" size={20} color="white" />
        <Text style={styles.saveText}>Save Image</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F4F7", // soft neutral background
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "90%",
    height: "70%",
    borderRadius: 16,
    resizeMode: "cover",
  },
  topBar: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 30,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  finishButton: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
  },
  saveButton: {
    position: "absolute",
    bottom: 40,
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
  },
  saveText: {
    color: "white",
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 8,
  },
});
