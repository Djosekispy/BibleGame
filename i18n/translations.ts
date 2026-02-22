export type Lang = 'pt' | 'en';

const strings: Record<Lang, Record<string, string>> = {
  pt: {
    app_title: 'Tesouros Bíblicos',
    app_tagline: 'Conhecimento bíblico de forma interativa',
    leaderboard: 'Leaderboard',
    leaderboard_desc: 'Veja as melhores pontuações',
    settings: 'Definições',
    settings_desc: 'Tema e idioma',
    score: 'Score',
    next: 'Próximo',
    restart: 'Reiniciar',
    home: 'Início',
    certificate: 'Gerar Certificado',
  },
  en: {
    app_title: 'Bible Treasures',
    app_tagline: 'Biblical knowledge in an interactive way',
    leaderboard: 'Leaderboard',
    leaderboard_desc: 'See the top scores',
    settings: 'Settings',
    settings_desc: 'Theme and language',
    score: 'Score',
    next: 'Next',
    restart: 'Restart',
    home: 'Home',
    certificate: 'Generate Certificate',
  },
};

export function t(key: string, lang: Lang = 'pt'): string {
  const pack = strings[lang] || strings.pt;
  return pack[key] || key;
}
