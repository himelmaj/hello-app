import { View, Text, Image } from "react-native";
import { useUser } from "@clerk/clerk-react";


const ProfileCard = () => {
  const { user } = useUser();


  return (
    <View className="flex flex-row items-center p-5">
      <Image
        source={{ uri: user?.imageUrl }}
        style={{ width: 100, height: 100, borderRadius: 50 }}
      />

      <View className="ml-4">
        <Text className=" text-xl">{user?.fullName}</Text>
        <Text className=" text-md">{user?.emailAddresses[0].emailAddress}</Text>

      </View>

    </View>
  );
}

export default ProfileCard;
