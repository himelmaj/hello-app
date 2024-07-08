import { Text, View, TouchableOpacity } from "react-native"
import { PropsWithChildren } from "react"
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


const AddFolder = () => {
    return (

        <TouchableOpacity className=" p-3 relative overflow-visible rounded-lg w-full flex flex-row border-2 border-zinc-400 items-center justify-center my-2 bg-zinc-300">
            <FontAwesome6 name="add" size={24} color="grey" />
        </TouchableOpacity>
    )
}

export default AddFolder