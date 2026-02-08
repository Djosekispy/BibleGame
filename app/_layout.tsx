import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';

export {
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (mounted) {
          await ScreenOrientation.unlockAsync();
        }
      } catch (e) {
      }
    })();

    return () => {
      mounted = false;
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => {});
    };
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? '#0d1321' : '#f0f0f0' }}>
      <Stack screenOptions={{title: "", headerShown: false}}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false, presentation: 'card' }} />
      </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}
  