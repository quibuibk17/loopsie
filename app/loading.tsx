// app/loading.tsx
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import * as FileSystem from 'expo-file-system';

export default function LoadingScreen() {
  const { uri } = useLocalSearchParams<{ uri: string }>();
  const router = useRouter();

  useEffect(() => {
    const generateImage = async () => {
      try {
        const formData = new FormData();
        formData.append('image', {
          uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as any); // `as any` to bypass TypeScript issues with FormData in RN

        formData.append('prompt', 'Anime style portrait...'); // optional, or use default

        const response = await axios.post('https://3dfe-34-19-62-158.ngrok-free.app/generate', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          responseType: 'blob',
        });

        // Save to local file
        const blob = response.data;
        const base64 = await blobToBase64(blob);
        router.push({
          pathname: '/result',
          params: { base64 },
        });
      } catch (err) {
        console.error('Failed to generate image', err);
        Alert.alert('Error', 'Something went wrong');
      }
    };

    generateImage();
  }, []);

  return (
    <ImageBackground
      source={{ uri }}
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      blurRadius={2}
    >
      <ActivityIndicator size="large" color="white" />
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>Processing...</Text>
    </ImageBackground>
  );
}

async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl.split(',')[1]); // Remove prefix
    };
    reader.readAsDataURL(blob);
  });
}
