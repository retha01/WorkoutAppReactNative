
import {
  View,
  Text,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function Settings() {
  const router = useRouter();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#FFFFFF",
        padding: 24,
      }}
    >
      {/* Back button */}
      <Pressable
        onPress={() => router.back()}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 8,
          marginBottom: 36,
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

      <Text
        style={{
          fontSize: 30,
          fontWeight: "800",
          color: "#333333",
        }}
      >
        Settings
      </Text>

      <View
        style={{
          borderRadius: 18,
          padding: 20,
          backgroundColor: "#FDF2F8",
          marginTop: 25,
        }}
      >
        <Ionicons
          name="options-outline"
          color="#EC4899"
          size={32}
        />

        <Text
          style={{
            fontSize: 18,
            fontWeight: "700",
            color: "#9D174D",
            marginTop: 12,
          }}
        >
          Keeping it simple
        </Text>

        <Text
          style={{
            color: "#555555",
            fontSize: 15,
            lineHeight: 23,
            marginTop: 8,
          }}
        >
          There are no account settings to manage yet.
          You can use the app and all its workouts
          without signing in.
        </Text>
      </View>

      <Pressable
        onPress={() => router.replace("/home")}
        style={{
          backgroundColor: "#EC4899",
          borderRadius: 15,
          marginTop: 28,
          padding: 16,
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
    </SafeAreaView>
  );
}
