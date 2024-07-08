import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, Stack, router } from "expo-router";
import { Text, View, Button, TouchableOpacity } from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import ParallaxScrollView from "@/components/ui/parallax-scroll-view";
import Folder from "@/components/ui/folder";
import FoldersList from "@/components/auth/folders-list";
import DiskUsageBar from "@/components/auth/disk-usage-bar";


export default function Page() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <ParallaxScrollView>
      <Stack.Screen options={{ headerShown: true, headerTitleAlign: "center" }} />
      <Text className="text-2xl font-semibold">Welcome {user?.fullName}👋</Text>

      <View className="mt-2">
        <DiskUsageBar />
      </View>

      <View className="mt-4">
        <FoldersList />
      </View>


    </ParallaxScrollView>
  );
}