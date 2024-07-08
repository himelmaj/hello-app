import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Text, View, Button, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking"


export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

const SignInWithTwitch = () => {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_twitch" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
      await startOAuthFlow( {redirectUrl: Linking.createURL("/(auth)", { scheme: "helloapp" })} );

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        

      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (


    <TouchableOpacity style={[defaultStyles.btn, styles.btnDark]} onPress={onPress}>
      <Ionicons name="logo-twitch" size={16} style={styles.btnIcon} color={'#fff'} />
      <Text style={styles.btnDarkText}>Continue with Twitch</Text>
    </TouchableOpacity>

  );
};


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#000',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 26,
    gap: 14,
  },
  btnLight: {
    backgroundColor: '#fff',
  },
  btnLightText: {
    color: '#000',
    fontSize: 20,
  },
  btnDark: {
    backgroundColor: Colors.grey,
  },
  btnDarkText: {
    color: '#fff',
    fontSize: 20,
  },
  btnOutline: {
    borderWidth: 3,
    borderColor: Colors.grey,
  },
  btnIcon: {
    paddingRight: 6,
  },
});

export default SignInWithTwitch;