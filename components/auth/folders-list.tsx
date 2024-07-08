import Folder from "../ui/folder"
import AddFolder from "../add-folder";
import { View, Text } from "react-native";

const FoldersList = () => {
    const folders = Array.from({ length: 5 }, (_, i) => i + 1);
    return (
        <View className="flex flex-col">
            <Text className="text-2xl font-semibold border-b-2 text-zinc-950 border-zinc-300 pb-2">Folders</Text>
            <AddFolder />
            {folders.map((folder) => (
                <Folder key={folder} title={`Folder ${folder}`} path={`${folder}`} />
            ))}
        </View>
    )
}

export default FoldersList