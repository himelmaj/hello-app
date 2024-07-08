import type { PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedRef, } from 'react-native-reanimated';

type Props = PropsWithChildren<{}>;

export default function ParallaxScrollView({ children }: Props) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();

    return (
        <View className='flex-1 bg-white'>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                <View className='flex-1 p-8 overflow-hidden'>{children}</View>
            </Animated.ScrollView>
        </View>
    );
}
