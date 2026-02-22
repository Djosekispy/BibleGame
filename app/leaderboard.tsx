import { t } from '@/i18n/translations';
import { getLeaderboard, getSettings } from '@/lib/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// helper to convert seconds to mm:ss
const formatTime = (sec: number) => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

export default function LeaderboardScreen() {
  const [data, setData] = useState([]);
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const list = await getLeaderboard();
      if (mounted) setData(list as any);
      const s = await getSettings();
      if (mounted) setLang(s.language);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={{ width: 40 }} />
      </View>

      <FlatList
        data={data}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>Sem pontuações ainda</Text>}
        renderItem={({ item, index }: any) => (
          <View style={styles.row}>
            <View style={[styles.rankBadge, { backgroundColor: index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : index === 2 ? '#CD7F32' : '#64748b' }]}>
              <Text style={styles.rankText}>{index + 1}</Text>
            </View>
            <View style={styles.rowText}>
              <Text style={styles.player}>{item.playerName}</Text>
              <Text style={styles.meta}>{item.gameId} • {item.score}/{item.total}</Text>
              <Text style={styles.meta}>{t('time', lang)}:{' '}{formatTime(item.duration)}</Text>
              <Text style={styles.meta}>{new Date(item.date).toLocaleDateString()}</Text>
            </View>
            <Text style={styles.percent}>{item.percent}%</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e27',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#1a1f3a',
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
  listContent: {
    padding: 16,
    gap: 8,
  },
  empty: {
    color: '#b0b0b0',
    textAlign: 'center',
    marginTop: 40,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 12,
  },
  rankBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  rankText: {
    color: '#0a0e27',
    fontWeight: 'bold',
  },
  rowText: {
    flex: 1,
  },
  player: {
    color: '#fff',
    fontWeight: '600',
  },
  meta: {
    color: '#94a3b8',
    fontSize: 12,
    marginTop: 2,
  },
  percent: {
    color: '#45B7D1',
    fontWeight: 'bold',
  },
});
