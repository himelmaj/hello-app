import { Text, TouchableOpacity } from 'react-native'
import { useClerk } from '@clerk/clerk-react'
import { router } from 'expo-router'

const SignOutButton = () => {
    const { signOut } = useClerk();

    return (
        <TouchableOpacity className="items-center border-[3px] rounded-xl border-zinc-300 h-12 justify-center bg-black w-full" onPress={() => {
            signOut();
            router.replace("/")
        }}>
            <Text className="text-white">Sign Out</Text>
        </TouchableOpacity>
    )
}

export default SignOutButton