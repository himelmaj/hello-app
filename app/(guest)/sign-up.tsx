import * as React from "react";
import { TextInput, Button, View, TouchableOpacity, Text } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { Stack, useRouter } from "expo-router";
import { ALERT_TYPE, Toast } from 'react-native-alert-notification';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [pendingVerification, setPendingVerification] = React.useState(false);
  const [code, setCode] = React.useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
        firstName,
        lastName,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Sign Up failed',
        textBody: 'Please try again',
      });
      // console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace('/(auth)');
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling

      Toast.show({
        type: ALERT_TYPE.DANGER,
        title: 'Verification failed',
        textBody: 'Please try again',
      });


      // console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex-1 justify-center p-5 bg-slate-50">
      <Stack.Screen options={{ headerShown: true, title: 'Sign Up' }} />
      {!pendingVerification && (
        <>

          <View className="flex flex-col gap-2 ">

          <TextInput
            className="bg-gray-200 text-xl appearance-none border-2 h-12 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-zinc-500"
            value={firstName}
            placeholder="First Name..."
            onChangeText={(firstName) => setFirstName(firstName)}
          />

          <TextInput
            className="bg-gray-200 text-xl appearance-none border-2 h-12 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-zinc-500"

            value={lastName}
            placeholder="Last Name..."
            onChangeText={(lastName) => setLastName(lastName)}
          />
          <TextInput
            className="bg-gray-200 text-xl appearance-none border-2 h-12 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-zinc-500"
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(email) => setEmailAddress(email)}
          />
          <TextInput
            className="bg-gray-200 text-xl appearance-none border-2 h-12 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-zinc-500"
            autoCapitalize="none"
            value={password}
            placeholder="Password..."
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />

          <TouchableOpacity className="items-center  border-[3px] rounded-xl border-zinc-500 h-12 justify-center bg-black w-full" onPress={onSignUpPress}>
            <Text className=' text-white text-xl'>Sign Up</Text>
          </TouchableOpacity>
          </View>

        </>
      )}
      {pendingVerification && (
        <View className="flex flex-col gap-2">
          <TextInput
            className="bg-gray-200 text-xl appearance-none border-2 h-12 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-zinc-500"
            value={code}
            placeholder="Code..."
            onChangeText={(code) => setCode(code)}
          />

          <TouchableOpacity className="items-center  border-[3px] rounded-xl border-zinc-500 h-12 justify-center bg-black w-full" onPress={onPressVerify}>
            <Text className=' text-white text-xl'>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}