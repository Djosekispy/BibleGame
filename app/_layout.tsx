import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSettings } from '@/lib/storage';

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
  const [themeOverride, setThemeOverride] = useState<'auto' | 'light' | 'dark' | 'high-contrast'>('auto');

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        if (mounted) {
          await ScreenOrientation.unlockAsync();
        }
        const s = await getSettings();
        if (mounted) setThemeOverride(s.theme);
      } catch (e) {
      }
    })();

    return () => {
      mounted = false;
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP).catch(() => {});
    };
  }, []);

  const HighContrastTheme = {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      background: '#000000',
      card: '#000000',
      text: '#ffffff',
      primary: '#FFD700',
      border: '#FFD700',
    },
  };

  const isDark = themeOverride === 'auto' ? colorScheme === 'dark' : themeOverride === 'dark';
  const navTheme = themeOverride === 'high-contrast' ? HighContrastTheme : isDark ? DarkTheme : DefaultTheme;
  const bg = themeOverride === 'high-contrast' ? '#000000' : isDark ? '#0d1321' : '#f0f0f0';

  return (
    <ThemeProvider value={navTheme}>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
      <Stack screenOptions={{title: "", headerShown: false}}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="game" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="who-said" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="questions" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="leaderboard" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="settings" options={{ headerShown: false, presentation: 'card' }} />
        <Stack.Screen name="certificate" options={{ headerShown: false, presentation: 'card' }} />
      </Stack>
      </SafeAreaView>
    </ThemeProvider>
  );
}
  
