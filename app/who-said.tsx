import EndModal from '@/components/EndModal';
import { BIBLE_QUOTES, getRandomQuote, type BibleQuote } from '@/constants/BibleQuotes';
import { t } from '@/i18n/translations';
import { addScore, getPlayerName, getSettings } from '@/lib/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    Vibration,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface GameState {
  currentQuote: BibleQuote;
  options: string[];
  score: number;
  answered: boolean;
  isCorrect: boolean;
  totalQuestions: number;
  questionsAnswered: number;
}

export default function WhoSaidGameScreen() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const quote = getRandomQuote();
    const allAuthors = [...new Set(BIBLE_QUOTES.map(q => q.author))];
    const wrongAnswers = allAuthors
      .filter(author => author !== quote.author)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [quote.author, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    return {
      currentQuote: quote,
      options,
      score: 0,
      answered: false,
      isCorrect: false,
      totalQuestions: 39,
      questionsAnswered: 0,
    };
  });

  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [saved, setSaved] = useState(false);
  const [percent, setPercent] = useState(0);
  const [playerName, setPlayerNameState] = useState('Convidado');
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [showEndModal, setShowEndModal] = useState(false);

  // timer
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (selectedAnswer: string) => {
    if (gameState.answered) return;

    const isCorrect = selectedAnswer === gameState.currentQuote.author;
    Vibration.vibrate(isCorrect ? [100, 50, 100] : 200);

    setGameState(prev => ({
      ...prev,
      answered: true,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const nextQuestion = () => {
    const newQuestionsAnswered = gameState.questionsAnswered + 1;
    
    if (newQuestionsAnswered >= gameState.totalQuestions) {
      // Game over – show modal and flip state to trigger results
      setGameState(prev => ({
        ...prev,
        questionsAnswered: newQuestionsAnswered,
      }));
      setShowEndModal(true);
      return;
    }

    const newQuote = getRandomQuote();
    const allAuthors = [...new Set(BIBLE_QUOTES.map(q => q.author))];
    const wrongAnswers = allAuthors
      .filter(author => author !== newQuote.author)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [newQuote.author, ...wrongAnswers].sort(() => Math.random() - 0.5);

    fadeAnim.setValue(0);

    setGameState(prev => ({
      ...prev,
      currentQuote: newQuote,
      options,
      answered: false,
      isCorrect: false,
      questionsAnswered: newQuestionsAnswered,
    }));

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const restartGame = () => {
    const quote = getRandomQuote();
    const allAuthors = [...new Set(BIBLE_QUOTES.map(q => q.author))];
    const wrongAnswers = allAuthors
      .filter(author => author !== quote.author)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    
    const options = [quote.author, ...wrongAnswers].sort(() => Math.random() - 0.5);

    setGameState({
      currentQuote: quote,
      options,
      score: 0,
      answered: false,
      isCorrect: false,
      totalQuestions: 39,
      questionsAnswered: 0,
    });
    setStartTime(Date.now());
    setElapsed(0);
    setSaved(false);
    setPercent(0);
    setShowEndModal(false);
  };

  const isGameOver = gameState.questionsAnswered >= gameState.totalQuestions;

  // timer effect
  useEffect(() => {
    if (isGameOver) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [startTime, isGameOver]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const s = await getSettings();
      if (mounted) setLang(s.language);
      const name = await getPlayerName(s.language as 'pt' | 'en');
      if (mounted) setPlayerNameState(name);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (isGameOver && !saved) {
      const pct = Math.round((gameState.score / gameState.totalQuestions) * 100);
      setPercent(pct);
      const duration = Math.floor((Date.now() - startTime) / 1000);
      addScore({ gameId: 'QuemProferiu', score: gameState.score, total: gameState.totalQuestions, playerName, duration });
      setSaved(true);
    }
  }, [isGameOver, saved, gameState.score, gameState.totalQuestions, playerName, startTime]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      
      <View style={styles.headerContainer}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {gameState.questionsAnswered + 1}/{gameState.totalQuestions}
          </Text>
          <Text style={styles.scoreLabel}>{t('score', lang)}: {gameState.score}</Text>
        </View>
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(elapsed)}</Text>
        </View>
        <View style={{ width: 40 }} />
      </View>

      {!isGameOver ? (
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                {
                  width: `${((gameState.questionsAnswered + 1) / gameState.totalQuestions) * 100}%`,
                },
              ]}
            />
          </View>

          <Animated.View style={[styles.quoteCard, { opacity: fadeAnim }]}>
            <MaterialCommunityIcons name="format-quote-open" size={32} color="#FF6B6B" />
            <Text style={styles.quoteText}>"{gameState.currentQuote.text}"</Text>
            <MaterialCommunityIcons name="format-quote-close" size={32} color="#FF6B6B" />
          </Animated.View>

          <Text style={styles.questionLabel}>
            {lang === 'pt' ? 'Quem disse isto?' : 'Who said this?'}
          </Text>

          <View style={styles.optionsContainer}>
            {gameState.options.map((option, index) => {
              const isSelected = gameState.answered;
              const isCorrectAnswer = option === gameState.currentQuote.author;
              const userSelectedThis = option === gameState.currentQuote.author && gameState.answered && gameState.isCorrect;
              const userSelectedWrong = option !== gameState.currentQuote.author && gameState.answered && !gameState.isCorrect;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isCorrectAnswer && gameState.answered && styles.optionCorrect,
                    !isCorrectAnswer && userSelectedWrong && styles.optionWrong,
                  ]}
                  onPress={() => handleAnswer(option)}
                  disabled={gameState.answered}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.optionText,
                    isCorrectAnswer && gameState.answered && styles.optionTextLight,
                    !isCorrectAnswer && userSelectedWrong && styles.optionTextLight,
                  ]}>
                    {option}
                  </Text>
                  {isCorrectAnswer && gameState.answered && (
                    <MaterialCommunityIcons name="check-circle" size={20} color="#fff" />
                  )}
                  {!isCorrectAnswer && userSelectedWrong && (
                    <MaterialCommunityIcons name="close-circle" size={20} color="#fff" />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {gameState.answered && (
            <View style={styles.feedbackContainer}>
              <Text style={[
                styles.feedbackText,
                gameState.isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}>
                {gameState.isCorrect ? '✓ Correto!' : '✗ Incorreto!'}
              </Text>
              <Text style={styles.bookReference}>
                {gameState.currentQuote.reference}
              </Text>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={nextQuestion}
              >
                <Text style={styles.nextButtonText}>{t('next', lang)} →</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.gameOverContainer}>
        <EndModal
          visible={showEndModal}
          title={t('game_over_modal_title', lang)}
          message={t('game_over_modal_message', lang)}
          lang={lang}
          onClose={() => setShowEndModal(false)}
        />
          <MaterialCommunityIcons name="trophy" size={80} color="#FFD700" />
          <Text style={styles.gameOverTitle}>Jogo Terminado!</Text>
          <Text style={styles.gameOverScore}>
            Você acertou {gameState.score} de {gameState.totalQuestions}
          </Text>
          <Text style={styles.gameOverPercentage}>
            ({percent}%)
          </Text>
          <Text style={styles.gameOverTime}>{t('time', lang)}: {formatTime(elapsed)}</Text>

          <View style={styles.gameOverButtons}>
            <TouchableOpacity
              style={[styles.gameOverButton, styles.restartButton]}
              onPress={restartGame}
            >
              <MaterialCommunityIcons name="refresh" size={20} color="#fff" />
              <Text style={styles.gameOverButtonText}>{t('restart', lang)}</Text>
            </TouchableOpacity>

            <Link href="/leaderboard" asChild>
              <TouchableOpacity style={[styles.gameOverButton, styles.restartButton]}>
                <MaterialCommunityIcons name="trophy" size={20} color="#fff" />
                <Text style={styles.gameOverButtonText}>{t('leaderboard', lang)}</Text>
              </TouchableOpacity>
            </Link>

            <Link
              href={{
                pathname: '/certificate',
                params: {
                  playerName,
                  score: String(gameState.score),
                  total: String(gameState.totalQuestions),
                  percent: String(percent),
                  duration: String(elapsed),
                  gameId: 'QuemProferiu',
                },
              } as any}
              asChild
            >
              <TouchableOpacity style={[styles.gameOverButton, styles.restartButton]}>
                <MaterialCommunityIcons name="certificate" size={20} color="#fff" />
                <Text style={styles.gameOverButtonText}>{t('certificate', lang)}</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/" asChild>
              <TouchableOpacity style={[styles.gameOverButton, styles.homeButton]}>
                <MaterialCommunityIcons name="home" size={20} color="#1a1a2e" />
                <Text style={[styles.gameOverButtonText, { color: '#1a1a2e' }]}>
                  {t('home', lang)}
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0f3460',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: '#b0b0b0',
    fontSize: 12,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 3,
    marginBottom: 30,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
    borderRadius: 3,
  },
  quoteCard: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
    borderRadius: 12,
    padding: 12,
    marginBottom: 30,
    alignItems: 'center',
  },
  quoteText: {
    color: '#fff',
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 28,
  },
  questionLabel: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 16,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 24,
  },
  optionButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCorrect: {
    backgroundColor: '#27AE60',
    borderColor: '#27AE60',
  },
  optionWrong: {
    backgroundColor: '#E74C3C',
    borderColor: '#E74C3C',
  },
  optionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  optionTextLight: {
    color: '#fff',
  },
  feedbackContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  feedbackCorrect: {
    color: '#27AE60',
  },
  feedbackWrong: {
    color: '#E74C3C',
  },
  bookReference: {
    color: '#b0b0b0',
    fontSize: 12,
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  gameOverTitle: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
  },
  gameOverScore: {
    color: '#b0b0b0',
    fontSize: 20,
    marginBottom: 4,
  },
  gameOverPercentage: {
    color: '#FF6B6B',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  gameOverTime: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 20,
  },
  timerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
  },
  timerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  gameOverButtons: {
    width: '100%',
    gap: 12,
  },
  gameOverButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  restartButton: {
    backgroundColor: '#FF6B6B',
  },
  homeButton: {
    backgroundColor: '#fff',
  },
  gameOverButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
