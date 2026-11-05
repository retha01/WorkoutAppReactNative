
import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const PINK = "#EC4899";

export default function ProfileSidebar({
  visible,
  onClose,
  onNavigate,
}) {
  const insets = useSafeAreaInsets();

  const items = [
    {
      label: "Settings",
      icon: "settings-outline",
      route: "/settings",
    },
    {
      label: "About the App",
      icon: "information-circle-outline",
      route: "/about",
    },
    {
      label: "Back to Home",
      icon: "home-outline",
      route: "/home",
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        {/* Tap outside to close */}
        <Pressable
          accessibilityLabel="Close profile menu"
          style={StyleSheet.absoluteFill}
          onPress={onClose}
        />

        <View
          style={[
            styles.drawer,
            {
              paddingTop: insets.top + 18,
              paddingBottom: insets.bottom + 24,
            },
          ]}
        >
          <View style={styles.top}>
            <Text style={styles.header}>Profile</Text>

            <Pressable
              accessibilityLabel="Close menu"
              onPress={onClose}
              hitSlop={10}
            >
              <Ionicons
                name="close"
                size={26}
                color="#4B5563"
              />
            </Pressable>
          </View>

          {/* Profile information */}
          <View style={styles.identity}>
            <Image
              source={require("../../assets/images/avator.jpg")}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>
                Body by Retha
              </Text>

              <Text style={styles.subtitle}>
                Your fitness companion
              </Text>
            </View>
          </View>

          {/* Menu options */}
          {items.map(({ label, icon, route }) => (
            <Pressable
              key={route}
              style={styles.option}
              onPress={() => onNavigate(route)}
            >
              <Ionicons
                name={icon}
                size={23}
                color={PINK}
              />

              <Text style={styles.optionText}>
                {label}
              </Text>

              <Ionicons
                name="chevron-forward"
                size={18}
                color="#9CA3AF"
              />
            </Pressable>
          ))}

          <View style={{ flex: 1 }} />

          <Text style={styles.footer}>
            No account needed · Just move at your pace
          </Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.38)",
  },

  drawer: {
    width: "82%",
    maxWidth: 360,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },

  top: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 26,
  },

  header: {
    fontSize: 25,
    fontWeight: "800",
    color: "#333333",
  },

  identity: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingBottom: 28,
    borderBottomWidth: 1,
    borderColor: "#FCE7F3",
    marginBottom: 12,
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
  },

  name: {
    fontWeight: "800",
    fontSize: 17,
    color: "#333333",
  },

  subtitle: {
    color: "#737373",
    marginTop: 4,
    fontSize: 12,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#F9EAF1",
  },

  optionText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: "#404040",
  },

  footer: {
    textAlign: "center",
    color: "#888888",
    fontSize: 12,
  },
});
