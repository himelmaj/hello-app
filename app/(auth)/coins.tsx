import { View, Text, Alert, Button } from "react-native"
import ParallaxScrollView from "@/components/ui/parallax-scroll-view"
import { Stack } from "expo-router"

const coins = () => {

    return (
        <ParallaxScrollView>
            <Stack.Screen options={{ headerShown: true, headerTitleAlign: "center" }} />
            <Text className="text-2xl font-semibold">My Hello Coins 🪙!</Text>
        </ParallaxScrollView>
    )
}

export default coins