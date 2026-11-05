import { useState } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { bodyParts, getBodyPartImage } from "../../constants";
import { getPlan } from "../../constants/exercises";

const MODES = [
  { key: "equipment", label: "With equipment" },
  { key: "noEquipment", label: "No equipment" },
];

export default function WorkoutList() {
  const router = useRouter();
  const { part: partId, mode: modeParam = "equipment", gender = "all" } =
    useLocalSearchParams();
  const [mode, setMode] = useState(modeParam);

  const part = bodyParts.find((p) => p.id === partId);
  const plan = getPlan(partId, mode);
  const image = part ? getBodyPartImage(part, gender, mode) : null;

  if (!part) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-neutral-700">Workout not found.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4">
          <Text className="text-pink-500">Go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white" edges={["top"]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: hp(6) }}
      >
        <View className="flex-row items-center mx-5 mb-4">
          <TouchableOpacity onPress={() => router.back()} hitSlop={12} className="mr-3">
            <Text style={{ fontSize: hp(4), color: "#404040" }}>‹</Text>
          </TouchableOpacity>
          <Text style={{ fontSize: hp(3) }} className="font-bold text-neutral-700">
            {part.name} workout
          </Text>
        </View>

        {image && (
          <Image
            source={image}
            style={{
              height: hp(28),
              borderRadius: 20,
              marginHorizontal: 20,
              width: undefined,
            }}
            resizeMode="cover"
          />
        )}

        {/* toggle */}
        <View className="flex-row mx-5 mt-5 mb-4">
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

        {plan.length > 0 && (
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: "/play/[id]",
                params: { id: `${partId}-${mode}`, part: partId, mode },
              })
            }
            style={{
              backgroundColor: "#ec4899",
              marginHorizontal: 20,
              marginBottom: 16,
              paddingVertical: 16,
              borderRadius: 16,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: hp(2),
                fontWeight: "700",
                letterSpacing: 1,
              }}
            >
              START WORKOUT
            </Text>
          </TouchableOpacity>
        )}

        {/* exercises */}
        <View className="mx-5">
          {plan.length === 0 && (
            <Text className="text-neutral-500">No exercises here yet.</Text>
          )}
          {plan.map((e, i) => (
            <TouchableOpacity
              key={e.id}
              activeOpacity={0.85}
              onPress={() => router.push(`/play/${e.id}`)}
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f5f5f5",
                padding: 14,
                borderRadius: 16,
                marginBottom: 10,
              }}
            >
              <View
                style={{
                  width: hp(4),
                  height: hp(4),
                  borderRadius: 999,
                  backgroundColor: "#ec4899",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 14,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "700", fontSize: hp(1.9) }}>
                  {i + 1}
                </Text>
              </View>
              <View className="flex-1">
                <Text
                  style={{ fontSize: hp(2.1), fontWeight: "600" }}
                  className="text-neutral-700"
                >
                  {e.name}
                </Text>
                <Text style={{ fontSize: hp(1.6) }} className="text-neutral-500">
                  {e.seconds}s
                  {e.muscles.length > 0 ? ` · ${e.muscles.join(", ")}` : ""}
                </Text>
              </View>
              <Text style={{ fontSize: hp(3), color: "#a3a3a3" }}>›</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}