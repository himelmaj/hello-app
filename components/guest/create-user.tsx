
import * as React from "react";
import { TextInput, Button, View, TouchableOpacity, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Stack, router } from "expo-router";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';


import { useForm, SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/input";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

type CreateUserProps = {
    pendingVerification: boolean;
    setPendingVerification: (value: boolean) => void;
};

const CreateUser = ({pendingVerification, setPendingVerification}: CreateUserProps) => {

    const { isLoaded, signUp, setActive } = useSignUp();

    const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onSignUpPress: SubmitHandler<FormData> = async (data) => {
        if (!isLoaded) {
            return;
        }

        try {
            await signUp.create({
                emailAddress: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            });

            await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

            setPendingVerification(true);
        } catch (err: any) {
            Toast.show({
                type: ALERT_TYPE.DANGER,
                title: 'Sign Up failed',
                textBody: 'Please try again',
            });
        }
    };




    return (
        <View className="flex flex-col gap-2 ">
            <Input name="firstName" control={control} placeholder="First Name" />
            <Input name="lastName" control={control} placeholder="Last Name" />
            <Input name="email" control={control} placeholder="example@email.com" />
            <Input name="password" control={control} secureTextEntry placeholder="password" />
            <TouchableOpacity className="items-center  border-[3px] rounded-xl border-zinc-500 h-12 justify-center bg-black w-full" onPress={handleSubmit(onSignUpPress)}>
                <Text className=' text-white text-xl'>Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CreateUser