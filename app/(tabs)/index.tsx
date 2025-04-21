import { View, Text, Image, ScrollView, Pressable, Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useRef, useEffect, useState } from "react";
import { FlatList } from "react-native";

const { height, width } = Dimensions.get("window");
const HEADER_HEIGHT = height * 0.45;
const headerImages = [
  require("../../assets/images/homescreen/header/2girls_origin.png"),
  require("../../assets/images/homescreen/header/2girls_converted.png"),
  require("../../assets/images/homescreen/header/girls_origin.png"),
  require("../../assets/images/homescreen/header/girls_converted.png"),
];


export default function Home() {
  const insets = useSafeAreaInsets();
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % headerImages.length;
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
      setCurrentIndex(nextIndex);
    }, 1000); // change every 1s
  
    return () => clearInterval(interval);
  }, [currentIndex]);  

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar style="light" translucent />
      {/* Header Image */}
      <View style={{ height: HEADER_HEIGHT}}>
        <FlatList
        ref={flatListRef}
        data={headerImages}
        horizontal
        pagingEnabled
        scrollEnabled={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Image
            source={item}
            style={{ width, height: HEADER_HEIGHT }}
            resizeMode="cover"
          />
        )}
      />

        {/* Overlayed Content */}
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
          <Image
            source={require("../../assets/images/homescreen/gallery/man_converted.png")}
            style={{
              width: width * 0.4,
              height: "100%",
              marginRight: 16,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <Image
            source={require("../../assets/images/homescreen/gallery/girl_converted.png")}
            style={{
              width: width * 0.4,
              height: "100%",
              marginRight: 16,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <Image
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
      >
      </View>
    </SafeAreaView>
  );
}
