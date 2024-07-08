import { View, Text, Alert,Button } from "react-native"
import ParallaxScrollView from "@/components/ui/parallax-scroll-view"
import { Stack } from "expo-router"

const coins = () => {

    return (
        <ParallaxScrollView>
            <Stack.Screen options={{ headerShown: true, headerTitleAlign: "center" }} />

        </ParallaxScrollView>
    )
}

export default coins