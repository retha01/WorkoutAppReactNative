import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { getEquipment } from "../constants";

export default function GymEquipment({ gender = "all", onPress }) {
  return (
    <View>
      <View className="mx-5 mb-3">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-700"
        >
          Gym Equipment
        </Text>
        <Text style={{ fontSize: hp(1.7) }} className="text-neutral-500">
          Tap a machine to learn how to use it
        </Text>
      </View>

      <FlatList
        horizontal
        data={getEquipment(gender)}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ width: 14 }} />}
        renderItem={({ item }) => (
          <GymEquipmentCard item={item} onPress={onPress} />
        )}
      />
    </View>
  );
}

const GymEquipmentCard = ({ item, onPress }) => (
  <TouchableOpacity
    onPress={() => onPress?.(item)}
    activeOpacity={0.85}
    style={{ width: wp(44) }}
  >
    <Image
      source={item.image}
      style={{ width: "100%", height: hp(22), borderRadius: 20 }}
      resizeMode="cover"
    />
    <Text
      numberOfLines={1}
      style={{ fontSize: hp(2) }}
      className="mt-2 font-semibold text-neutral-700"
    >
      {item.name}
    </Text>
    <Text
      numberOfLines={1}
      style={{ fontSize: hp(1.6) }}
      className="text-neutral-500"
    >
      {item.targets.slice(0, 3).join(" · ")}
    </Text>
  </TouchableOpacity>
);