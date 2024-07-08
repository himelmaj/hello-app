import { View, Text, Alert,Button } from "react-native"
import { Stack } from "expo-router"
import Input from "@/components/ui/input"
import { useForm, SubmitHandler } from 'react-hook-form'

interface FormData {
    coins: string
    coins2: string
}


const coins = () => {

    const { control, handleSubmit } = useForm<FormData>();

    const onSubmit: SubmitHandler<FormData> = data => Alert.alert(JSON.stringify(data))

    return (
        <View>
            <Stack.Screen options={{ headerShown: true, headerTitleAlign: "center" }} />
            <Text>Coins</Text>
            <Input name="coins" control={control} placeholder="Coin1" />
            <Input name="coins2" control={control} secureTextEntry placeholder="Coin1" />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
        </View>
    )
}

export default coins