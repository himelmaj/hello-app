import { View, Text, Alert, Button } from "react-native"
import ParallaxScrollView from "@/components/ui/parallax-scroll-view"
import { Stack } from "expo-router"
import CoinCard from "@/components/coins/coin-card"
const coins = () => {

    return (
        <ParallaxScrollView>
            <Stack.Screen options={{ headerShown: true, headerTitleAlign: "center" }} />
            <Text className="text-2xl font-semibold">My Hello Coins 🪙!</Text>
            <CoinCard />
        </ParallaxScrollView>
    )
}

export default coins