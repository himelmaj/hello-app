// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import * as FileSystem from 'expo-file-system';
// import { useCoinStore } from "@/store/useCoinStore";

// const BYTES_IN_GIGABYTE = 1024 * 1024 * 1024;
// const COIN_RATE_PER_GIGABYTE = 0.001;

// const bytesToGigabytes = (bytes) => {
//   return bytes === 0 ? 0 : Number((bytes / BYTES_IN_GIGABYTE).toFixed(2));
// };

// const calculateCoinPerMinute = (gbAvailable) => COIN_RATE_PER_GIGABYTE * gbAvailable;

// const CoinCard = () => {
//   const coins = useCoinStore((state) => state.coins);
//   const incrementCoins = useCoinStore((state) => state.inc);
//   const setCoins = useCoinStore((state) => state.setCoins);
//   const [freeDisk, setFreeDisk] = useState(0);
//   const [coinsPerMinute, setCoinsPerMinute] = useState(0);

//   useEffect(() => {
//     const fetchDiskInfo = async () => {
//       try {
//         const free = await FileSystem.getFreeDiskStorageAsync();
//         const freeGB = bytesToGigabytes(free);
//         setFreeDisk(freeGB);
//         const coinsPerMinute = calculateCoinPerMinute(freeGB);
//         setCoinsPerMinute(coinsPerMinute);
//         setCoins(coinsPerMinute);
//       } catch (error) {
//         console.error("Error fetching disk info:", error);
//       }
//     };

//     fetchDiskInfo();

//     const interval = setInterval(fetchDiskInfo, 60000);
//     return () => clearInterval(interval);
//   }, [setCoins]);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       incrementCoins(coinsPerMinute);
//     }, 60000);

//     return () => clearInterval(interval);
//   }, [coinsPerMinute, incrementCoins]);

//   return (
//     <View className="bg-zinc-50 rounded-md border-2 border-zinc-300 p-2">
//       <Text className="text-6xl">
//         {coins} HC
//       </Text>
//       <Text className="text-lg text-zinc-900">
//         Coins Gain Per Minute: {coinsPerMinute}
//       </Text>
//     </View>
//   );
// };

// export default CoinCard;




import React, { FC, useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as FileSystem from 'expo-file-system';
import { useCoinStore } from "@/store/useCoinStore";

const BYTES_IN_GIGABYTE = 1024 * 1024 * 1024;
const COIN_RATE_PER_GIGABYTE = 0.001;

interface Transaction {
  coins: number;
  timestamp: string;
}

const bytesToGigabytes = (bytes: number): number => {
  return bytes === 0 ? 0 : Number((bytes / BYTES_IN_GIGABYTE).toFixed(2));
};

const calculateCoinPerMinute = (gbAvailable: number): number => {
  return COIN_RATE_PER_GIGABYTE * gbAvailable;
};

const CoinCard: FC = () => {
  const coins = useCoinStore((state) => state.coins);
  const incrementCoins = useCoinStore((state) => state.inc);
  const setCoins = useCoinStore((state) => state.setCoins);
  const [freeDisk, setFreeDisk] = useState<number>(0);
  const [coinsPerMinute, setCoinsPerMinute] = useState<number>(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchDiskInfo = async () => {
      try {
        const free = await FileSystem.getFreeDiskStorageAsync();
        const freeGB = bytesToGigabytes(free);
        setFreeDisk(freeGB);
        const coinsPerMin = calculateCoinPerMinute(freeGB);
        setCoinsPerMinute(coinsPerMin);
        setCoins(coinsPerMin);
        recordTransaction(coinsPerMin);
      } catch (error) {
        console.error("Error fetching disk info:", error);
      }
    };

    const recordTransaction = (coins: number) => {
      const now = new Date();
      const transaction: Transaction = {
        coins,
        timestamp: now.toLocaleString(),
      };
      setTransactions((prevTransactions) => [...prevTransactions, transaction]);
    };

    fetchDiskInfo();

    const interval = setInterval(fetchDiskInfo, 60000);
    return () => clearInterval(interval);
  }, [setCoins]);

  useEffect(() => {
    const interval = setInterval(() => {
      incrementCoins(coinsPerMinute);
    }, 60000);

    return () => clearInterval(interval);
  }, [coinsPerMinute, incrementCoins]);

  return (
    <View>
      <View className="bg">
        <Text style={{ fontSize: 48, fontWeight: 'bold' }}>
          {coins} HC
        </Text>
      </View>

      <View className="mt-4">
        <Text className=" text-xl font-bold">
          Coins Gain Per Minute: <Text className=" text-green-500">+ {coinsPerMinute} 🪙</Text>
        </Text>
      </View>

      <View className="mt-4">
        <Text className=" font-bold text-xl">Transactions:</Text>
        {transactions.map((transaction, index) => (
          <Text key={index} style={{ fontSize: 16, marginTop: 4 }}>
            <Text className=" text-green-500 font-bold"> +{transaction.coins}</Text> HC added at {transaction.timestamp}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default CoinCard;
