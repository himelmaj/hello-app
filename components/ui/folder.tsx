import { Text, View, TouchableOpacity } from "react-native"
import { Link } from "expo-router";
import { PropsWithChildren } from "react"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

type Props = PropsWithChildren<{
    title: string
    path: string
}>;

const Folder = ({ children, title, path }: Props) => {
    console.log(path)
    return (

        <TouchableOpacity className=" p-3 relative overflow-visible rounded-lg w-full flex flex-row border-2 border-zinc-300 items-center justify-between m-2">
            <FontAwesome name="folder" size={24} color="black" />
            {children}
            <Text className="text-lg font-semibold ml-2">
                {title || 'New Folder'}
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default Folder