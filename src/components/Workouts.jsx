import { useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getBodyParts, getBodyPartImage } from "../constants";

const MODES = [
  { key: "equipment", label: "With equipment" },
  { key: "noEquipment", label: "No equipment" },
];

export default function Workouts({ gender = "all", onPress }) {
  const [mode, setMode] = useState("equipment");

  // Attach the best image for this gender + mode, drop parts with none
  const items = getBodyParts(gender)
    .map((part) => ({ part, image: getBodyPartImage(part, gender, mode) }))
    .filter((x) => x.image);

  return (
    <View>
      <View className="mx-5 mb-3">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          Workouts
        </Text>

        {/* toggle */}
        <View className="mt-3 flex-row">
          {MODES.map((m) => {
            const active = mode === m.key;
            return (
              <TouchableOpacity
                key={m.key}
                onPress={() => setMode(m.key)}
                style={{
                  backgroundColor: active ? "#ec4899" : "#f5f5f5",
                  paddingVertical: 8,
                  paddingHorizontal: 16,
                  borderRadius: 999,
                  marginRight: 10,
                }}
              >
                <Text
                  style={{
                    color: active ? "#fff" : "#525252",
                    fontSize: hp(1.7),
                    fontWeight: "600",
                  }}
                >
                  {m.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item.part.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onPress?.(item.part, mode)}
            activeOpacity={0.85}
            style={{ width: wp(40) }}
          >
            <Image
              source={item.image}
              style={{ width: "100%", height: hp(28), borderRadius: 20 }}
              resizeMode="cover"
            />
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: 10,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: "rgba(0,0,0,0.45)",
              }}
            >
              <Text
                style={{ fontSize: hp(2), color: "#fff", fontWeight: "700" }}
              >
                {item.part.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}