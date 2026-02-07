// Tradução do Novo Mundo (Testemunhas de Jeová)
export interface BibleQuote {
  text: string;
  author: string;
  book: string;
  reference: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const BIBLE_QUOTES: BibleQuote[] = [
  {
    text: "No princípio Deus criou os céus e a terra.",
    author: "Narrador",
    book: "Gênesis",
    reference: "Gênesis 1:1 TNM",
    difficulty: "easy",
  },
  {
    text: "Jeová Deus passou então a formar o homem do pó do solo.",
    author: "Narrador",
    book: "Gênesis",
    reference: "Gênesis 2:7 TNM",
    difficulty: "easy",
  },
  {
    text: "Ande enquanto ainda tem a luz, para que a escuridão não o alcance.",
    author: "Jesus",
    book: "João",
    reference: "João 12:35 TNM",
    difficulty: "medium",
  },
  {
    text: "Você tem de amar a Jeová, seu Deus, de todo o seu coração, de toda a sua alma e de toda a sua força.",
    author: "Jeová/Moisés",
    book: "Deuteronômio",
    reference: "Deuteronômio 6:5 TNM",
    difficulty: "medium",
  },
  {
    text: "Jeová é misericordioso e compassivo, vagaroso em irar-se e abundante em amor leal.",
    author: "Davi",
    book: "Salmos",
    reference: "Salmos 103:8 TNM",
    difficulty: "easy",
  },
  {
    text: "Confie em Jeová de todo o seu coração e não se apoie no seu próprio entendimento.",
    author: "Salomão",
    book: "Provérbios",
    reference: "Provérbios 3:5 TNM",
    difficulty: "easy",
  },
  {
    text: "O temor de Jeová é o princípio da sabedoria.",
    author: "Salomão",
    book: "Provérbios",
    reference: "Provérbios 9:10 TNM",
    difficulty: "easy",
  },
  {
    text: "Jeová é meu pastor. Nada me faltará.",
    author: "Davi",
    book: "Salmos",
    reference: "Salmos 23:1 TNM",
    difficulty: "easy",
  },
  {
    text: "Entrega teu caminho a Jeová; confia nele, e ele agirá.",
    author: "Davi",
    book: "Salmos",
    reference: "Salmos 37:5 TNM",
    difficulty: "medium",
  },
  {
    text: "A tua palavra é lâmpada para o meu pé e luz para o meu caminho.",
    author: "Salmista",
    book: "Salmos",
    reference: "Salmos 119:105 TNM",
    difficulty: "medium",
  },
  {
    text: "Não tenha medo, pois eu estou com você.",
    author: "Jeová",
    book: "Isaías",
    reference: "Isaías 41:10 TNM",
    difficulty: "easy",
  },
  {
    text: "Venham e resolvamos as coisas entre nós, diz Jeová.",
    author: "Jeová",
    book: "Isaías",
    reference: "Isaías 1:18 TNM",
    difficulty: "hard",
  },
  {
    text: "Aquele que anda com os sábios se tornará sábio.",
    author: "Salomão",
    book: "Provérbios",
    reference: "Provérbios 13:20 TNM",
    difficulty: "easy",
  },
  {
    text: "O coração é mais traiçoeiro do que qualquer outra coisa.",
    author: "Jeová/Jeremias",
    book: "Jeremias",
    reference: "Jeremias 17:9 TNM",
    difficulty: "hard",
  },
  {
    text: "Bem felizes os conscientes de sua necessidade espiritual.",
    author: "Jesus",
    book: "Mateus",
    reference: "Mateus 5:3 TNM",
    difficulty: "medium",
  },
  {
    text: "Vocês são o sal da terra.",
    author: "Jesus",
    book: "Mateus",
    reference: "Mateus 5:13 TNM",
    difficulty: "easy",
  },
  {
    text: "Continuem a buscar primeiro o Reino.",
    author: "Jesus",
    book: "Mateus",
    reference: "Mateus 6:33 TNM",
    difficulty: "easy",
  },
  {
    text: "Felizes os misericordiosos, pois serão tratados com misericórdia.",
    author: "Jesus",
    book: "Mateus",
    reference: "Mateus 5:7 TNM",
    difficulty: "easy",
  },
  {
    text: "Conhecerão a verdade, e a verdade os libertará.",
    author: "Jesus",
    book: "João",
    reference: "João 8:32 TNM",
    difficulty: "easy",
  },
  {
    text: "Eu sou o caminho, a verdade e a vida.",
    author: "Jesus",
    book: "João",
    reference: "João 14:6 TNM",
    difficulty: "easy",
  },
  {
    text: "Deus amou tanto o mundo que deu o seu Filho unigênito.",
    author: "Narrador",
    book: "João",
    reference: "João 3:16 TNM",
    difficulty: "easy",
  },
  {
    text: "Este significa vida eterna: que conheçam a ti, o único Deus verdadeiro.",
    author: "Jesus",
    book: "João",
    reference: "João 17:3 TNM",
    difficulty: "medium",
  },
  {
    text: "Há mais felicidade em dar do que em receber.",
    author: "Jesus",
    book: "Atos",
    reference: "Atos 20:35 TNM",
    difficulty: "easy",
  },
  {
    text: "Todos pecaram e não atingem a glória de Deus.",
    author: "Paulo",
    book: "Romanos",
    reference: "Romanos 3:23 TNM",
    difficulty: "medium",
  },
  {
    text: "O salário que o pecado paga é a morte.",
    author: "Paulo",
    book: "Romanos",
    reference: "Romanos 6:23 TNM",
    difficulty: "medium",
  },
  {
    text: "Não há condenação para os que estão em união com Cristo Jesus.",
    author: "Paulo",
    book: "Romanos",
    reference: "Romanos 8:1 TNM",
    difficulty: "medium",
  },
  {
    text: "Transformem-se renovando a sua mente.",
    author: "Paulo",
    book: "Romanos",
    reference: "Romanos 12:2 TNM",
    difficulty: "hard",
  },
  {
    text: "O amor é paciente e bondoso.",
    author: "Paulo",
    book: "1 Coríntios",
    reference: "1 Coríntios 13:4 TNM",
    difficulty: "easy",
  },
  {
    text: "Fujam da imoralidade sexual.",
    author: "Paulo",
    book: "1 Coríntios",
    reference: "1 Coríntios 6:18 TNM",
    difficulty: "easy",
  },
  {
    text: "Continuem andando por fé, não por vista.",
    author: "Paulo",
    book: "2 Coríntios",
    reference: "2 Coríntios 5:7 TNM",
    difficulty: "medium",
  },
  {
    text: "O fruto do espírito é amor, alegria, paz.",
    author: "Paulo",
    book: "Gálatas",
    reference: "Gálatas 5:22 TNM",
    difficulty: "easy",
  },
  {
    text: "Persistam na oração.",
    author: "Paulo",
    book: "Colossenses",
    reference: "Colossenses 4:2 TNM",
    difficulty: "easy",
  },
  {
    text: "Tudo posso por meio daquele que me dá poder.",
    author: "Paulo",
    book: "Filipenses",
    reference: "Filipenses 4:13 TNM",
    difficulty: "medium",
  },
  {
    text: "A fé é a expectativa certa de coisas esperadas.",
    author: "Autor de Hebreus",
    book: "Hebreus",
    reference: "Hebreus 11:1 TNM",
    difficulty: "hard",
  },
  {
    text: "Se Jeová permitir, viveremos e faremos isto ou aquilo.",
    author: "Tiago",
    book: "Tiago",
    reference: "Tiago 4:15 TNM",
    difficulty: "medium",
  },
  {
    text: "Lançem sobre ele toda a sua ansiedade.",
    author: "Pedro",
    book: "1 Pedro",
    reference: "1 Pedro 5:7 TNM",
    difficulty: "easy",
  },
  {
    text: "Deus é amor.",
    author: "João",
    book: "1 João",
    reference: "1 João 4:8 TNM",
    difficulty: "easy",
  },
  {
    text: "Seja fiel até a morte, e eu lhe darei a coroa da vida.",
    author: "Jesus",
    book: "Apocalipse",
    reference: "Apocalipse 2:10 TNM",
    difficulty: "hard",
  },
];


export const getRandomQuote = (): BibleQuote => {
  return BIBLE_QUOTES[Math.floor(Math.random() * BIBLE_QUOTES.length)];
};

export const getQuotesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): BibleQuote[] => {
  return BIBLE_QUOTES.filter(quote => quote.difficulty === difficulty);
};

export const getMultipleQuotes = (count: number): BibleQuote[] => {
  const shuffled = [...BIBLE_QUOTES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, BIBLE_QUOTES.length));
};
