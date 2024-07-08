import {  useSignIn, useClerk, useAuth  } from "@clerk/clerk-expo";
import { Link, Stack, useRouter } from "expo-router";
import { Text, TextInput, Button, View, TouchableOpacity } from "react-native";
import React from "react";
import SignInWithOAuth from "@/components/auth/sign-in-0auth";
import * as Burnt from "burnt";

export default function Page() {


  
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const { isSignedIn } = useAuth();
  isSignedIn && router.replace('/(auth)');

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(auth)');
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling

        Burnt.toast({
          title: 'Sign in failed',
          haptic: 'error',
          preset: 'error',
          duration: 5000,
          from: 'bottom',
        
        });
        // console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      Burnt.toast({
        title: 'Sign in failed',
        haptic: 'none',
        duration: 2,
        from: 'bottom',
      
      });
      // console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, emailAddress, password]);


  return (
    <View className="flex-1 justify-center p-5 bg-slate-50">

      <Stack.Screen options={{ headerShown: true, title: 'Sign In' }} />

      <View className="flex flex-col gap-2 ">
      <TextInput
      className="bg-gray-200 text-xl appearance-none border-2 h-12 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-zinc-500"
        autoCapitalize="none"
        value={emailAddress}
        placeholder="example@email.com"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
      className="bg-gray-200 text-xl appearance-none border-2 h-12 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:bg-white focus:border-zinc-500"
        value={password}
        placeholder="password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      />

      {/* <Button title="Sign In" onPress={onSignInPress} /> */}

      <TouchableOpacity className="items-center  border-[3px] rounded-xl border-zinc-500 h-12 justify-center bg-black w-full" onPress={onSignInPress}>
          <Text className=' text-white text-xl'>Log in</Text>
        </TouchableOpacity>
      </View>
      
      <View className="flex flex-row gap-1">
        <Text className="text-lg">Don't have an account?</Text>
        <Link href="/sign-up" className="text-lg text-blue-600">
          <Text>Sign up</Text>
        </Link>
      </View>

      <View>
      
      </View>
    </View>
  );
}