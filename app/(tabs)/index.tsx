import {
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Animated,
  Image as RNImage,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRef, useEffect, useState } from "react";

const { height, width } = Dimensions.get("window");
const HEADER_HEIGHT = height * 0.45;

const headerImages = [
  require("../../assets/images/homescreen/header/2girls_origin.png"),
  require("../../assets/images/homescreen/header/2girls_converted.png"),
  require("../../assets/images/homescreen/header/girls_origin.png"),
  require("../../assets/images/homescreen/header/girls_converted.png"),
];

export default function Home() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);

  const animateDissolve = () => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (currentIndex + 1) % headerImages.length;
      setNextIndex(newIndex);
      animateDissolve();
      setTimeout(() => setCurrentIndex(newIndex), 800);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar style="light" translucent />

      {/* Header with dissolve effect only */}
      <View style={{ height: HEADER_HEIGHT }}>
        <RNImage
          source={headerImages[currentIndex]}
          style={{ width, height: HEADER_HEIGHT, position: "absolute" }}
          resizeMode="cover"
        />

        <Animated.Image
          source={headerImages[nextIndex]}
          style={{
            width,
            height: HEADER_HEIGHT,
            position: "absolute",
            opacity: fadeAnim,
          }}
          resizeMode="cover"
        />

        {/* Overlayed Text & Button */}
        <View
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 16,
          }}
        >
          <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", marginBottom: 0 }}>
            OLD SCHOOL
          </Text>
          <Text style={{ color: "white", fontSize: 32, fontWeight: "bold", marginBottom: 0 }}>
            ANIME
          </Text>
          <Text style={{ color: "white", fontSize: 14, marginBottom: 180 }}>
            昔ながらのアニメ
          </Text>

          <Pressable
            style={{
              backgroundColor: "white",
              paddingHorizontal: 24,
              paddingVertical: 12,
              borderRadius: 30,
            }}
          >
            <Text style={{ color: "black", fontWeight: "600" }}>Create</Text>
          </Pressable>
        </View>
      </View>



      {/* AI Photo Gallery */}
      <View style={{ flex: 1, paddingHorizontal: 16, paddingTop: 16 }}>
        <Text style={{ color: "#A855F7", fontWeight: "600", fontSize: 12 }}>EXCLUSIVE</Text>
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold", marginBottom: 12 }}>
          AI Photo 📷
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <RNImage
            source={require("../../assets/images/homescreen/gallery/man_converted.png")}
            style={{
              width: width * 0.4,
              height: "100%",
              marginRight: 16,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <RNImage
            source={require("../../assets/images/homescreen/gallery/girl_converted.png")}
            style={{
              width: width * 0.4,
              height: "100%",
              marginRight: 16,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <RNImage
            source={require("../../assets/images/homescreen/gallery/girl2_converted.png")}
            style={{
              width: width * 0.4,
              height: "100%",
              marginRight: 16,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
        </ScrollView>
      </View>

      {/* Bottom Navigation */}
      <View
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "black",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingVertical: 16,
          borderTopColor: "#333",
          borderTopWidth: 1,
        }}
      />
    </SafeAreaView>
  );
}
