import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Stack, router } from "expo-router";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import ParallaxScrollView from "@/components/ui/parallax-scroll-view";


export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <ParallaxScrollView>
      <Stack.Screen options={{ headerShown: true, headerTitleAlign: "center" }} />
      <Text className="text-xl font-semibold">Welcome {user?.fullName}👋</Text>

    </ParallaxScrollView>
  );
}