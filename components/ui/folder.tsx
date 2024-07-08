import { Text, View, TouchableOpacity } from "react-native"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';


const Folder = ({ title }: { title: string }) => {
    return (

        <TouchableOpacity className=" p-3 relative overflow-visible rounded-lg w-full flex flex-row border-2 border-zinc-300 items-center justify-between my-2">
            <FontAwesome name="folder" size={24} color="black" />
            <Text className="text-lg font-semibold ml-2">
                {title || 'New Folder'}
            </Text>
            <Entypo name="dots-three-vertical" size={24} color="black" />
        </TouchableOpacity>
    )
}

export default Folder