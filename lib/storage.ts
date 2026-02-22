import AsyncStorage from '@react-native-async-storage/async-storage';

export type ScoreEntry = {
  id: string;
  gameId: string;
  score: number;
  total: number;
  percent: number;
  playerName: string;
  date: string;
};

const KEYS = {
  leaderboard: 'leaderboard',
  playerName: 'player_name',
  settings: 'app_settings',
};

export async function getLeaderboard(): Promise<ScoreEntry[]> {
  const raw = await AsyncStorage.getItem(KEYS.leaderboard);
  if (!raw) return [];
  try {
    const list: ScoreEntry[] = JSON.parse(raw);
    return list.sort((a, b) => b.percent - a.percent);
  } catch {
    return [];
  }
}

export async function addScore(entry: Omit<ScoreEntry, 'id' | 'percent' | 'date'>): Promise<ScoreEntry> {
  const percent = entry.total > 0 ? Math.round((entry.score / entry.total) * 100) : 0;
  const newEntry: ScoreEntry = {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    gameId: entry.gameId,
    score: entry.score,
    total: entry.total,
    percent,
    playerName: entry.playerName,
    date: new Date().toISOString(),
  };
  const list = await getLeaderboard();
  const updated = [newEntry, ...list].slice(0, 100);
  await AsyncStorage.setItem(KEYS.leaderboard, JSON.stringify(updated));
  return newEntry;
}

export async function getPlayerName(): Promise<string> {
  const v = await AsyncStorage.getItem(KEYS.playerName);
  return v || 'Convidado';
}

export async function setPlayerName(name: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.playerName, name);
}

export type AppSettings = {
  theme: 'auto' | 'light' | 'dark' | 'high-contrast';
  language: 'pt' | 'umb';
};

export async function getSettings(): Promise<AppSettings> {
  const raw = await AsyncStorage.getItem(KEYS.settings);
  if (!raw) return { theme: 'auto', language: 'pt' };
  try {
    const s = JSON.parse(raw) as AppSettings;
    return s;
  } catch {
    return { theme: 'auto', language: 'pt' };
  }
}

export async function setSettings(s: AppSettings): Promise<void> {
  await AsyncStorage.setItem(KEYS.settings, JSON.stringify(s));
}
