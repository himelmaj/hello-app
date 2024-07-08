import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import { Text, View, Button, Image } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import BottomLoginSheet from "@/components/guest/buttom-auth";

export default function Page() {

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <Stack.Screen options={{ headerShown: false, title: 'Home' }} />
      <View className="flex flex-col gap-2 justify-center items-center">
        <Text className="text-3xl font-bold">Welcome 👋</Text>
        <Text className="text-xl font-semibold pb-4">
          Select your favorite login option
        </Text>
      </View>
      <Image source={require("@/assets/images/helloapp-logo.webp")} className="  w-72 h-72" />
      <BottomLoginSheet />
    </View>
  );
}