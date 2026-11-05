
import { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import {
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import ImageSlider from "../components/ImageSlider";
import GymEquipment from "../components/GymEquipment";
import Workouts from "../components/Workouts";
import ProfileSidebar from "../components/ProfileSidebar";

export default function Home() {
  const router = useRouter();

  const { gender = "all" } = useLocalSearchParams();

  const [menuOpen, setMenuOpen] = useState(false);

  const navigateMenu = (route) => {
    setMenuOpen(false);

    if (route !== "/home") {
      router.push(route);
    }
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      edges={["top"]}
    >
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: hp(5),
        }}
      >
        {/* Header and profile */}
        <View className="flex-row items-center justify-between mx-5 mb-5">
          <View className="flex-1 mr-3">
            <Text
              style={{ fontSize: hp(3.2) }}
              className="font-bold tracking-wider text-neutral-700"
            >
              REAL FITNESS, REAL RESULTS
            </Text>
          </View>

          {/* Clickable avatar */}
          <Pressable
            onPress={() => setMenuOpen(true)}
            accessibilityRole="button"
            accessibilityLabel="Open profile menu"
            hitSlop={12}
          >
            <Image
              source={require("../../assets/images/avator.jpg")}
              style={{
                height: hp(6),
                width: hp(6),
                borderRadius: 999,
              }}
            />
          </Pressable>
        </View>

        {/* Educational slider */}
        <View className="mb-6">
          <ImageSlider />
        </View>

        {/* Gym equipment tutorials */}
        <View className="mb-6">
          <GymEquipment
            gender={gender}
            onPress={(item) =>
              router.push(`/equipment/${item.id}`)
            }
          />
        </View>

        {/* Workouts */}
        <View>
          <Workouts
            gender={gender}
            onPress={(part, mode) =>
              router.push({
                pathname: "/workouts/[part]",
                params: {
                  part: part.id,
                  mode,
                  gender,
                },
              })
            }
          />
        </View>
      </ScrollView>

      {/* Profile sidebar */}
      <ProfileSidebar
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onNavigate={navigateMenu}
      />
    </SafeAreaView>
  );
}
