import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

import { t } from '@/i18n/translations';
import { getSettings } from '@/lib/storage';

export default function HomeScreen() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.92)).current;
  const [lang, setLang] = useState<'pt' | 'umb'>('pt');
  const [theme, setTheme] = useState<'auto' | 'light' | 'dark' | 'high-contrast'>('auto');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const s = await getSettings();
      if (mounted) {
        setLang(s.language);
        setTheme(s.theme);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const games = [
    {
      id: 'character',
      title: 'Revelação de Personagens',
      description: 'Descubra personagens bíblicos através de cores dinâmicas',
      icon: '👤',
      color: '#FF6B6B',
      href: '/game',
      difficulty: 'Iniciante',
    },
    {
      id: 'who-said',
      title: 'Quem Proferiu?',
      description: 'Identifique quem disse as palavras sagradas',
      icon: '🎤',
      color: '#4ECDC4',
      href: '/who-said',
      difficulty: 'Intermediário',
    },
    {
      id: 'questions',
      title: 'Conhecimento Sagrado',
      description: 'Teste seus saberes nas Escrituras',
      icon: '📚',
      color: '#45B7D1',
      href: '/questions',
      difficulty: 'Variável',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <LinearGradient
        colors={
          theme === 'high-contrast'
            ? ['#000000', '#000000', '#000000', '#000000']
            : ['#0a0e27', '#1a1f3a', '#0f2347', '#0d1321']
        }
        start={{ x: 0.0, y: 0.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={StyleSheet.absoluteFill}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.header,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <LinearGradient
            colors={['rgba(255,107,107,0.15)', 'rgba(78,205,196,0.08)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.iconWrapper}
          >
            <MaterialCommunityIcons name="book-open-page-variant" size={50} color="#FF6B6B" />
          </LinearGradient>

     <Text style={styles.title}>{t('app_title', lang)}</Text>
    <Text style={styles.tagline}>{t('app_tagline', lang)}</Text>

        </Animated.View>

        <View style={styles.gamesContainer}>
          {games.map((game) => (
            <Link key={game.id} href={game.href as any} asChild>
              <TouchableOpacity activeOpacity={0.9}>
                <Animated.View style={[styles.gameCard, { opacity: fadeAnim }]}>
                  <LinearGradient
                    colors={[
                      game.color + '20',
                      game.color + '08',
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.gameCardGradient}
                  >
                    <View style={styles.gameCardContent}>
                      <View style={[styles.gameIconContainer, { borderColor: game.color }]}>
                        <Text style={styles.gameIcon}>{game.icon}</Text>
                      </View>

                      <View style={styles.gameTextContainer}>
                        <Text style={styles.gameTitle}>{game.title}</Text>
                        <Text style={styles.gameDescription}>{game.description}</Text>
                      </View>

              
                    </View>

                    <View style={[styles.cardBorder, { borderLeftColor: game.color }]} />
                  </LinearGradient>
                </Animated.View>
              </TouchableOpacity>
            </Link>
          ))}
          <Link href="/leaderboard" asChild>
            <TouchableOpacity activeOpacity={0.9}>
              <Animated.View style={[styles.gameCard, { opacity: fadeAnim }]}>
                <LinearGradient
                  colors={['#64748b20', '#64748b08']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gameCardGradient}
                >
                  <View style={styles.gameCardContent}>
                    <View style={[styles.gameIconContainer, { borderColor: '#64748b' }]}>
                      <Text style={styles.gameIcon}>🏆</Text>
                    </View>
                    <View style={styles.gameTextContainer}>
                      <Text style={styles.gameTitle}>{t('leaderboard', lang)}</Text>
                      <Text style={styles.gameDescription}>{t('leaderboard_desc', lang)}</Text>
                    </View>
                  </View>
                  <View style={[styles.cardBorder, { borderLeftColor: '#64748b' }]} />
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          </Link>
          <Link href="/settings" asChild>
            <TouchableOpacity activeOpacity={0.9}>
              <Animated.View style={[styles.gameCard, { opacity: fadeAnim }]}>
                <LinearGradient
                  colors={['#f59e0b20', '#f59e0b08']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gameCardGradient}
                >
                  <View style={styles.gameCardContent}>
                    <View style={[styles.gameIconContainer, { borderColor: '#f59e0b' }]}>
                      <Text style={styles.gameIcon}>⚙️</Text>
                    </View>
                    <View style={styles.gameTextContainer}>
                      <Text style={styles.gameTitle}>{t('settings', lang)}</Text>
                      <Text style={styles.gameDescription}>{t('settings_desc', lang)}</Text>
                    </View>
                  </View>
                  <View style={[styles.cardBorder, { borderLeftColor: '#f59e0b' }]} />
                </LinearGradient>
              </Animated.View>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.inspirationContainer}>
          <MaterialCommunityIcons name="format-quote-open" size={24} color="#64748b" />
          <Text style={styles.inspiration}>
            "Você tem de amar a Jeová, seu Deus, de todo o seu coração" — Deuteronômio 6:5 TNM
          </Text>
        </View>

      <Text style={styles.footer}>
  © Osvaldo José Víctor. 
  Todos os direitos reservados. 
</Text>

      </ScrollView>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255, 107, 107, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 107, 0.25)',
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#f9fafb',
    letterSpacing: -1.2,
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  tagline: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 8,
    fontStyle: 'italic',
  },
  gamesContainer: {
    gap: 16,
    marginBottom: 40,
  },
  gameCard: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  gameCardGradient: {
    flex: 1,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  gameCardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  gameIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  gameIcon: {
    fontSize: 32,
  },
  gameTextContainer: {
    flex: 1,
  },
  gameTitle: {
    color: '#f9fafb',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  gameDescription: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '400',
  },
  difficultyBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginLeft: 12,
  },
  difficultyText: {
    fontSize: 11,
    fontWeight: '600',
  },
  cardBorder: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
  },
  inspirationContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#64748b',
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  inspiration: {
    fontSize: 14,
    color: '#cbd5e1',
    fontStyle: 'italic',
    lineHeight: 22,
    flex: 1,
  },
  footer: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '400',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
});
