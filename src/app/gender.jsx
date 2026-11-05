import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import GlowButton from "../components/GlowButton";

export default function Gender() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const choose = (gender) =>
    router.push({ pathname: "/home", params: { gender } });

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      {/* Background photo (change .jpg if your file is .png) */}
      <Image
        style={{ position: "absolute", width: "100%", height: "100%" }}
        source={require("../../assets/images/gender_page.jpg")}
        resizeMode="cover"
      />

      {/* Top fade */}
      <LinearGradient
        colors={["rgba(0,0,0,0.65)", "transparent"]}
        style={{ position: "absolute", top: 0, width: wp(100), height: hp(28) }}
      />

      {/* Bottom fade */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.88)"]}
        style={{ position: "absolute", bottom: 0, width: wp(100), height: hp(50) }}
      />

      {/* Title */}
      <Animated.View
        entering={FadeInDown.delay(100).springify()}
        style={{
          position: "absolute",
          top: insets.top + hp(4),
          left: 24,
          right: 24,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: hp(4),
            color: "white",
            fontWeight: "800",
            textAlign: "center",
            textShadowColor: "rgba(0,0,0,0.4)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6,
          }}
        >
          Who are we training today?
        </Text>
        <Text
          style={{
            fontSize: hp(2),
            color: "rgba(255,255,255,0.85)",
            textAlign: "center",
            marginTop: 8,
          }}
        >
          We'll tailor your equipment and workouts.
        </Text>
      </Animated.View>

      {/* Choices */}
      <Animated.View
        entering={FadeInDown.delay(300).springify()}
        style={{
          paddingBottom: insets.bottom + hp(5),
          alignItems: "center",
        }}
      >
        <GlowButton
          title="I'M A WOMAN"
          onPress={() => choose("woman")}
          style={{ width: wp(80), marginBottom: hp(2) }}
        />
        <GlowButton
          title="I'M A MAN"
          onPress={() => choose("man")}
          style={{ width: wp(80), marginBottom: hp(2.5) }}
        />

        <TouchableOpacity onPress={() => choose("all")} hitSlop={12}>
          <Text
            style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: hp(1.9),
              textDecorationLine: "underline",
            }}
          >
            Show me everything
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}