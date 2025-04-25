// app/create.tsx
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

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
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black', padding: 20 }}>
      <Image
        source={require('../assets/images/homescreen/header/girls_origin.png')} // or remote image URL
        style={{ width: '100%', height: 400, borderRadius: 20 }}
        resizeMode="cover"
      />
      <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 10 }}>
        Old School Anime AI
      </Text>
      <Text style={{ color: 'gray', textAlign: 'center' }}>
        It works best with vertical portrait photos of a person 😉
      </Text>

      <TouchableOpacity
        onPress={handlePickImage}
        style={{
          backgroundColor: 'white',
          borderRadius: 999,
          paddingVertical: 10,
          paddingHorizontal: 30,
          alignSelf: 'center',
          marginTop: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Import</Text>
      </TouchableOpacity>
    </View>
  );
}

export default CreateScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  backText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 4,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    backgroundColor: '#1c1c1e',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height * 0.45,
    borderRadius: 12,
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  importButton: {
    marginTop: 30,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 32,
  },
  importText: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
  },
});
