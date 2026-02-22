import AsyncStorage from '@react-native-async-storage/async-storage';

export type ScoreEntry = {
  id: string;
  gameId: string;
  score: number;
  total: number;
  percent: number;
  // duration in seconds the player took to complete the quiz
  duration: number;
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
    // ensure each entry has a duration field
    const normalized = list.map(e => ({
      ...e,
      duration: typeof e.duration === 'number' ? e.duration : 0,
    }));
    return normalized.sort((a, b) => b.percent - a.percent || a.duration - b.duration);
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
    duration: entry.duration,
    playerName: entry.playerName,
    date: new Date().toISOString(),
  };
  const list = await getLeaderboard();
  // sort by percent desc then by duration asc so faster times rank higher when tied
  const updated = [newEntry, ...list]
    .sort((a, b) => {
      if (b.percent === a.percent) {
        return a.duration - b.duration;
      }
      return b.percent - a.percent;
    })
    .slice(0, 100);
  await AsyncStorage.setItem(KEYS.leaderboard, JSON.stringify(updated));
  return newEntry;
}

// returns the stored player name, falling back to a localized default
// the optional `lang` argument lets callers supply the current language
export async function getPlayerName(lang: 'pt' | 'en' = 'pt'): Promise<string> {
  const v = await AsyncStorage.getItem(KEYS.playerName);
  if (v && v.length > 0) return v;
  return lang === 'pt' ? 'Convidado' : 'Guest';
}

export async function setPlayerName(name: string): Promise<void> {
  await AsyncStorage.setItem(KEYS.playerName, name);
}

export type AppSettings = {
  theme: 'auto' | 'light' | 'dark' | 'high-contrast';
  language: 'pt' | 'en';
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
