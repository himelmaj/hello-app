import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import * as Device from 'expo-device';
import * as FileSystem from 'expo-file-system';

const bytesToGigabytes = (bytes: number) => {
    if (bytes === 0) return '0 GB';
    const gigabytes = bytes / (1024 * 1024 * 1024);
    return gigabytes.toFixed(2) + ' GB';
};


const SystemInfo = () => {
    const [disk, setDisk] = useState<any>(null);
    const [freeDisk, setFreeDisk] = useState<any>(null);

    useEffect(() => {
        const fetchTotalDisk = async () => {
            const sizeDisk = await FileSystem.getTotalDiskCapacityAsync();
            const sizeFreeDisk = await FileSystem.getFreeDiskStorageAsync();
            setDisk(bytesToGigabytes(sizeDisk));
            setFreeDisk(bytesToGigabytes(sizeFreeDisk));
        };

        fetchTotalDisk();
    }, []);


    return (
        <View>
            <Text className="text-2xl font-semibold mb-1">System Info</Text>
            <Text>Device Name: {Device.deviceName}</Text>
            <Text>OS Name: {Device.osName}</Text>
            <Text>OS Version: {Device.osVersion}</Text>
            <Text>Device Total Disk Capacity: {disk}</Text>
            <Text>Device Free Disk Storage: {freeDisk}</Text>
        </View>
    );
};

export default SystemInfo;
