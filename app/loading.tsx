import { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { View, Text, ImageBackground, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';

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
        } as any);

        formData.append('prompt', 'Anime style portrait...');

        const response = await axios.post(
          'https://3dfe-34-19-62-158.ngrok-free.app/generate',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            responseType: 'blob',
          }
        );

        const blob = response.data;
        const base64 = await blobToBase64(blob);
        router.push({
          pathname: '/result',
          params: { base64 },
        });
      } catch (err) {
        // You can log it silently if needed, or just remove this line
        // console.error('Failed to generate image', err);  ← REMOVE THIS
      
        Alert.alert(
          'Generation Failed',
          'Something went wrong while generating the image.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/create'),
            },
          ],
          { cancelable: false }
        );
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
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>
        Processing...
      </Text>
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
