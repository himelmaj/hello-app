import * as React from "react";
import { View } from "react-native";
import { Stack } from "expo-router";

import CreateUser from "@/components/guest/create-user";
import VerifyUser from "@/components/guest/verify-user";

export default function SignUpScreen() {
  const [pendingVerification, setPendingVerification] = React.useState(false);

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Stack.Screen options={{ headerShown: true, title: 'Sign Up' }} />
      {!pendingVerification && (
          <CreateUser pendingVerification={pendingVerification} setPendingVerification={setPendingVerification} />

      )}
      {pendingVerification && (

        <VerifyUser pendingVerification={pendingVerification} setPendingVerification={setPendingVerification} />
      )}
    </View>
  );
}