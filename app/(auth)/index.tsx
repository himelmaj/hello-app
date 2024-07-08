import { SignedIn, SignedOut, useUser  } from "@clerk/clerk-expo";
import { Link, Stack, router } from "expo-router";
import { Text, View, Button } from "react-native";
import { useClerk } from "@clerk/clerk-expo";

export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View className="flex-1 bg-slate-50">
      <Stack.Screen options={{ headerShown: true, headerTitleAlign: "center"}} />
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <Button title="Sign Out" onPress={() => {
          signOut();
          router.replace("/")
        }} />
      </SignedIn>
    </View>
  );
}