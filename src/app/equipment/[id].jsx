import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { gymEquipment } from "../../constants";
import { slug } from "../../constants/exercises";

// Accepts any normal YouTube link (watch, youtu.be, shorts, embed)
function getYouTubeId(url) {
  const m = String(url).match(
    /(?:youtu\.be\/|[?&]v=|\/embed\/|\/shorts\/)([A-Za-z0-9_-]{11})/
  );
  return m ? m[1] : null;
}

// Set to false if the embedded player won't load on your phone.
// You'll get a tappable thumbnail that opens the video in YouTube instead.
const USE_EMBED = true;

function TutorialVideo({ url }) {
  const { width } = useWindowDimensions();
  const [failed, setFailed] = useState(false);
  const id = getYouTubeId(url);
  const w = width - 40; // matches the mx-5 margins
  const h = Math.round((w * 9) / 16);
  const open = () => Linking.openURL(url);

  // Thumbnail card: always works, opens the YouTube app or browser
  if (!id || failed || !USE_EMBED) {
    return (
      <TouchableOpacity onPress={open} activeOpacity={0.85}>
        <View
          style={{
            height: h,
            borderRadius: 20,
            overflow: "hidden",
            backgroundColor: "#262626",
          }}
        >
          {id && (
            <Image
              source={{ uri: `https://img.youtube.com/vi/${id}/hqdefault.jpg` }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          )}
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.25)",
            }}
          >
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: "#ec4899",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontSize: 28, marginLeft: 4 }}>▶</Text>
            </View>
            <Text style={{ color: "#fff", marginTop: 10, fontWeight: "600" }}>
              Watch on YouTube
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <View style={{ borderRadius: 20, overflow: "hidden" }}>
        <YoutubePlayer
          height={h}
          width={w}
          videoId={id}
          webViewProps={{ allowsInlineMediaPlayback: true }}
          onError={(e) => {
            console.log("YouTube player error:", e);
            setFailed(true);
          }}
        />
      </View>
      <TouchableOpacity onPress={open} className="mt-2 self-start">
        <Text style={{ color: "#ec4899", fontSize: hp(1.7) }}>
          Video not playing? Open in YouTube
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function EquipmentDetail() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const equipment = gymEquipment.find((e) => e.id === id);

  if (!equipment) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <Text className="text-neutral-700">Equipment not found.</Text>
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
        {/* header */}
        <View className="flex-row items-center mx-5 mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            hitSlop={12}
            className="mr-3"
          >
            <Ionicons name="chevron-back" size={hp(3.4)} color="#404040" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text
              style={{ fontSize: hp(3) }}
              className="font-bold text-neutral-700"
            >
              {equipment.name}
            </Text>
            <Text style={{ fontSize: hp(1.7) }} className="text-neutral-500">
              {equipment.category}
            </Text>
          </View>
        </View>

        {/* video if available, otherwise the photo */}
        <View className="mx-5 mb-6">
          {equipment.video ? (
            <TutorialVideo url={equipment.video} />
          ) : (
            <Image
              source={equipment.image}
              style={{ width: "100%", height: hp(26), borderRadius: 20 }}
              resizeMode="cover"
            />
          )}
        </View>

        {/* targets */}
        <Section title="What it targets">
          <View className="flex-row flex-wrap">
            {equipment.targets.map((t) => (
              <View
                key={t}
                style={{
                  backgroundColor: "#fce7f3",
                  paddingVertical: 6,
                  paddingHorizontal: 14,
                  borderRadius: 999,
                  marginRight: 8,
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    color: "#be185d",
                    fontSize: hp(1.8),
                    fontWeight: "600",
                  }}
                >
                  {t}
                </Text>
              </View>
            ))}
          </View>
        </Section>

        {/* benefit */}
        <Section title="Why use it">
          <Text
            style={{ fontSize: hp(1.9), lineHeight: hp(2.9) }}
            className="text-neutral-600"
          >
            {equipment.benefit}
          </Text>
        </Section>

        {/* steps */}
        <Section title="How to use it">
          {equipment.howToUse.map((step, i) => (
            <View key={i} className="flex-row mb-3">
              <View
                style={{
                  width: hp(3.4),
                  height: hp(3.4),
                  borderRadius: 999,
                  backgroundColor: "#ec4899",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: 12,
                }}
              >
                <Text
                  style={{ color: "#fff", fontSize: hp(1.7), fontWeight: "700" }}
                >
                  {i + 1}
                </Text>
              </View>
              <Text
                style={{ fontSize: hp(1.9), lineHeight: hp(2.8) }}
                className="flex-1 text-neutral-600"
              >
                {step}
              </Text>
            </View>
          ))}
        </Section>

        {/* suggested workouts */}
        <Section title="Suggested workouts">
          {equipment.workouts.map((w) => (
            <TouchableOpacity
              key={w}
              activeOpacity={0.85}
              onPress={() =>
                router.push({
                  pathname: "/play/[id]",
                  params: { id: slug(w), name: w },
                })
              }
              style={{
                backgroundColor: "#f5f5f5",
                padding: 14,
                borderRadius: 14,
                marginBottom: 8,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ fontSize: hp(1.9), fontWeight: "600" }}
                className="text-neutral-700"
              >
                {w}
              </Text>
              <Text style={{ fontSize: hp(2.6), color: "#a3a3a3" }}>›</Text>
            </TouchableOpacity>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const Section = ({ title, children }) => (
  <View className="mx-5 mb-6">
    <Text
      style={{ fontSize: hp(2.4) }}
      className="mb-3 font-semibold text-neutral-700"
    >
      {title}
    </Text>
    {children}
  </View>
);