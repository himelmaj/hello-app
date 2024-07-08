import React from 'react';
import { Tabs, Redirect } from 'expo-router';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '@clerk/clerk-expo';
export default function AuthLayout() {

    const { isSignedIn } = useAuth();

    if (!isSignedIn) return <Redirect href={"/(guest)"} />;

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'black',

                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: '800',
                },
                tabBarStyle: {
                    padding: 3,
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="home" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <AntDesign name="user" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="coins"
                options={{
                    title: 'Coins',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="coins" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
