// app/create.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CreateScreen() {
  const router = useRouter();

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      router.push({
        pathname: '/loading',
        params: { uri: result.assets[0].uri },
      });
    }
  };

  return (
    <View style={styles.safeArea}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.replace('/')}>
        <Ionicons name="chevron-back" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.container}>
        <Image
          source={require('../assets/images/homescreen/header/girls_origin.png')}
          style={styles.image}
          resizeMode="cover"
        />

        <Text style={styles.title}>Old School Anime AI</Text>
        <Text style={styles.subtitle}>
          It works best with vertical portrait photos of a person 😉
        </Text>

        <TouchableOpacity onPress={handlePickImage} style={styles.importButton}>
          <Text style={styles.importText}>Import</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E293B', // Softer modern deep blue background
    paddingTop: Platform.OS === 'ios' ? 60 : 30,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 30,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.45,
    borderRadius: 16,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: '#CBD5E1', // light gray-blue
    textAlign: 'center',
  },
  importButton: {
    marginTop: 30,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 32,
    alignSelf: 'center',
  },
  importText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
});
