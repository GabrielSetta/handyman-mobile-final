import 'react-native-reanimated';
import React from 'react';
import { Provider as PaperProvider} from 'react-native-paper';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { RootNavigation } from './src/navigation/RootNavigation';
import { AuthProvider } from './src/context/AuthContext';

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider>
                <SafeAreaView style={styles.safeArea}>
                    <AuthProvider>
                        <RootNavigation />
                    </AuthProvider>
                </SafeAreaView>
            </PaperProvider>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
});
