import { useEffect } from "react";
import { View, Text, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Animated, {
  FadeInDown,
  FadeOut,
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withSpring,
  withTiming,
  withRepeat,
  withSequence,
  Easing,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useFonts, GreatVibes_400Regular } from "@expo-google-fonts/great-vibes";
import GlowButton from "../components/GlowButton";
import{useRouter} from 'expo-router';

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [fontsLoaded] = useFonts({ GreatVibes_400Regular });

  // Animation values (must stay ABOVE the early return below)
  const slide = useSharedValue(hp(25));
  const opacity = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    if (!fontsLoaded) return;

    slide.value = withDelay(300, withSpring(0, { damping: 14, stiffness: 90 }));
    opacity.value = withDelay(300, withTiming(1, { duration: 500 }));

    pulse.value = withDelay(
      1300,
      withRepeat(
        withSequence(
          withTiming(1.06, { duration: 900, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: 900, easing: Easing.inOut(Easing.ease) })
        ),
        -1,
        false
      )
    );
  }, [fontsLoaded]);

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: slide.value }, { scale: pulse.value }],
  }));

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, justifyContent: "flex-end" }}>
      {/* Background photo */}
      <Image
        style={{ position: "absolute", width: "100%", height: "100%" }}
        source={require("../../assets/images/welcome_page.jpg")}
        resizeMode="cover"
      />

      {/* Top fade */}
      <LinearGradient
        colors={["rgba(0,0,0,0.65)", "transparent"]}
        style={{ position: "absolute", top: 0, width: wp(100), height: hp(28) }}
      />

      {/* Bottom fade */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.85)"]}
        style={{ position: "absolute", bottom: 0, width: wp(100), height: hp(40) }}
      />

      {/* Title */}
      <Animated.View
        entering={FadeInDown.delay(100).springify()}
        exiting={FadeOut.duration(100)}
        style={{
          position: "absolute",
          top: insets.top + hp(3),
          left: 0,
          right: 0,
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: hp(5),
            color: "white",
            fontWeight: "800",
            textAlign: "center",
            textShadowColor: "rgba(0,0,0,0.4)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 6,
          }}
        >
          Body by{" "}
          <Text
            style={{
              fontFamily: "GreatVibes_400Regular",
              fontSize: hp(7),
              fontWeight: "normal",
              color: "#fbcfe8",
            }}
          >
            Retha
          </Text>
        </Text>
      </Animated.View>

      {/* Button: slides up, then pulses */}
      <View style={{ paddingBottom: hp(6), alignItems: "center" }}>
        <Animated.View style={buttonAnimatedStyle}>
          <GlowButton
            title="GET STARTED"
            onPress={() => router.push('/gender')}
            style={{ width: wp(80) }}
          />
        </Animated.View>
      </View>
    </View>
  );
}
