
import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  Linking,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { wellnessFacts } from "../constants/wellnessFacts";

const SCREEN = wp(100);
const ITEM_W = SCREEN * 0.83;
const ITEM_H = ITEM_W * 0.82;
const GAP = 12;
const STEP = ITEM_W + GAP;
const SIDE = (SCREEN - ITEM_W) / 2;
const SHIFT = ITEM_W * 0.18;

const REPEAT = 100;
const N = wellnessFacts.length;

const DATA = Array.from(
  { length: REPEAT * N },
  (_, i) => wellnessFacts[i % N]
);

const START = Math.floor(REPEAT / 2) * N;
const PINK = "#EC4899";

export default function ImageSlider() {
  const listRef = useRef(null);
  const indexRef = useRef(START);
  const interacting = useRef(false);
  const scrollX = useSharedValue(START * STEP);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollX.value = e.contentOffset.x;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      if (interacting.current) return;

      if (indexRef.current >= DATA.length - 4) {
        indexRef.current = START;

        listRef.current?.scrollToOffset({
          offset: START * STEP,
          animated: false,
        });
      }

      indexRef.current += 1;

      listRef.current?.scrollToOffset({
        offset: indexRef.current * STEP,
        animated: true,
      });
    }, 5500);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ height: ITEM_H + 12 }}>
      <Animated.FlatList
        ref={listRef}
        data={DATA}
        keyExtractor={(_, i) => String(i)}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={STEP}
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: SIDE,
          alignItems: "center",
        }}
        getItemLayout={(_, i) => ({
          length: STEP,
          offset: STEP * i,
          index: i,
        })}
        initialScrollIndex={START}
        initialNumToRender={5}
        windowSize={5}
        scrollEventThrottle={16}
        onScroll={onScroll}
        onTouchStart={() => {
          interacting.current = true;
        }}
        onTouchEnd={() => {
          interacting.current = false;
        }}
        onScrollBeginDrag={() => {
          interacting.current = true;
        }}
        onMomentumScrollEnd={(e) => {
          indexRef.current = Math.round(
            e.nativeEvent.contentOffset.x / STEP
          );
          interacting.current = false;
        }}
        renderItem={({ item, index }) => (
          <Slide
            item={item}
            index={index}
            scrollX={scrollX}
          />
        )}
      />
    </View>
  );
}

function Slide({ item, index, scrollX }) {
  const range = [
    (index - 1) * STEP,
    index * STEP,
    (index + 1) * STEP,
  ];

  const cardStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          scrollX.value,
          range,
          [0.9, 1, 0.9],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  const photoStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          scrollX.value,
          range,
          [-SHIFT, 0, SHIFT],
          Extrapolation.CLAMP
        ),
      },
    ],
  }));

  async function openSource() {
    try {
      await Linking.openURL(item.url);
    } catch (error) {
      Alert.alert(
        "Unable to open article",
        "Please check your internet connection and try again."
      );
    }
  }

  return (
    <Animated.View
      style={[
        {
          width: ITEM_W,
          height: ITEM_H,
          marginRight: GAP,
          borderRadius: 22,
          overflow: "hidden",
          backgroundColor: "#34202B",
        },
        cardStyle,
      ]}
    >
      {/* Background image */}
      <Animated.View
        style={[
          {
            position: "absolute",
            left: -SHIFT,
            width: ITEM_W + SHIFT * 2,
            height: "100%",
          },
          photoStyle,
        ]}
      >
        <Image
          source={item.image}
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Animated.View>

      {/* Dark image overlay for readable text */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "rgba(22,10,20,0.70)",
        }}
      />

      {/* Educational content */}
      <View
        style={{
          flex: 1,
          padding: 18,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              color: "#FFB8DA",
              fontSize: 11,
              letterSpacing: 1.5,
              fontWeight: "800",
            }}
          >
            DID YOU KNOW? · {item.category}
          </Text>

          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 20,
              fontWeight: "800",
              marginTop: 10,
              lineHeight: 24,
            }}
          >
            {item.title}
          </Text>

          <Text
            numberOfLines={4}
            style={{
              color: "#FFFFFF",
              fontSize: 13,
              lineHeight: 19,
              marginTop: 9,
            }}
          >
            {item.fact}
          </Text>
        </View>

        {/* Research link */}
        <Pressable
          accessibilityRole="link"
          accessibilityLabel={`Read more from ${item.source}`}
          onPress={openSource}
          style={{
            alignSelf: "flex-start",
            paddingVertical: 9,
            paddingHorizontal: 12,
            backgroundColor: PINK,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "700",
              fontSize: 12,
            }}
          >
            Read more · {item.source} ↗
          </Text>
        </Pressable>
      </View>
    </Animated.View>
  );
}
