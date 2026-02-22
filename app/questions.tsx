import EndModal from '@/components/EndModal';
import { getMultipleQuestions, type BibleQuestion } from '@/constants/BibleQuestionsNew';
import { t } from '@/i18n/translations';
import { addScore, getPlayerName, getSettings } from '@/lib/storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface GameState {
  questions: BibleQuestion[];
  currentQuestionIndex: number;
  score: number;
  answered: boolean;
  selectedOption: number | null;
  isCorrect: boolean;
  showHint: boolean;
  hintsUsed: number;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuestionsGameScreen() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const questions = getMultipleQuestions(10);
    return {
      questions,
      currentQuestionIndex: 0,
      score: 0,
      answered: false,
      selectedOption: null,
      isCorrect: false,
      showHint: false,
      hintsUsed: 0,
    };
  });

  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const [saved, setSaved] = useState(false);
  const [percent, setPercent] = useState(0);
  const [playerName, setPlayerNameState] = useState('Convidado');
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  const [showEndModal, setShowEndModal] = useState(false);

  // timer / duration
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [elapsed, setElapsed] = useState(0);

  const selectOption = (optionIndex: number) => {
    if (gameState.answered) return;

    const isCorrect = optionIndex === currentQuestion.correctOption;
    Vibration.vibrate(isCorrect ? [100, 50, 100] : 200);

    setGameState(prev => ({
      ...prev,
      answered: true,
      selectedOption: optionIndex,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  };

  const useHint = () => {
    if (gameState.hintsUsed < 2 && currentQuestion.hints) {
      Vibration.vibrate(50);
      setGameState(prev => ({
        ...prev,
        showHint: true,
        hintsUsed: prev.hintsUsed + 1,
      }));
    }
  };

  const nextQuestion = () => {
    const nextIndex = gameState.currentQuestionIndex + 1;
    
    if (nextIndex >= gameState.questions.length) {
      // move into game over state so the UI can render the results
      setGameState(prev => ({
        ...prev,
        currentQuestionIndex: nextIndex, // this makes isGameOver true
      }));
      // display styled modal instead of alert
      setShowEndModal(true);
      return;
    }

    fadeAnim.setValue(0);

    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      answered: false,
      selectedOption: null,
      showHint: false,
      hintsUsed: 0,
    }));

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const restartGame = () => {
    const questions = getMultipleQuestions(10);
    setGameState({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      answered: false,
      selectedOption: null,
      isCorrect: false,
      showHint: false,
      hintsUsed: 0,
    });
    setStartTime(Date.now());
    setElapsed(0);
    setSaved(false);
    setPercent(0);
    setShowEndModal(false);
  };

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  // helper to display elapsed seconds as minutes:seconds
  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const isGameOver = gameState.currentQuestionIndex >= gameState.questions.length;
  const difficultyColor = {
    easy: '#27AE60',
    medium: '#F39C12',
    hard: '#E74C3C',
  }[currentQuestion?.difficulty || 'easy'];

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

  // interval for timer
  useEffect(() => {
    if (isGameOver) return;
    const id = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [startTime, isGameOver]);


  useEffect(() => {
    if (isGameOver && !saved) {
      const pct = Math.round((gameState.score / gameState.questions.length) * 100);
      setPercent(pct);
      const duration = Math.floor((Date.now() - startTime) / 1000);
      addScore({
        gameId: 'ConhecimentoSagrado',
        score: gameState.score,
        total: gameState.questions.length,
        playerName,
        duration,
      });
      setSaved(true);
    }
  }, [isGameOver, saved, gameState.score, gameState.questions.length, playerName, startTime]);

  return (
    <View style={styles.container}>
      
      <View style={styles.headerContainer}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.backButton}>
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
        </Link>
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            {gameState.currentQuestionIndex + 1}/{gameState.questions.length}
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
                  width: `${((gameState.currentQuestionIndex + 1) / gameState.questions.length) * 100}%`,
                },
              ]}
            />
          </View>

          <Animated.View style={[styles.questionCard, { opacity: fadeAnim }]}>
            <Text style={styles.questionText}>{currentQuestion.question}</Text>

            <View style={styles.referenceContainer}>
              <MaterialCommunityIcons name="book-open-variant" size={16} color="#b0b0b0" />
              <Text style={styles.reference}>{currentQuestion.reference}</Text>
            </View>
          </Animated.View>

          {gameState.showHint && currentQuestion.hints && (
            <View style={styles.hintBox}>
              <MaterialCommunityIcons name="lightbulb" size={20} color="#F39C12" />
              <Text style={styles.hintText}>
                {currentQuestion.hints[gameState.hintsUsed - 1]}
              </Text>
            </View>
          )}

          <View style={styles.optionsContainer}>
            {currentQuestion.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  gameState.selectedOption === index && (
                    gameState.isCorrect 
                      ? styles.optionCorrect 
                      : styles.optionWrong
                  ),
                  gameState.answered && index === currentQuestion.correctOption && styles.optionCorrectAnswer,
                  gameState.answered && !gameState.isCorrect && index === gameState.selectedOption && styles.optionWrongSelected,
                ]}
                onPress={() => selectOption(index)}
                disabled={gameState.answered}
                activeOpacity={gameState.answered ? 1 : 0.7}
              >
                <View style={[
                  styles.optionLabel,
                  gameState.selectedOption === index && styles.optionLabelActive,
                ]}>
                  <Text style={[
                    styles.optionLabelText,
                    gameState.selectedOption === index && styles.optionLabelTextActive,
                  ]}>
                    {OPTION_LABELS[index]}
                  </Text>
                </View>
                <Text style={styles.optionText}>{option}</Text>
                {gameState.answered && index === currentQuestion.correctOption && (
                  <MaterialCommunityIcons name="check-circle" size={24} color="#27AE60" />
                )}
                {gameState.answered && index === gameState.selectedOption && !gameState.isCorrect && (
                  <MaterialCommunityIcons name="close-circle" size={24} color="#E74C3C" />
                )}
              </TouchableOpacity>
            ))}
          </View>

          {!gameState.answered ? (
            <View style={styles.buttonContainer}>
              {currentQuestion.hints && gameState.hintsUsed < 2 && (
                <TouchableOpacity style={styles.hintButton} onPress={useHint}>
                  <MaterialCommunityIcons name="lightbulb-outline" size={20} color="#F39C12" />
                  <Text style={styles.hintButtonText}>
                    Dica ({2 - gameState.hintsUsed})
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.feedbackContainer}>

              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                <Text style={styles.nextButtonText}>{t('next', lang)} →</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.gameOverContainer}>
        {/* end-of-quiz modal overlay */}
        <EndModal
          visible={showEndModal}
          title={t('game_over_modal_title', lang)}
          message={t('game_over_modal_message', lang)}
          lang={lang}
          onClose={() => setShowEndModal(false)}
        />
          <MaterialCommunityIcons name="trophy" size={80} color="#FFD700" />
          <Text style={styles.gameOverTitle}>Quiz Completo!</Text>
          <Text style={styles.gameOverScore}>
            Você acertou {gameState.score} de {gameState.questions.length}
          </Text>
          <Text style={styles.gameOverPercentage}>
            ({percent}%)
          </Text>
          <Text style={styles.gameOverTime}>
            {t('time', lang)}: {formatTime(elapsed)}
          </Text>

          <View style={styles.performanceContainer}>
            {gameState.score === gameState.questions.length && (
              <Text style={styles.performanceText}>{t('perfect', lang)}</Text>
            )}
            {gameState.score >= gameState.questions.length * 0.8 && gameState.score < gameState.questions.length && (
              <Text style={styles.performanceText}>{t('excellent', lang)}</Text>
            )}
            {gameState.score >= gameState.questions.length * 0.6 && gameState.score < gameState.questions.length * 0.8 && (
              <Text style={styles.performanceText}>{t('well_done', lang)}</Text>
            )}
            {gameState.score < gameState.questions.length * 0.6 && (
              <Text style={styles.performanceText}>{t('keep_trying', lang)}</Text>
            )}
          </View>

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
                  total: String(gameState.questions.length),
                  percent: String(percent),
                  duration: String(elapsed),
                  gameId: 'ConhecimentoSagrado',
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
    backgroundColor: '#45B7D1',
    borderRadius: 3,
  },
  questionCard: {
    backgroundColor: 'rgba(69, 183, 209, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#45B7D1',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  difficultyBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  difficultyText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  questionText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: 12,
  },
  referenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  reference: {
    color: '#b0b0b0',
    fontSize: 12,
  },
  hintBox: {
    flexDirection: 'row',
    backgroundColor: 'rgba(243, 156, 18, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignItems: 'center',
    gap: 12,
  },
  hintText: {
    color: '#F39C12',
    fontSize: 13,
    flex: 1,
    fontWeight: '500',
  },
  optionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  optionCorrect: {
    borderColor: '#27AE60',
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
  },
  optionWrong: {
    borderColor: '#E74C3C',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
  },
  optionCorrectAnswer: {
    borderColor: '#27AE60',
    backgroundColor: 'rgba(39, 174, 96, 0.15)',
  },
  optionWrongSelected: {
    borderColor: '#E74C3C',
    backgroundColor: 'rgba(231, 76, 60, 0.15)',
  },
  optionLabel: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabelActive: {
    backgroundColor: '#45B7D1',
  },
  optionLabelText: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionLabelTextActive: {
    color: '#fff',
  },
  optionText: {
    color: '#fff',
    fontSize: 15,
    flex: 1,
    fontWeight: '500',
  },
  buttonContainer: {
    gap: 12,
    marginTop: 20,
  },
  hintButton: {
    flexDirection: 'row',
    backgroundColor: 'rgba(243, 156, 18, 0.2)',
    borderWidth: 2,
    borderColor: '#F39C12',
    borderRadius: 8,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  hintButtonText: {
    color: '#F39C12',
    fontWeight: '600',
  },
  feedbackContainer: {
    marginTop: 20,
  },
  feedbackContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  feedbackCorrect: {
    borderWidth: 2,
    borderColor: '#27AE60',
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
  },
  feedbackWrong: {
    borderWidth: 2,
    borderColor: '#E74C3C',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
  },
  feedbackTextCorrect: {
    color: '#27AE60',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  feedbackTextWrong: {
    color: '#E74C3C',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  nextButton: {
    backgroundColor: '#45B7D1',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
    color: '#45B7D1',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
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
  performanceContainer: {
    marginBottom: 40,
  },
  performanceText: {
    color: '#FFD700',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
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
    backgroundColor: '#45B7D1',
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
