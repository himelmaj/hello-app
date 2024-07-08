
import * as React from "react";
import { TextInput, Button, View, TouchableOpacity, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Stack, router } from "expo-router";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/input";

interface FormData {
    code: string
}

type VerifyUserProps = {
    pendingVerification: boolean;
    setPendingVerification: (value: boolean) => void;
};

const VerifyUser = ({ pendingVerification, setPendingVerification }: VerifyUserProps) => {

    const { isLoaded, signUp, setActive } = useSignUp();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onVerifyPress: SubmitHandler<FormData> = async (data) => {
        if (!isLoaded) {
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code: data.code
            });

            if (completeSignUp.status === 'complete') {
                await setActive({ session: completeSignUp.createdSessionId });
                router.replace('/(auth)');
            } else {
                Toast.show({
                    type: ALERT_TYPE.DANGER,
                    title: 'Verification failed',
                    textBody: 'Please try again',
                });
                // console.error(JSON.stringify(signInAttempt, null, 2));
            }
        } catch (err: any) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Verification failed',
                textBody: 'Please try again',
            });
        }
    }



    return (
        <View className="flex flex-col gap-2 ">
            <Input name="code" control={control} placeholder="Code" />
            <TouchableOpacity className="items-center  border-[3px] rounded-xl border-zinc-500 h-12 justify-center bg-black w-full" onPress={handleSubmit(onVerifyPress)}>
            <Text className=' text-white text-xl'>Verify Email</Text>
          </TouchableOpacity>
        </View>
    )
}

export default VerifyUser