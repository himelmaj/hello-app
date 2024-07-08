import { useSignIn} from "@clerk/clerk-expo";
import { router } from "expo-router";
import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/input";

interface FormData {
    email: string;
    password: string;
}

const LoginUser = () => {

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const { signIn, setActive, isLoaded } = useSignIn();

    const onSignInPress: SubmitHandler<FormData> = async (data) => {
        if (!isLoaded) {
            return;
        }
        try {
            const signInAttempt = await signIn.create({
                identifier: data.email,
                password: data.password,
            });
            if (signInAttempt.status === 'complete') {
                await setActive({ session: signInAttempt.createdSessionId });
                router.replace('/(auth)');
            } else {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Sign in failed',
                    textBody: 'Please try again',
                });
            }
        } catch (err: any) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Sign in failed',
                textBody: 'Please try again',
            });
        }
    };


    return (
        <View className="flex flex-col gap-2 ">
            <Input name="email" control={control} placeholder="Email" />
            <Input name="password" control={control} secureTextEntry placeholder="Password" />
            <TouchableOpacity className="items-center  border-[3px] rounded-xl border-zinc-500 h-12 justify-center bg-black w-full" onPress={handleSubmit(onSignInPress)}>
                <Text className=' text-white text-xl'>Sign in</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginUser