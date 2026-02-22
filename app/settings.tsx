import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getSettings, setSettings } from '@/lib/storage';

type ThemeOption = 'auto' | 'light' | 'dark' | 'high-contrast';
type LanguageOption = 'pt' | 'umb';

export default function SettingsScreen() {
  const [theme, setTheme] = useState<ThemeOption>('auto');
  const [language, setLanguage] = useState<LanguageOption>('pt');

  useEffect(() => {
    let mounted = true;
    (async () => {
      const s = await getSettings();
      if (mounted) {
        setTheme(s.theme);
        setLanguage(s.language);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  async function save() {
    await setSettings({ theme, language });
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <View style={styles.header}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.title}>Definições</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tema</Text>
        <View style={styles.optionsRow}>
          {(['auto','light','dark','high-contrast'] as ThemeOption[]).map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionButton, theme === opt && styles.optionSelected]}
              onPress={() => setTheme(opt)}
            >
              <Text style={[styles.optionText, theme === opt && styles.optionTextSelected]}>
                {opt === 'auto' ? 'Automático' : opt === 'light' ? 'Claro' : opt === 'dark' ? 'Escuro' : 'Alto Contraste'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Idioma</Text>
        <View style={styles.optionsRow}>
          {(['pt','umb'] as LanguageOption[]).map(opt => (
            <TouchableOpacity
              key={opt}
              style={[styles.optionButton, language === opt && styles.optionSelected]}
              onPress={() => setLanguage(opt)}
            >
              <Text style={[styles.optionText, language === opt && styles.optionTextSelected]}>
                {opt === 'pt' ? 'Português' : 'Umbundu'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveText}>Guardar</Text>
      </TouchableOpacity>
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    color: '#cbd5e1',
    fontSize: 14,
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.04)',
  },
  optionSelected: {
    borderColor: '#45B7D1',
    backgroundColor: 'rgba(69,183,209,0.12)',
  },
  optionText: {
    color: '#94a3b8',
    fontSize: 13,
  },
  optionTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 12,
    marginHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#45B7D1',
    alignItems: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
})
