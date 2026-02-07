# 📖 QUEM SOU - Aplicação de Jogos Bíblicos Interativos

> Uma aplicação mobile elegante e profissional para explorar as Escrituras através de jogos interativos baseados na **Tradução do Novo Mundo** das Testemunhas de Jeová.

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

## 🛠️ Tecnologias Utilizadas

### Framework & Runtime
- **React Native** 0.81.5
- **Expo** ~54.0.33 - Framework para desenvolvimento com React Native
- **Expo Router** ~6.0.23 - Roteamento baseado em arquivo

### UI & Animações
- **React Native Reanimated** ~4.1.1 - Animações de alto desempenho
- **Expo Linear Gradient** ~14.0.1 - Gradientes para backgrounds
- **@expo/vector-icons** ^15.0.3 - Ícones MaterialCommunity

### Outras Dependências
- **React** 19.1.0
- **TypeScript** ~5.9.2 - Tipagem estática
- **React Navigation** ^7.1.8 - Navegação
- **React Native Safe Area Context** ~5.6.0 - Segurança de áreas

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

## 📁 Estrutura do Projeto

```
BibleGame/
├── app/                           # Telas e roteamento (Expo Router)
│   ├── _layout.tsx               # Layout raiz com navegação
│   ├── index.tsx                 # Página inicial (menu)
│   ├── game.tsx                  # Jogo 1: Revelação de Personagens
│   ├── who-said.tsx             # Jogo 2: Quem Proferiu?
│   ├── questions.tsx            # Jogo 3: Conhecimento Sagrado
│   ├── modal.tsx                # Modal (exemplo)
│   └── +not-found.tsx           # Página 404
│
├── constants/                     # Constantes e dados
│   ├── BibleNames.ts            # 40+ personagens com cores
│   ├── BibleQuotes.ts           # 24+ frases bíblicas (TNM)
│   ├── BibleQuestions.ts        # 40 perguntas com respostas
│   └── Colors.ts                # Paleta de cores
│
├── components/                    # Componentes reutilizáveis
│   ├── useColorScheme.ts        # Hook para tema (dark/light)
│   ├── useColorScheme.web.ts   # Versão web
│   ├── useClientOnlyValue.ts   # Renders apenas no cliente
│   ├── useClientOnlyValue.web.ts
│   ├── StyledText.tsx           # Textos estilizados
│   ├── ExternalLink.tsx         # Links externos
│   ├── Themed.tsx               # Componentes com tema
│   └── __tests__/               # Testes
│
├── assets/                        # Recursos estáticos
│   ├── images/                   # Ícones e splash screens
│   └── fonts/                    # Fontes customizadas
│
├── app.json                       # Configuração Expo
├── package.json                  # Dependências e scripts
├── tsconfig.json                # Configuração TypeScript
└── README.md                     # Este arquivo
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
3. Toque **"✨ Gerar Novo Nome"** para descobrir mais personagens
4. Veja a cor hexadecimal do nome

### Jogo 2: Quem Proferiu?
1. Uma frase da Bíblia será exibida
2. Escolha entre **4 opções** de quem a proferiu
3. Receba feedback imediato
4. Complete **10 rodadas**
5. Veja sua pontuação final

### Jogo 3: Conhecimento Sagrado
1. Uma **pergunta bíblica** será exibida
2. **Digite sua resposta** no campo de texto
3. Use **dicas** se necessário (até 2)
4. Toque **"Verificar Resposta"**
5. Veja se acertou ou a resposta correta
6. Complete **12 perguntas**
7. Receba avaliação de desempenho

---

## 📚 Conteúdo Bíblico

### Base de Dados Utilizada
- **Tradução do Novo Mundo** (TNM) - Testemunhas de Jeová
- Todas as referências bíblicas são autenticas
- Frases e perguntas verificadas biblicamente

### Estatísticas de Conteúdo
- **40 Personagens Bíblicos** com cores únicas
- **24+ Frases da Bíblia** (TNM)
- **40 Perguntas Bíblicas** com múltiplos níveis de dificuldade
- **Referências Precisas** de livros e capítulos

---

## ⚙️ Configuração Avançada

### Variáveis de Ambiente
Atualmente, a aplicação não requer variáveis de ambiente. Todas as configurações estão em `app.json` e nos constantes.

### Personalizando Cores
Edite `constants/Colors.ts` para alterar a paleta de cores.

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

## 📱 Orientação de Tela

A aplicação suporta:
- 🔄 **Rotação Automática**: Portrait (vertical) e Landscape (horizontal)
- 📱 Otimizado para ambos os modos
- Transições suaves entre orientações

---

## 🧪 Testes

### Executar Testes
```bash
npm test
```

### Testes Inclusos
- Testes de componentes em `components/__tests__/`
- Validação de tipagem TypeScript

---

## 🐛 Troubleshooting

### Erro: "Execution policies disabled"
**Solução (Windows):**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Erro: "Module not found"
**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### App não inicia no Android
**Solução:**
```bash
npm run android -- --clear-cache
```

### Problemas de TypeScript
**Solução:**
```bash
npm run tsc -- --noEmit
```

---

## 📦 Build para Producción

### iOS (macOS)
```bash
eas build --platform ios
```

### Android
```bash
eas build --platform android
```

### Requer
- Conta no **Expo** (https://expo.dev)
- EAS CLI instalado: `npm install -g eas-cli`

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

## 👨‍💻 Autor

**Osvaldo Victor**
- 📧 Email: [seu-email@exemplo.com]
- 🔗 GitHub: [seu-github]
- 💼 LinkedIn: [seu-linkedin]

---

## 🙏 Agradecimentos

- **Expo** - Framework incrível para React Native
- **Testemunhas de Jeová** - Pela Tradução do Novo Mundo
- **Comunidade React Native** - Pelo suporte contínuo

---

## 📞 Suporte

Tem perguntas ou encontrou um bug? 
- 🐛 Abra uma [Issue](../../issues)
- 💬 Envie uma mensagem privada
- 📧 Entre em contato por email

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

## 📈 Estatísticas do Projeto

- **Plataformas:** 3 (iOS, Android, Web)
- **Jogos:** 3 interativos
- **Perguntas:** 40+
- **Personagens:** 40+
- **Frases Bíblicas:** 24+
- **Tamanho do App:** ~50MB
- **Última Atualização:** Fevereiro 2026

---

<div align="center">

### Desenvolvido com ❤️ para a comunidade cristã

**QUEM SOU - Aplicação de Jogos Bíblicos Interativos**

"Você tem de amar a Jeová, seu Deus, de todo o seu coração" — Deuteronômio 6:5 TNM

</div>
