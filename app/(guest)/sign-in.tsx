import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";
import React from "react";
import LoginUser from "@/components/guest/login-user";
export default function Page() {
  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Stack.Screen options={{ headerShown: true, title: 'Sign In' }} />
      <LoginUser />
      <View className="flex flex-row gap-1">
        <Text className="text-lg">Don't have an account?</Text>
        <Link href="/sign-up" className="text-lg text-blue-600">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  );
}