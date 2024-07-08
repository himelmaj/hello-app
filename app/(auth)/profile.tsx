import { SignedIn, SignedOut, useUser, useClerk } from "@clerk/clerk-expo";
import { Stack, router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";

import ParallaxScrollView from "@/components/ui/parallax-scroll-view";
import SignOutButton from "@/components/sign-out-button";
import ProfileCard from "@/components/auth/profile-card";

export default function Page() {
    const { user } = useUser();
    const { signOut } = useClerk();
    
    return (
        <ParallaxScrollView >
            <Stack.Screen options={{ headerShown: true, headerTitleAlign: "center" }} />
            <ProfileCard />
            <SignOutButton />
        </ParallaxScrollView>
    );
}