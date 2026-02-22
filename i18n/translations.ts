export type Lang = 'pt' | 'umb';

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
  umb: {
    app_title: 'Omahoso W’Aleluya',
    app_tagline: 'Olongoti vyokukandekela efundiso',
    leaderboard: 'Okukwata vyokusepa',
    leaderboard_desc: 'Onoliki vyokupitila',
    settings: 'Okutunda',
    settings_desc: 'Olumwe ni olundunge',
    score: 'Epuliso',
    next: 'Okuti',
    restart: 'Okutandela',
    home: 'Ondaka',
    certificate: 'Okupanga Setifikadu',
  },
};

export function t(key: string, lang: Lang = 'pt'): string {
  const pack = strings[lang] || strings.pt;
  return pack[key] || key;
}
