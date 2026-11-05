
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function About() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
      }}
    >
      <ScrollView
        contentContainerStyle={{ padding: 24 }}
      >
        {/* Back button */}
        <Pressable
          onPress={() => router.back()}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            marginBottom: 32,
          }}
        >
          <Ionicons
            name="arrow-back"
            color="#EC4899"
            size={24}
          />

          <Text
            style={{
              color: "#EC4899",
              fontWeight: "700",
            }}
          >
            Back
          </Text>
        </Pressable>

        <Ionicons
          name="heart-circle"
          size={56}
          color="#EC4899"
        />

        <Text
          style={{
            fontSize: 30,
            fontWeight: "800",
            color: "#333333",
            marginTop: 12,
          }}
        >
          Body by Retha
        </Text>

        <Text
          style={{
            fontSize: 17,
            color: "#EC4899",
            marginTop: 8,
            fontWeight: "700",
          }}
        >
          Real fitness, real results
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: "#525252",
            lineHeight: 25,
            marginTop: 22,
          }}
        >
          A simple fitness companion to help you
          explore workouts, learn how to use gym
          equipment and discover practical health
          information without unnecessary pressure.
        </Text>

        {/* Developer information */}
        <View
          style={{
            marginTop: 28,
            backgroundColor: "#FDF2F8",
            padding: 20,
            borderRadius: 18,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "800",
              color: "#9D174D",
            }}
          >
            Meet the developer
          </Text>

          <Text
            style={{
              fontSize: 15,
              color: "#555555",
              lineHeight: 24,
              marginTop: 10,
            }}
          >
            This app was created by an unemployed
            Information Systems graduate from the
            University of Pretoria who enjoys building
            apps for fun, learning through experimentation
            and turning ideas into useful tools.
          </Text>
        </View>

        <Text
          style={{
            color: "#777777",
            marginTop: 24,
            lineHeight: 21,
          }}
        >
          Wellness facts are for general education and
          do not replace professional medical or
          nutritional advice.
        </Text>

        {/* Return home */}
        <Pressable
          onPress={() => router.replace("/home")}
          style={{
            backgroundColor: "#EC4899",
            padding: 16,
            marginTop: 28,
            borderRadius: 15,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              fontWeight: "800",
            }}
          >
            Back to Home
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
