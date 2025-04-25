import type { PropsWithChildren, ReactElement } from 'react'; 
import { StyleSheet } from 'react-native';
import Animated, {  
    useAnimatedRef, 
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

type Props = PropsWithChildren<{
    headerImage?: ReactElement;
    headerBackgroundColor: { dark: string; light: string };
}>;

export default function MyScrollView({
    children,
}: Props) {
    const scrollRef = useAnimatedRef<Animated.ScrollView>();
     
    return (
        <ThemedView style={styles.container}>
            <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
                {children}
            </Animated.ScrollView>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'gray'
    },
});