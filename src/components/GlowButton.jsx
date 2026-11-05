import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Svg, { Defs, RadialGradient, Stop, Rect } from "react-native-svg";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

/* Draws a CSS-style radial gradient that fills its parent.
   `at` = center as fractions of the box (0.8, -0.1 = "80% -10%"), `r` = radius in px */
function RadialFill({ id, at, r, stops }) {
  const [size, setSize] = useState({ w: 0, h: 0 });

  return (
    <View
      pointerEvents="none"
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      onLayout={(e) =>
        setSize({
          w: e.nativeEvent.layout.width,
          h: e.nativeEvent.layout.height,
        })
      }
    >
      {size.w > 0 && (
        <Svg width={size.w} height={size.h}>
          <Defs>
            <RadialGradient
              id={id}
              cx={at[0] * size.w}
              cy={at[1] * size.h}
              r={r}
              gradientUnits="userSpaceOnUse"
            >
              {stops.map((s, i) => (
                <Stop
                  key={i}
                  offset={s.offset}
                  stopColor={s.color}
                  stopOpacity={s.opacity ?? 1}
                />
              ))}
            </RadialGradient>
          </Defs>
          <Rect width={size.w} height={size.h} fill={`url(#${id})`} />
        </Svg>
      )}
    </View>
  );
}

export default function GlowButton({ title, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        style,
        { transform: [{ scale: pressed ? 0.97 : 1 }] },
      ]}
    >
      <View className="relative">
        {/* The soft white glow behind the top-right (the CSS ::after) */}
        <View
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "65%",
            height: "60%",
            borderRadius: 120,
            backgroundColor: "#181b1b",
            shadowColor: "#ffffff",
            shadowOpacity: 0.25,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 0 },
            elevation: 8,
          }}
        />

        {/* Outer shell with the white-to-dark edge highlight */}
        <View className="rounded-2xl p-[2px] overflow-hidden">
          <RadialFill
            id="shell"
            at={[0.8, -0.1]}
            r={80}
            stops={[
              { offset: 0, color: "#ffffff" },
              { offset: 1, color: "#181b1b" },
            ]}
          />

          {/* Blue glow in the bottom-left corner (blob1) */}
          <View
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 0,
              width: 70,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <RadialFill
              id="blob"
              at={[0, 1]}
              r={60}
              stops={[
                { offset: 0, color: "#3fe9ff" },
                { offset: 0.5, color: "#0000ff", opacity: 0.5 },
                { offset: 1, color: "#0000ff", opacity: 0 },
              ]}
            />
          </View>

          {/* Dark inner face */}
          <View className="rounded-[14px] overflow-hidden items-center justify-center py-[14px] px-[25px]">
            <RadialFill
              id="inner"
              at={[0.8, -0.5]}
              r={80}
              stops={[
                { offset: 0, color: "#ea85d7" },
                { offset: 1, color: "#fa8de9" },
              ]}
            />
            {/* Faint cyan tint in the bottom-left (inner::before) */}
            <RadialFill
              id="tint"
              at={[0, 1]}
              r={60}
              stops={[
                { offset: 0, color: "#ff0084", opacity: 0.1 },
                { offset: 0.5, color: "#ff00b3", opacity: 0.07 },
                { offset: 1, color: "#ff00e6", opacity: 0 },
              ]}
            />
            <Text
              className="text-white font-bold tracking-widest"
              style={{ fontSize: hp(2.6) }}
            >
              {title}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}