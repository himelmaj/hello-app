import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Device from 'expo-device';
import * as FileSystem from 'expo-file-system';
import DiskUsageBar from './disk-usage-bar';

const bytesToGigabytes = (bytes: number): string => {
  if (bytes === 0) return '0 GB';
  const gigabytes = bytes / (1024 * 1024 * 1024);
  return gigabytes.toFixed(2) + ' GB';
};

const SystemInfo: React.FC = () => {
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

  return (
    <View className="my-5 p-3">
      <Text className="text-2xl font-semibold mb-2">System Info</Text>
      <Text>Device Name: {Device.deviceName}</Text>
      <Text>OS Name: {Device.osName}</Text>
      <Text>OS Version: {Device.osVersion}</Text>
      {totalDisk !== null && freeDisk !== null && (
        <>
          <Text>Device Total Disk Capacity: {bytesToGigabytes(totalDisk)}</Text>
          <Text>Device Free Disk Storage: {bytesToGigabytes(freeDisk)}</Text>
          <DiskUsageBar  />
        </>
      )}
    </View>
  );
};

export default SystemInfo;
