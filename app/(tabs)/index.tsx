import { View, Text, Image, ScrollView, Pressable, Dimensions } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const { height, width } = Dimensions.get("window");
const HEADER_HEIGHT = height * 0.45;

export default function Home() {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <StatusBar style="light" translucent />
      {/* Header Image */}
      <View style={{ height: HEADER_HEIGHT}}>
        <Image
          source={require("../../assets/images/homescreen/man_origin.png")}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
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
            source={require("../../assets/images/homescreen/man_converted.png")}
            style={{
              width: width * 0.4,
              height: "100%",
              marginRight: 16,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <Image
            source={require("../../assets/images/homescreen/girl_converted.png")}
            style={{
              width: width * 0.4,
              height: "100%",
              marginRight: 16,
              borderRadius: 12,
            }}
            resizeMode="cover"
          />
          <Image
            source={require("../../assets/images/homescreen/girl2_converted.png")}
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
