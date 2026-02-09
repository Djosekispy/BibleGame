# 📖 Tesouros Biblicos - Aplicação de Jogos Bíblicos Interativos

> Uma aplicação mobile elegante e profissional para explorar as Escrituras através de jogos interativos

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 🎮 Características Principais

### 🎭 **Três Jogos Interativos**

#### 1. **Revelação de Personagens**
- Descubra personagens bíblicos através de cores dinâmicas
- Gerador automático de nomes com cores únicas
- Animações suavizadas e efeito de transição elegante
- **Dificuldade:** Iniciante
- **40+ personagens bíblicos** com cores personalizado

#### 2. **Quem Proferiu?**
- Identifique quem disse frases sagradas da Bíblia
- Múltiplo choice com 4 opções de resposta
- **24+ frases bíblicas** da Tradução do Novo Mundo
- Sistema de pontuação em tempo real
- Feedback visual (resposta correta/incorreta)
- **10 perguntas por partida**
- **Dificuldade:** Intermediário

#### 3. **Conhecimento Sagrado**
- Teste seus saberes nas Escrituras
- **40 perguntas bíblicas** com resposta de texto
- 3 níveis de dificuldade: Iniciante, Intermediário, Difícil
- Sistema de dicas (até 2 por pergunta)
- Mostrar resposta correta se errar
- Pontuação com feedback motivacional
- **Dificuldade:** Variável

---

## 📱 Interface & Design

- **Design Premium**: Interface moderna e elegante com gradientes e animações suavizadas
- **Tema Escuro Profissional**: Paleta de cores cuidadosamente selecionada (#0a0e27, #1a1f3a, etc.)
- **Responsividade Total**: Otimizado para tablets e smartphones
- **Rotação Automática**: Suporta portrait e landscape com transição automática
- **Animações Fluidas**: Uso de React Native Reanimated para transições suaves

---

## 📋 Requisitos do Sistema

### Pré-requisitos
- **Node.js** 18+ ou superior
- **npm** ou **yarn** (gerenciador de pacotes)
- **Expo CLI** instalado globalmente: `npm install -g expo-cli`

### Plataforms Suportadas
- ✅ **iOS** (iPhone, iPad)
- ✅ **Android** (smartphone, tablet)
- ✅ **Web** (navegadores modernos)

---

## 🚀 Instalação & Setup

### 1. Clonar o Repositório
```bash
git clone https://github.com/Djosekispy/BibleGame.git
cd BibleGame
```

### 2. Instalar Dependências
```bash
npm install
# ou
yarn install
```

### 3. Iniciar o Projeto
```bash
npm start
# ou
yarn start
```

### 4. Escolher Plataforma
Após executar `npm start`, você verá um menu:
```
› Press i to open iOS Simulator
› Press a to open Android Emulator
› Press w to open web
› Press r to reload the app
› Press m to toggle menu
```

#### Para iOS (macOS)
```bash
npm run ios
```

#### Para Android
```bash
npm run android
```

#### Para Web
```bash
npm run web
```

---

## 📖 Como Usar a Aplicação

### Tela Inicial (Home)
1. Abra a aplicação
2. Veja os **3 jogos disponíveis** com descrições
3. Toque no jogo desejado

### Jogo 1: Revelação de Personagens
1. Uma cor aleatória será exibida em fullscreen
2. Um nome bíblico correspondente aparece
3. Toque **"✨"** para descobrir mais personagens
4. Veja a cor hexadecimal do nome

### Jogo 2: Quem Proferiu?
1. Uma frase da Bíblia será exibida
2. Escolha entre **4 opções** de quem a proferiu
3. Receba feedback imediato
4. Complete **40 rodadas**
5. Veja sua pontuação final

### Jogo 3: Conhecimento Sagrado
1. Uma **pergunta bíblica** será exibida
2. **Digite sua resposta** no campo de texto
3. Use **dicas** se necessário (até 2)
4. Toque **"Verificar Resposta"**
5. Veja se acertou ou a resposta correta
6. Complete **40 perguntas**
7. Receba avaliação de desempenho

---

---

### Adicionar Novas Perguntas
1. Abra `constants/BibleQuestions.ts`
2. Adicione um novo objeto à array `BIBLE_QUESTIONS`
3. Respeite o formato:
```typescript
{
  id: 'numero_unico',
  question: 'Sua pergunta aqui?',
  answer: 'Resposta esperada',
  reference: 'Livro Capítulo:Verso TNM',
  book: 'Nome do Livro',
  difficulty: 'easy' | 'medium' | 'hard',
  hints?: ['Dica 1', 'Dica 2'],
}
```

### Adicionar Novos Personagens
1. Abra `constants/BibleNames.ts`
2. Adicione um novo objeto à array `BIBLE_NAMES`
3. Formato:
```typescript
{
  name: 'Nome do Personagem',
  color: '#RRGGBB',
  rgb: [R, G, B],
}
```

---

## 🎨 Paleta de Cores Padrão

| Cor | Hex | Uso |
|-----|-----|-----|
| Fundo Primário | `#0a0e27` | Background principal |
| Fundo Secundário | `#1a1f3a` | Cards e containers |
| Vermelho | `#FF6B6B` | Jogo 1 - Personagens |
| Ciano | `#4ECDC4` | Jogo 2 - Citações |
| Azul | `#45B7D1` | Jogo 3 - Perguntas |

---




## 🤝 Contribuindo

1. **Fork** o repositório
2. **Crie uma branch** para sua feature: `git checkout -b feature/MinhaFeature`
3. **Commit** suas alterações: `git commit -m 'Adiciona MinhaFeature'`
4. **Push** para a branch: `git push origin feature/MinhaFeature`
5. **Abra um Pull Request**

---

## 📄 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

---


## 📊 Roadmap Futuro

- [ ] Sistema de pontuação global com leaderboard
- [ ] Modo multiplayer
- [ ] Temas adicionais (claro, alto contraste)
- [ ] Áudio narrado para frases bíblicas
- [ ] Integração com redes sociais
- [ ] Certificados de conclusão
- [ ] Modo offline
- [ ] Suporte para mais idiomas

---
