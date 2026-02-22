import { t } from '@/i18n/translations';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CertificateScreen() {
  const params = useLocalSearchParams() as any;
  const playerName = params.playerName || 'Convidado';
  const score = Number(params.score || 0);
  const total = Number(params.total || 0);
  const percent = Number(params.percent || 0);
  const gameId = params.gameId || '';
  const duration = Number(params.duration || 0);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>Certificado</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.card}>
        <MaterialCommunityIcons name="certificate" size={48} color="#FFD700" />
        <Text style={styles.cardTitle}>Certificado de Conclusão</Text>
        <Text style={styles.cardName}>{playerName}</Text>
        <Text style={styles.cardText}>Concluiu o jogo {gameId}</Text>
        <Text style={styles.cardText}>Pontuação {score}/{total} ({percent}%)</Text>
        {duration > 0 && (
          <Text style={styles.cardText}>{t('time')}: {formatTime(duration)}</Text>
        )}
        <Text style={styles.cardDate}>{new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.tips}>
        <Text style={styles.tipText}>Guarde este certificado com uma captura de ecrã.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#1a1f3a',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 6,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  cardTitle: {
    color: '#FFD700',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 8,
    marginBottom: 4,
  },
  cardName: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 6,
  },
  cardText: {
    color: '#cbd5e1',
    fontSize: 14,
  },
  cardDate: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 8,
  },
  tips: {
    marginTop: 16,
    alignItems: 'center',
  },
  tipText: {
    color: '#94a3b8',
    fontSize: 12,
  },
})
