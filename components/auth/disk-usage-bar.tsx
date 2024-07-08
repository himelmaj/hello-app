import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { LinearGradient } from 'expo-linear-gradient';

const bytesToGigabytes = (bytes: number): string => {
  if (bytes === 0) return '0 GB';
  const gigabytes = bytes / (1024 * 1024 * 1024);
  return gigabytes.toFixed(2) + ' GB';
};


const DiskUsageBar = () => {
  const [totalDisk, setTotalDisk] = useState<number | null>(null);
  const [freeDisk, setFreeDisk] = useState<number | null>(null);

  useEffect(() => {
    const fetchDiskInfo = async () => {
      try {
        const total = await FileSystem.getTotalDiskCapacityAsync();
        const free = await FileSystem.getFreeDiskStorageAsync();
        setTotalDisk(total);
        setFreeDisk(free);
      } catch (error) {
        console.error('Error al obtener la capacidad total del disco:', error);
        setTotalDisk(null);
        setFreeDisk(null);
      }
    };

    fetchDiskInfo();
  }, []);

  if (totalDisk === null || freeDisk === null) return null;

  const used = totalDisk - freeDisk;
  const usedPercentage = (used / totalDisk) * 100;
  const freePercentage = 100 - usedPercentage;

  return (
    <View className='flex flex-col mt-2' >
        <Text className="text-2xl font-semibold  text-zinc-950 ">Disk Info</Text>

      <View className="flex-row justify-between">
        <Text className='text-lg font-medium'>Used</Text>
        <Text className='text-lg font-medium'>Free</Text>
      </View>
      <View className="flex-row rounded-xl overflow-hidden my-2 h-20">
        <LinearGradient
          colors={['#a855f7', '#7c3aed']}
          style={{ width: `${usedPercentage}%`, alignItems: 'center', justifyContent: 'center' }}>
          <Text className='text-white'>{bytesToGigabytes(used)}</Text>
        </LinearGradient>

        <LinearGradient
          colors={['#16a34a', '#22c55e']}
          style={{ width: `${freePercentage}%`, alignItems: 'center', justifyContent: 'center' }}>
          <Text className='text-white'>{bytesToGigabytes(freeDisk)}</Text>
        </LinearGradient>
      </View>
    </View>
  );
};

export default DiskUsageBar;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});