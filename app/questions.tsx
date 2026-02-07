import { getMultipleQuestions, type BibleQuestion } from '@/constants/BibleQuestions';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
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
  userAnswer: string;
  isCorrect: boolean;
  showHint: boolean;
  hintsUsed: number;
}

export default function QuestionsGameScreen() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const questions = getMultipleQuestions(40);
    return {
      questions,
      currentQuestionIndex: 0,
      score: 0,
      answered: false,
      userAnswer: '',
      isCorrect: false,
      showHint: false,
      hintsUsed: 0,
    };
  });

  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  const checkAnswer = () => {
    if (!gameState.userAnswer.trim()) {
      Vibration.vibrate(200);
      return;
    }

    const userAnswerLower = gameState.userAnswer.toLowerCase().trim();
    const correctAnswerLower = currentQuestion.answer.toLowerCase();
    const isCorrect = userAnswerLower.includes(correctAnswerLower.split('/')[0].trim());

    Vibration.vibrate(isCorrect ? [100, 50, 100] : 200);

    setGameState(prev => ({
      ...prev,
      answered: true,
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
      // Game over
      return;
    }

    fadeAnim.setValue(0);

    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      answered: false,
      userAnswer: '',
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
    const questions = getMultipleQuestions(40);
    setGameState({
      questions,
      currentQuestionIndex: 0,
      score: 0,
      answered: false,
      userAnswer: '',
      isCorrect: false,
      showHint: false,
      hintsUsed: 0,
    });
  };

  const isGameOver = gameState.currentQuestionIndex >= gameState.questions.length;
  const difficultyColor = {
    easy: '#27AE60',
    medium: '#F39C12',
    hard: '#E74C3C',
  }[currentQuestion?.difficulty || 'easy'];

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
          <Text style={styles.scoreLabel}>Score: {gameState.score}</Text>
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
            <View style={[styles.difficultyBadge, { backgroundColor: difficultyColor }]}>
              <Text style={styles.difficultyText}>
                {currentQuestion.difficulty === 'easy' ? 'Fácil' : 
                 currentQuestion.difficulty === 'medium' ? 'Médio' : 'Difícil'}
              </Text>
            </View>

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

          <View style={styles.answerContainer}>
            <Text style={styles.answerLabel}>Sua Resposta:</Text>
            <TextInput
              style={[
                styles.answerInput,
                gameState.answered && (
                  gameState.isCorrect ? styles.inputCorrect : styles.inputWrong
                ),
              ]}
              placeholder="Digite sua resposta..."
              placeholderTextColor="#606060"
              value={gameState.userAnswer}
              onChangeText={text => setGameState(prev => ({ ...prev, userAnswer: text }))}
              editable={!gameState.answered}
            />
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
              
              <TouchableOpacity style={styles.submitButton} onPress={checkAnswer}>
                <Text style={styles.submitButtonText}>Verificar Resposta</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.feedbackContainer}>
              <View style={[
                styles.feedbackContent,
                gameState.isCorrect ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}>
                {gameState.isCorrect ? (
                  <MaterialCommunityIcons name="check-circle-outline" size={40} color="#27AE60" />
                ) : (
                  <MaterialCommunityIcons name="close-circle-outline" size={40} color="#E74C3C" />
                )}
                <Text style={gameState.isCorrect ? styles.feedbackTextCorrect : styles.feedbackTextWrong}>
                  {gameState.isCorrect ? 'Resposta Correta!' : 'Incorreto!'}
                </Text>
                {!gameState.isCorrect && (
                  <View style={styles.correctAnswerContainer}>
                    <Text style={styles.correctAnswerLabel}>Resposta Correta:</Text>
                    <Text style={styles.correctAnswer}>{currentQuestion.answer}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                <Text style={styles.nextButtonText}>Próxima Pergunta →</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      ) : (
        <View style={styles.gameOverContainer}>
          <MaterialCommunityIcons name="trophy" size={80} color="#FFD700" />
          <Text style={styles.gameOverTitle}>Quiz Completo!</Text>
          <Text style={styles.gameOverScore}>
            Você acertou {gameState.score} de {gameState.questions.length}
          </Text>
          <Text style={styles.gameOverPercentage}>
            ({Math.round((gameState.score / gameState.questions.length) * 100)}%)
          </Text>

          <View style={styles.performanceContainer}>
            {gameState.score === gameState.questions.length && (
              <Text style={styles.performanceText}>🌟 Perfeito! Você é um expert bíblico!</Text>
            )}
            {gameState.score >= gameState.questions.length * 0.8 && gameState.score < gameState.questions.length && (
              <Text style={styles.performanceText}>👏 Excelente! Muito bom!</Text>
            )}
            {gameState.score >= gameState.questions.length * 0.6 && gameState.score < gameState.questions.length * 0.8 && (
              <Text style={styles.performanceText}>👍 Bem feito! Continue estudando!</Text>
            )}
            {gameState.score < gameState.questions.length * 0.6 && (
              <Text style={styles.performanceText}>💪 Não desista! Tente novamente!</Text>
            )}
          </View>

          <View style={styles.gameOverButtons}>
            <TouchableOpacity
              style={[styles.gameOverButton, styles.restartButton]}
              onPress={restartGame}
            >
              <MaterialCommunityIcons name="refresh" size={20} color="#fff" />
              <Text style={styles.gameOverButtonText}>Jogar Novamente</Text>
            </TouchableOpacity>

            <Link href="/" asChild>
              <TouchableOpacity style={[styles.gameOverButton, styles.homeButton]}>
                <MaterialCommunityIcons name="home" size={20} color="#1a1a2e" />
                <Text style={[styles.gameOverButtonText, { color: '#1a1a2e' }]}>
                  Voltar ao Menu
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
  questionCard: {
    backgroundColor: 'rgba(255, 107, 107, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
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
  answerContainer: {
    marginBottom: 20,
  },
  answerLabel: {
    color: '#b0b0b0',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  answerInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 8,
    color: '#fff',
    padding: 12,
    fontSize: 16,
    minHeight: 40,
  },
  inputCorrect: {
    borderColor: '#27AE60',
    backgroundColor: 'rgba(39, 174, 96, 0.1)',
  },
  inputWrong: {
    borderColor: '#E74C3C',
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
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
  submitButton: {
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  correctAnswerContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
    alignItems: 'center',
  },
  correctAnswerLabel: {
    color: '#b0b0b0',
    fontSize: 12,
    marginBottom: 8,
  },
  correctAnswer: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
  nextButton: {
    backgroundColor: '#FF6B6B',
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
    color: '#FF6B6B',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
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
