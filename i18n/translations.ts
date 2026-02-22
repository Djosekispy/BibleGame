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
    time: 'Tempo',
    perfect: '🌟 Perfeito! Você é um expert bíblico!',
    excellent: '👏 Excelente! Muito bom!',
    well_done: '👍 Bem feito! Continue estudando!',
    keep_trying: '💪 Não desista! Tente novamente!',
    game_over_modal_title: 'Fim do Quiz',
    game_over_modal_message: 'Você completou o quiz! Veja seu resultado e compartilhe seu certificado.',
    modal_ok: 'OK',
    time_up_title: 'Tempo esgotado',
    time_up_message: 'O tempo acabou!',
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
    time: 'Time',
    perfect: '🌟 Perfect! You are a bible expert!',
    excellent: '👏 Excellent! Very good!',
    well_done: '👍 Well done! Keep studying!',
    keep_trying: '💪 Don’t give up! Try again!',
    game_over_modal_title: 'Quiz Complete',
    game_over_modal_message: 'You finished the quiz! Check your result and share your certificate.',
    modal_ok: 'OK',
    time_up_title: 'Time’s up!',
    time_up_message: 'Time has run out!',
  },
};

export function t(key: string, lang: Lang = 'pt'): string {
  const pack = strings[lang] || strings.pt;
  return pack[key] || key;
}
