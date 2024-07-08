import Colors from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SignInWithGoogle from './sign-in-google';
import SignInWithGitHub from './sign-in-github';
import SignInWithTwitch from './sign-in-twitch';

const BottomLoginSheet = () => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: bottom }]}>
      
      {/* <SignInWithGoogle /> */}
      <SignInWithGitHub />
      <SignInWithTwitch />

      <Link
        href={{
          pathname: '/sign-up',
          params: { type: 'register' },
        }}
        style={[defaultStyles.btn, styles.btnDark]}
        asChild>
        <TouchableOpacity>
          <Ionicons name="mail" size={20} style={styles.btnIcon} color={'#fff'} />
          <Text style={styles.btnDarkText}>Sign up with email</Text>
        </TouchableOpacity>
      </Link>
      <Link
        href={{
          pathname: '/sign-in',
          params: { type: 'login' },
        }}
        className='items-center  border-[3px] rounded-xl border-zinc-800 h-12 justify-center'
        asChild>
        <TouchableOpacity>
          <Text className=' text-white text-xl'>Sign in</Text>
        </TouchableOpacity>
      </Link>
    </View>
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
export default BottomLoginSheet;