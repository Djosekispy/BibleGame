import EndModal from '@/components/EndModal';
import { getRandomBibleName, type BibleName } from '@/constants/BibleNames';
import { t } from '@/i18n/translations';
import { Feather, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

export default function GameScreen() {
  const [bibleName, setBibleName] = useState<BibleName>(getRandomBibleName());
  const [isGenerating, setIsGenerating] = useState(false);

  // timer state (start at 2 minutes = 120 seconds)
  const [secondsLeft, setSecondsLeft] = useState(120);
  const [showTimeUpModal, setShowTimeUpModal] = useState(false);
  const alertPlayerRef = React.useRef<AudioPlayer | null>(null);
  const scaleAnim = React.useRef(new Animated.Value(0.5)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  const generateNewName = () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    Vibration.vibrate(50);
    
    // Reset animations
    rotateAnim.setValue(0);
    scaleAnim.setValue(0.3);
    opacityAnim.setValue(0);

    // Simulate generation delay
    setTimeout(() => {
      const newName = getRandomBibleName();
      setBibleName(newName);
      
      // Animate in
      Animated.parallel([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setIsGenerating(false);
      });
    }, 400);
  };

  useEffect(() => {
    generateNewName();
  }, []);

  // countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft(prev => {
        const next = prev - 1;
        if (next === 60) {
          // play alert when exactly one minute remaining
          playAlert();
        }
        if (next <= 0) {
          clearInterval(interval);
          return 0;
        }
        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (secondsLeft === 0) {
      setShowTimeUpModal(true);
    }
  }, [secondsLeft]);

  async function playAlert() {
    try {
      if (!alertPlayerRef.current) {
        // create player the first time, automatically loads
        alertPlayerRef.current = createAudioPlayer(
          'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
        );
        // start playback once created
        alertPlayerRef.current.play();
      } else {
        alertPlayerRef.current.play();
      }
    } catch (e) {
      // ignore errors
    }
  }

  useEffect(() => {
    return () => {
      if (alertPlayerRef.current) {
        // remove frees the native resources
        alertPlayerRef.current.remove();
      }
    };
  }, []);


  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: bibleName.color },
        ]}
      />

      <View style={styles.gradientOverlay}>
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              opacity: 0.3,
              backgroundColor: bibleName.color,
            },
          ]}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Link href="/" asChild>
            <TouchableOpacity style={styles.backButton}>
              <Feather style={styles.backButtonText} name="arrow-left-circle" size={36} color="black" />
            </TouchableOpacity>
          </Link>
          <Text style={styles.timerText}>{formatTime(secondsLeft)}</Text>
        </View>
        <EndModal
          visible={showTimeUpModal}
          title={t('time_up_title')}
          message={t('time_up_message')}
          onClose={() => setShowTimeUpModal(false)}
        />

        <View style={styles.nameContainer}>
          <Animated.View
            style={[
              styles.decorativeCircle,
              {
                transform: [{ rotate }],
              },
            ]}
          >
            <View style={[styles.circle, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
          </Animated.View>

          <Animated.View
            style={[
              styles.nameContent,
              {
                transform: [{ scale: scaleAnim }],
                opacity: opacityAnim,
              },
            ]}
          >
            <Text style={styles.name}>{bibleName.name}</Text>
          </Animated.View>

          <Animated.View
            style={[
              styles.decorativeCircle,
              {
                transform: [{ rotate }],
              },
            ]}
          >
            <View style={[styles.circle, { backgroundColor: 'rgba(255, 255, 255, 0.1)' }]} />
          </Animated.View>
        </View>

        <View style={styles.buttonsContainer}>
  <TouchableOpacity
    style={styles.fab}
    onPress={generateNewName}
    disabled={isGenerating}
    activeOpacity={0.85}
  >
    <Text style={styles.fabIcon}>
      {isGenerating ? <MaterialCommunityIcons name="timer-minus-outline" size={24} color={bibleName.color} /> : <Fontisto name="star" size={24} color={bibleName.color}/>}
    </Text>
  </TouchableOpacity>
</View>

      </View>
    </View>
  );
}

function InfoBadge({ text }: { text: string }) {
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  gradientOverlay: {
  ...StyleSheet.absoluteFillObject,
  backgroundColor: 'transparent',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
  padding: 12,
  backgroundColor: 'rgba(0,0,0,0.25)',
  borderRadius: 50,
  marginTop: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '600',
  },
  nameContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  decorativeCircle: {
    position: 'absolute',
    opacity: 0.15,
  },
  circle: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  nameContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  label: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    fontWeight: '500',
    marginBottom: 16,
    letterSpacing: 1,
  },
  name: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: '#1a1a2e',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  badge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
  },
  badgeText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
    fontWeight: '500',
  },
fab: {
  width: 64,
  height: 64,
  borderRadius: 32,
  backgroundColor: 'rgba(255,255,255,0.95)',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 10 },
  shadowOpacity: 0.3,
  shadowRadius: 20,
  elevation: 15,
},

fabIcon: {
  fontSize: 28,
},
headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  paddingHorizontal: 12,
  marginTop: 8,
},
timerText: {
  fontSize: 18,
  color: '#000',
  fontWeight: '600',
},
});
