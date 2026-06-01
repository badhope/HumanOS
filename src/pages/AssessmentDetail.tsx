import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { mockAssessments, getQuestionsForAssessment } from '../data/mockData';
import { RESPONSE_OPTIONS, BIG_FIVE_TRAITS } from '../data/bigFiveData';
import { Question } from '../types';
import { 
  STRESS_RESPONSE_OPTIONS, 
  STRESS_LEVELS
} from '../data/stressTestData';
import { 
  GAD7_RESPONSE_OPTIONS, 
  ANXIETY_LEVELS 
} from '../data/anxietyGad7Data';
import { calculateProgress, generateBigFiveReport } from '../services/bigFiveScoring';
import { getStressLevelInfo, generateDetailedStressReport } from '../services/stressTestScoring';
import { getAnxietyLevelInfo, generateDetailedGAD7Report } from '../services/anxietyGad7Scoring';
import { exportService, shareService } from '../services/share/ExportShareService';
import { TracePanel } from '../components/TracePanel';
import { cn } from '../lib/utils';

// 介绍页面组件
function IntroPage({ onStart }: { onStart: () => void }) {
  const { currentAssessment } = useAppStore();
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);
  
  if (!currentAssessment) return null;
  
  return (
    <div className="space-y-8 text-center">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <div className="text-5xl sm:text-6xl mb-4 sm:mb-6">{currentAssessment.icon}</div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">{currentAssessment.title}</h2>
        <p className="text-base sm:text-lg text-slate-600 mb-6 sm:mb-8 max-w-2xl mx-auto">
          {currentAssessment.description}
        </p>
        
        <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">{currentAssessment.totalQuestions}</div>
            <div className="text-slate-600">{i18n.quiz.intro.questions}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">{currentAssessment.difficulty}</div>
            <div className="text-slate-600">{i18n.quiz.intro.difficulty}</div>
          </div>
          <div className="bg-slate-50 rounded-xl p-4">
            <div className="text-2xl font-bold text-blue-600">{currentAssessment.estimatedTime}</div>
            <div className="text-slate-600">{i18n.quiz.intro.estimatedTime}</div>
          </div>
        </div>
        
        {currentAssessment.id === 'big-five' && (
          <div className="bg-blue-50 rounded-xl p-6 text-left mb-8">
            <h3 className="font-semibold text-blue-800 mb-3">{i18n.assessments.title}</h3>
            <p className="text-blue-700 text-sm leading-relaxed">
              {i18n.results.bigFiveIntro}
            </p>
            <div className="mt-4 grid sm:grid-cols-5 gap-2">
              {Object.entries(BIG_FIVE_TRAITS).map(([key, trait]) => (
                <div key={key} className="bg-white rounded-lg p-2 text-center">
                  <div className="font-medium text-blue-700 text-sm">{trait.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {currentAssessment.id === 'stress-test' && (
          <div className="bg-purple-50 rounded-xl p-6 text-left mb-8">
            <h3 className="font-semibold text-purple-800 mb-3">{i18n.assessments.title}</h3>
            <p className="text-purple-700 text-sm leading-relaxed">
              {i18n.results.stressIntro}
            </p>
            <div className="mt-4 grid sm:grid-cols-3 gap-2">
              {Object.entries(STRESS_LEVELS).map(([key, level]) => (
                <div key={key} className="bg-white rounded-lg p-2 text-center">
                  <div className="font-medium text-purple-700 text-sm">{level.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {(currentAssessment.id === 'anxiety-gad7' || currentAssessment.id === '3') && (
          <div className="bg-teal-50 rounded-xl p-6 text-left mb-8">
            <h3 className="font-semibold text-teal-800 mb-3">{i18n.assessments.title}</h3>
            <p className="text-teal-700 text-sm leading-relaxed">
              {i18n.results.anxietyIntro}
            </p>
            <div className="mt-4 grid sm:grid-cols-4 gap-2">
              {Object.entries(ANXIETY_LEVELS).map(([key, level]) => (
                <div key={key} className="bg-white rounded-lg p-2 text-center">
                  <div className="font-medium text-teal-700 text-sm">{level.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div className="bg-amber-50 rounded-xl p-6 text-left mb-8">
          <h3 className="font-semibold text-amber-800 mb-2">💡 {i18n.quiz.intro.tips.title}</h3>
          <ul className="text-amber-700 text-sm space-y-1">
            <li>• {i18n.quiz.intro.tips.noRightWrong}</li>
            <li>• {i18n.quiz.intro.tips.firstInstinct}</li>
            <li>• {i18n.quiz.intro.tips.privacy}</li>
          </ul>
        </div>
        
        <button
          onClick={onStart}
          className="px-8 sm:px-12 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base sm:text-xl font-semibold rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          {i18n.quiz.finish}
        </button>
      </div>
    </div>
  );
}

// 答题页面组件
function QuizPage() {
  const {
    questions,
    currentQuestionIndex,
    answers,
    setCurrentQuestionIndex,
    setAnswer,
    calculateResult,
    currentAssessment
  } = useAppStore();
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = calculateProgress(answers, questions.length);
  const currentAnswer = answers[currentQuestion.id];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  
  // 根据测评类型选择选项
  const options = (currentAssessment?.id === 'stress-test' || currentAssessment?.id === '2') 
    ? STRESS_RESPONSE_OPTIONS 
    : (currentAssessment?.id === 'anxiety-gad7' || currentAssessment?.id === '3')
      ? GAD7_RESPONSE_OPTIONS
      : RESPONSE_OPTIONS;
  
  const handleAnswer = (value: number) => {
    setAnswer(currentQuestion.id, value);
  };
  
  const handleNext = () => {
    if (isLastQuestion) {
      const totalQuestions = questions.length;
      const answeredCount = Object.keys(answers).length;
      if (answeredCount < totalQuestions) {
        const firstUnanswered = questions.find(q => !answers[q.id]);
        if (firstUnanswered) {
          setCurrentQuestionIndex(questions.indexOf(firstUnanswered));
        }
        return;
      }
      if (currentAssessment) {
        calculateResult(currentAssessment.id, currentAssessment.title);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  const handlePrevious = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // 进度条宽度
  const progressWidth = `${progress.percentage}%`;
  
  // 根据测评类型选择标签颜色
  const tagColor = (currentAssessment?.id === 'stress-test' || currentAssessment?.id === '2')
    ? 'bg-purple-100 text-purple-700'
    : (currentAssessment?.id === 'anxiety-gad7' || currentAssessment?.id === '3')
      ? 'bg-teal-100 text-teal-700'
      : 'bg-blue-100 text-blue-700';
  
  return (
    <div className="max-w-2xl mx-auto">
      {/* 题目卡片 */}
      <div key={currentQuestion?.id} className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100 animate-slide-in">
        {/* 题号导航器 */}
        <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4 sm:mb-6 justify-center">
          {questions.map((_, idx) => {
            const qId = questions[idx].id;
            const isAnswered = !!answers[qId];
            return (
              <button
                key={idx}
                onClick={() => {
                  if (isAnswered || idx <= currentQuestionIndex + 1) {
                    setCurrentQuestionIndex(idx);
                  }
                }}
                className={cn(
                  'w-6 h-6 sm:w-7 sm:h-7 rounded text-[10px] sm:text-xs font-medium transition-all',
                  idx === currentQuestionIndex
                    ? 'bg-blue-600 text-white scale-110'
                    : isAnswered
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-400',
                  idx > currentQuestionIndex + 1 && !isAnswered && 'opacity-40 cursor-not-allowed'
                )}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>

        <div className="text-center mb-4 sm:mb-6">
          <span className="text-xs sm:text-sm font-medium text-slate-500">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
          <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 transition-all duration-500"
              style={{ width: progressWidth }}
            />
          </div>
        </div>

        <div className="text-center mb-6 sm:mb-8">
          {currentQuestion.trait && (
            <span className={cn("inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-3 sm:mb-4", tagColor)}>
              {currentQuestion.trait === 'negative' ? i18n.results.pressureFeel : 
               currentQuestion.trait === 'positive' ? i18n.results.copingAbility :
               BIG_FIVE_TRAITS[currentQuestion.trait as keyof typeof BIG_FIVE_TRAITS]?.name || 
               currentQuestion.trait}
            </span>
          )}
          <h3 className="text-lg sm:text-2xl font-bold text-slate-800 leading-relaxed">
            {currentQuestion.text}
          </h3>
        </div>
        
        {/* 选项 */}
        <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className={cn(
                "w-full p-3 sm:p-4 rounded-xl text-left transition-all border-2",
                currentAnswer === option.value
                  ? "border-blue-500 bg-blue-50 text-blue-800"
                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700"
              )}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm sm:text-base">{option.label}</span>
                <span className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center",
                  currentAnswer === option.value
                    ? "border-blue-500 bg-blue-500"
                    : "border-slate-300"
                )}>
                  {currentAnswer === option.value && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </span>
              </div>
            </button>
          ))}
        </div>
        
        {/* 导航按钮 */}
        <div className="flex gap-3 sm:gap-4">
          {!isFirstQuestion && (
            <button
              onClick={handlePrevious}
              className="flex-1 py-3 sm:py-4 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors text-sm sm:text-base"
            >
              {i18n.quiz.previous}
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={cn(
              "flex-1 py-3 sm:py-4 rounded-xl font-semibold transition-all text-sm sm:text-base",
              currentAnswer
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 shadow-lg"
                : "bg-slate-200 text-slate-400 cursor-not-allowed"
            )}
          >
            {isLastQuestion ? i18n.quiz.finish : i18n.quiz.next}
          </button>
        </div>
      </div>
    </div>
  );
}

// 大五人格详细结果组件
function BigFiveResultDetail({ 
  result,
  questions,
  answers
}: { 
  result: {
    totalScore: number;
    traits: Array<{ name: string; score: number; description: string }>;
  };
  questions?: unknown[];
  answers?: Record<string, number>;
}) {
  void { questions, answers };
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);
  
  const report = useMemo(() => generateBigFiveReport(result.traits), [result.traits]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 头部 */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full px-6 py-2 mb-4">
          <span className="font-semibold text-yellow-700">🎉 {i18n.results.completed}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">{i18n.results.yourPersonality}</h2>
        <p className="text-base sm:text-lg text-slate-600">{i18n.results.basedOnAnswers}</p>
      </div>

      {/* 综合得分 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100 text-center">
        <div className="text-5xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          {report.summary.overallScore}
        </div>
        <div className="text-slate-600 mb-4">{i18n.results.comprehensiveScore}</div>
        {report.summary.personalityType && (
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4">
            <h4 className="font-bold text-lg text-blue-800 mb-2">
              🎯 {report.summary.personalityType.typeName}
            </h4>
            <p className="text-slate-700">{report.summary.personalityType.description}</p>
          </div>
        )}
        <p className="text-lg text-slate-700 max-w-xl mx-auto leading-relaxed">
          {i18n.results.topTraitHighlight.replace('{name}', report.summary.topTraits[0].name).replace('{description}', report.summary.topTraits[0].description)}
        </p>
      </div>

      {/* T分数解释 */}
      <div className="bg-blue-50 rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-blue-100 max-w-4xl mx-auto">
        <div className="flex items-start gap-2 sm:gap-3">
          <span className="text-blue-600 text-lg sm:text-xl mt-0.5">📊</span>
          <div>
            <h4 className="font-semibold text-blue-800 mb-1 text-sm sm:text-base">{locale === 'zh' ? '关于T分数' : 'About T-Scores'}</h4>
            <p className="text-xs sm:text-sm text-blue-700 leading-relaxed">
              {locale === 'zh' 
                ? 'T分数是一种标准分，均值50、标准差10。40-60分属于正常范围，低于40或高于60分别表示该特质偏低或偏高。分数越高代表该特质越明显。'
                : 'T-score is a standardized score with a mean of 50 and standard deviation of 10. Scores between 40-60 are in the normal range; below 40 or above 60 indicate low or high tendencies respectively. Higher scores mean the trait is more pronounced.'}
            </p>
          </div>
        </div>
      </div>

      {/* 优势与盲点 */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4 text-center">💪 {i18n.results.strengths}</h3>
          <div className="space-y-2">
            {report.strengths.map((strength: string, index: number) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-green-50 rounded-xl">
                <span className="text-green-600 font-bold">✓</span>
                <p className="text-slate-700">{strength}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border border-slate-100">
          <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4 text-center">🔍 {i18n.results.blindspots}</h3>
          <div className="space-y-2">
            {report.blindSpots.map((spot: string, index: number) => (
              <div key={index} className="flex items-start gap-2 p-3 bg-amber-50 rounded-xl">
                <span className="text-amber-600 font-bold">!</span>
                <p className="text-slate-700">{spot}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 五维度详细分析 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-8 text-center">{i18n.results.fiveFactors}</h3>
        <div className="space-y-4 sm:space-y-8">
          {report.traitAnalyses.map((analysis: { 
            name: string; 
            score: number; 
            description: string; 
            fullInterpretation?: { 
              detailed?: { 
                strengths?: string[]; 
                potentialChallenges?: string[]; 
              } 
            } 
          }, index: number) => {
            if (!analysis) return null;
            
            const isHigh = analysis.score >= 60;
            const isLow = analysis.score <= 40;
            
            const colorClass = isHigh 
              ? 'from-green-400 to-emerald-500' 
              : isLow 
                ? 'from-red-400 to-rose-500' 
                : 'from-yellow-400 to-orange-500';
            
            return (
              <div key={index} className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base sm:text-lg text-slate-800">{analysis.name}</span>
                  <span className="text-lg sm:text-2xl font-bold text-slate-700">{analysis.score}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 sm:h-4">
                  <div 
                    className={cn("h-3 sm:h-4 rounded-full bg-gradient-to-r transition-all duration-1000", colorClass)}
                    style={{ width: `${Math.min(analysis.score, 100)}%` }}
                  />
                </div>
                
                {analysis.fullInterpretation?.detailed && (
                  <div className="grid md:grid-cols-2 gap-4 mt-4">
                    {analysis.fullInterpretation.detailed.strengths && (
                      <div className="bg-green-50 rounded-xl p-4">
                        <h5 className="font-semibold text-green-800 mb-2">{i18n.results.strengthsDisplay}</h5>
                        <ul className="text-sm text-slate-700 space-y-1">
                          {analysis.fullInterpretation.detailed.strengths.slice(0, 3).map((s: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-green-600 mt-0.5">•</span>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {analysis.fullInterpretation.detailed.potentialChallenges && (
                      <div className="bg-amber-50 rounded-xl p-4">
                        <h5 className="font-semibold text-amber-800 mb-2">{i18n.results.attentionNeeded}</h5>
                        <ul className="text-sm text-slate-700 space-y-1">
                          {analysis.fullInterpretation.detailed.potentialChallenges.slice(0, 3).map((c: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-600 mt-0.5">•</span>
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <p className="text-slate-600">{analysis.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 职业推荐 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">💼 {i18n.results.career}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {report.recommendations.career.map((career: string, index: number) => (
            <div key={index} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-2 sm:p-3 text-center">
              <span className="font-medium text-blue-800 text-xs sm:text-base">{career}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 个人成长建议 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">🌱 {i18n.results.personalGrowth}</h3>
        <div className="space-y-3">
          {report.recommendations.personalGrowth.map((tip: string, index: number) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-blue-50 rounded-xl">
              <span className="text-blue-600 font-bold shrink-0">→</span>
              <p className="text-sm sm:text-base text-slate-700">{tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 压力测试详细结果组件
function StressTestResultDetail({ 
  result, 
  questions, 
  answers 
}: { 
  result: {
    totalScore: number;
    traits: Array<{ name: string; score: number; description: string }>;
  };
  questions: Question[];
  answers: Record<string, number>;
}) {
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);
  
  const report = useMemo(() => generateDetailedStressReport(answers, questions), [answers, questions]);
  const stressLevelInfo = getStressLevelInfo(result.totalScore);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 头部 */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full px-6 py-2 mb-4">
          <span className="font-semibold text-blue-700">🎉 {i18n.results.completed}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">{i18n.results.yourStress}</h2>
        <p className="text-base sm:text-lg text-slate-600">{i18n.results.basedOnAnswers}</p>
      </div>

      {/* 压力水平总体评估 */}
      <div className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border-2 ${stressLevelInfo.color === 'green' ? 'border-green-200' : stressLevelInfo.color === 'yellow' ? 'border-yellow-200' : stressLevelInfo.color === 'orange' ? 'border-orange-200' : 'border-red-200'}`}>
        <div className="text-center">
          <div className="text-4xl sm:text-6xl font-bold mb-2" style={{ color: stressLevelInfo.color === 'green' ? '#10b981' : stressLevelInfo.color === 'yellow' ? '#f59e0b' : stressLevelInfo.color === 'orange' ? '#f97316' : '#ef4444' }}>
            {report.summary.score}
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2">{report.summary.title}</h3>
          <p className="text-sm sm:text-lg text-slate-600 mb-4">{report.summary.description}</p>
        </div>
      </div>

      {/* 详细表现分析 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100 mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">📊 {i18n.results.stressSigns}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {report.detailedAnalysis.signs.physicalSigns && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h5 className="font-semibold text-blue-800 mb-3">🏃 {i18n.results.physicalSymptoms}</h5>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.detailedAnalysis.signs.physicalSigns.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {report.detailedAnalysis.signs.emotionalSigns && (
            <div className="bg-purple-50 rounded-xl p-4">
              <h5 className="font-semibold text-purple-800 mb-3">💭 {i18n.results.emotionalSymptoms}</h5>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.detailedAnalysis.signs.emotionalSigns.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-purple-600 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {report.detailedAnalysis.signs.cognitiveSigns && (
            <div className="bg-green-50 rounded-xl p-4">
              <h5 className="font-semibold text-green-800 mb-3">🧠 {i18n.results.cognitiveSymptoms}</h5>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.detailedAnalysis.signs.cognitiveSigns.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 三维度分析 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-8 text-center">{i18n.results.traits}</h3>
        <div className="space-y-4 sm:space-y-6">
          {result.traits.map((trait: { name: string; score: number; description: string }, index: number) => {
            let colorClass = 'from-green-400 to-emerald-500';
            if (trait.name === '压力水平' || trait.name === '总体压力水平') {
              colorClass = trait.score <= 30 ? 'from-green-400 to-emerald-500' :
                          trait.score <= 60 ? 'from-yellow-400 to-orange-500' :
                          trait.score <= 90 ? 'from-orange-400 to-rose-500' :
                          'from-red-400 to-rose-600';
            } else if (trait.name === '压力感受' || trait.name === '工作压力' || trait.name === '关系压力' || trait.name === '健康压力' || trait.name === '财务压力') {
              colorClass = trait.score >= 50 ? 'from-yellow-400 to-orange-500' : 'from-green-400 to-emerald-500';
            } else if (trait.name === '应对能力') {
              colorClass = trait.score >= 50 ? 'from-green-400 to-emerald-500' : 'from-yellow-400 to-orange-500';
            }
            
            return (
              <div key={index} className="space-y-3 sm:space-y-4 pb-4 sm:pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-base sm:text-lg text-slate-800">{trait.name}</span>
                  <span className="text-lg sm:text-2xl font-bold text-slate-700">{trait.score}</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 sm:h-4">
                  <div 
                    className={cn("h-3 sm:h-4 rounded-full bg-gradient-to-r transition-all duration-1000", colorClass)}
                    style={{ 
                      width: trait.name === '总体压力水平' 
                        ? `${Math.min(trait.score / 1.2, 100)}%` 
                        : `${Math.min(trait.score, 100)}%` 
                    }}
                  />
                </div>
                <p className="text-slate-600">{trait.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 应对策略 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">🛠️ {i18n.results.strategies}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-3">{i18n.results.problemFocused}</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              {report.recommendations.strategies.problemFocused.map((s: { name: string; description: string }, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  {s.name}: {s.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <h4 className="font-semibold text-purple-800 mb-3">{i18n.results.emotionFocused}</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              {report.recommendations.strategies.emotionFocused.map((s: { name: string; description: string }, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-purple-600 mt-0.5">•</span>
                  {s.name}: {s.description}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-50 rounded-xl p-4">
            <h4 className="font-semibold text-amber-800 mb-3">{i18n.results.avoidanceStrategy}</h4>
            <ul className="text-sm text-slate-700 space-y-2">
              {report.recommendations.strategies.avoidance.map((s: { name: string; description: string }, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-amber-600 mt-0.5">•</span>
                  {s.name}: {s.description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 主要压力维度分析 */}
      {report.detailedAnalysis.topDimensions && report.detailedAnalysis.topDimensions.length > 0 && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">📌 {i18n.results.mainStressDimension}</h3>
          <div className="space-y-4">
            {report.detailedAnalysis.topDimensions.map((dim: { dimension: string; info?: { name: string; description: string; tips: string[] }; score: number }, i: number) => (
              <div key={i} className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-5 border-l-4 border-blue-500">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <h4 className="font-bold text-base sm:text-lg text-blue-800">{dim.info?.name || dim.dimension}</h4>
                  <span className="px-2 sm:px-3 py-1 bg-blue-200 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">{dim.score} 分</span>
                </div>
                {dim.info?.description && (
                  <p className="text-slate-700 mb-3 text-sm">{dim.info.description}</p>
                )}
                {dim.info?.tips && dim.info.tips.length > 0 && (
                  <div>
                    <h5 className="font-semibold text-slate-700 mb-2">💡 {i18n.results.suggestions}：</h5>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {dim.info.tips.map((tip: string, j: number) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 健康习惯 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">🌿 {i18n.results.healthHabits}</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">😴 {i18n.results.sleep}</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
              {report.recommendations.healthyHabits.sleep.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">🥗 {i18n.results.diet}</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
              {report.recommendations.healthyHabits.nutrition.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">🏃 {i18n.results.exercise}</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
              {report.recommendations.healthyHabits.movement.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">👫 {i18n.results.social}</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
              {report.recommendations.healthyHabits.social.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// GAD-7焦虑测试详细结果组件
function GAD7ResultDetail({ 
  result, 
  questions, 
  answers 
}: { 
  result: {
    totalScore: number;
    traits: Array<{ name: string; score: number; description: string }>;
  };
  questions: Question[];
  answers: Record<string, number>;
}) {
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);
  
  const report = useMemo(() => generateDetailedGAD7Report(answers, questions), [answers, questions]);
  const anxietyLevelInfo = getAnxietyLevelInfo(result.totalScore);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* 头部 */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-teal-100 to-cyan-100 rounded-full px-6 py-2 mb-4">
          <span className="font-semibold text-teal-700">🎉 {i18n.results.completed}</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3 sm:mb-4">{i18n.results.yourAnxiety}</h2>
        <p className="text-base sm:text-lg text-slate-600">{i18n.results.basedOnAnswers}</p>
      </div>

      {/* 焦虑水平总体评估 */}
      <div className={`bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border-2 ${anxietyLevelInfo.color === 'green' ? 'border-green-200' : anxietyLevelInfo.color === 'yellow' ? 'border-yellow-200' : anxietyLevelInfo.color === 'orange' ? 'border-orange-200' : 'border-red-200'}`}>
        <div className="text-center">
          <div className="text-4xl sm:text-6xl font-bold mb-2" style={{ color: anxietyLevelInfo.color === 'green' ? '#10b981' : anxietyLevelInfo.color === 'yellow' ? '#f59e0b' : anxietyLevelInfo.color === 'orange' ? '#f97316' : '#ef4444' }}>
            {report.summary.score}
          </div>
          <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2">{report.summary.title}</h3>
          <p className="text-sm sm:text-lg text-slate-600 mb-4">{report.summary.description}</p>
        </div>
      </div>

      {/* 主要症状分析 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">📊 {i18n.results.anxietySigns}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {report.detailedAnalysis.signs.physicalSigns && (
            <div className="bg-teal-50 rounded-xl p-4">
              <h5 className="font-semibold text-teal-800 mb-3">🏃 {i18n.results.physicalSymptoms}</h5>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.detailedAnalysis.signs.physicalSigns.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-teal-600 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {report.detailedAnalysis.signs.emotionalSigns && (
            <div className="bg-cyan-50 rounded-xl p-4">
              <h5 className="font-semibold text-cyan-800 mb-3">💭 {i18n.results.emotionalSymptoms}</h5>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.detailedAnalysis.signs.emotionalSigns.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-cyan-600 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {report.detailedAnalysis.signs.cognitiveSigns && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h5 className="font-semibold text-blue-800 mb-3">🧠 {i18n.results.cognitiveSymptoms}</h5>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.detailedAnalysis.signs.cognitiveSigns.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 主要症状提示 */}
      {report.detailedAnalysis.primarySymptom && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">🔍 {i18n.results.mainSymptomType}</h3>
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-teal-100 to-cyan-100 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <p className="text-base sm:text-xl font-semibold text-teal-800">{report.detailedAnalysis.primarySymptom}</p>
            </div>
          </div>
        </div>
      )}

      {/* 应对策略 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">🛠️ {i18n.results.strategies}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
          {report.recommendations.immediate && (
            <div className="bg-red-50 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-3">⚡ {i18n.results.immediateAction}</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                {Array.isArray(report.recommendations.immediate) 
                  ? report.recommendations.immediate.map((s: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-red-600 mt-0.5">•</span>
                      {s}
                    </li>
                  ))
                  : null
                }
              </ul>
            </div>
          )}
          {report.recommendations.cognitive && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h4 className="font-semibold text-blue-800 mb-3">💭 {i18n.results.cognitiveAdjustment}</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.recommendations.cognitive.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {report.recommendations.lifestyle && (
            <div className="bg-green-50 rounded-xl p-4">
              <h4 className="font-semibold text-green-800 mb-3">🌿 {i18n.results.lifestyleAdjustment}</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.recommendations.lifestyle.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* 放松技术 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">🧘 {i18n.results.relaxation}</h3>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-green-50 rounded-xl p-4">
            <h4 className="font-semibold text-green-800 mb-2">🌬️ {i18n.results.breathingExercise}</h4>
            <p className="text-sm text-slate-700">{(report.recommendations.relaxation.breathing as { name: string; description: string }).name}: {(report.recommendations.relaxation.breathing as { name: string; description: string }).description}</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4">
            <h4 className="font-semibold text-blue-800 mb-2">🤸 {i18n.results.bodyRelaxation}</h4>
            <p className="text-sm text-slate-700">{(report.recommendations.relaxation.muscle as { name: string; description: string }).name}: {(report.recommendations.relaxation.muscle as { name: string; description: string }).description}</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-4">
            <h4 className="font-semibold text-purple-800 mb-2">🧠 {i18n.results.mentalAdjustment}</h4>
            <p className="text-sm text-slate-700">{(report.recommendations.relaxation.mindfulness as { name: string; description: string }).name}: {(report.recommendations.relaxation.mindfulness as { name: string; description: string }).description}</p>
          </div>
        </div>
      </div>

      {/* 健康习惯 */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">🌿 {i18n.results.healthHabits}</h3>
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-amber-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-amber-800 mb-2 text-sm sm:text-base">😴 {i18n.results.sleep}</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
              {report.recommendations.healthyHabits.sleep.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
          <div className="bg-green-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-green-800 mb-2 text-sm sm:text-base">🥗 {i18n.results.diet}</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
              {report.recommendations.healthyHabits.nutrition.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
          <div className="bg-blue-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">🏃 {i18n.results.exercise}</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
              {report.recommendations.healthyHabits.movement.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 sm:p-4">
            <h4 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">👫 {i18n.results.social}</h4>
            <ul className="text-xs sm:text-sm text-slate-700 space-y-1">
              {report.recommendations.healthyHabits.connection.map((h: string, i: number) => (
                <li key={i}>• {h}</li>
              ))}
            </ul>
          </div>
          </div>
      </div>

      {/* 专业资源 */}
      {report.resources.professional && (
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-lg border border-slate-100 border-l-4 border-l-red-400">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-4 sm:mb-6 text-center">🆘 {i18n.results.professionalResources}</h3>
          <div className="space-y-4">
            <div className="bg-red-50 rounded-xl p-4">
              <h4 className="font-semibold text-red-800 mb-2">{i18n.results.seekProfessionalHelp}</h4>
              <ul className="text-sm text-slate-700 space-y-2">
                {report.resources.professional.map((r: string, i: number) => (
                  <li key={i}>• {r}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// 结果页面主组件
function ResultPage() {
  const { result, resetAssessment, currentAssessment, questions, answers } = useAppStore();
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);
  
  const [showTracePanel, setShowTracePanel] = useState(false);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  if (!result) return null;
  
  const isStressTest = currentAssessment?.id === 'stress-test' || currentAssessment?.id === '2';
  const isGAD7 = currentAssessment?.id === 'anxiety-gad7' || currentAssessment?.id === '3';
  
  // 类型断言
  const displayResult = result as { 
    id: string;
    totalScore: number; 
    traits: Array<{ name: string; score: number; description: string }>;
    title?: string;
    assessmentId?: string;
    timestamp?: number;
    report?: any;
    rawAnswers?: Record<string, number>;
  };
  const displayQuestions = questions as Question[];

  const handleExport = async (format: 'pdf' | 'markdown' | 'text' | 'json') => {
    try {
      await exportService.download(displayResult, format);
      setShowExportMenu(false);
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  const handleShare = async () => {
    try {
      const url = await shareService.createShareLink(displayResult);
      setShareUrl(url);
    } catch (error) {
      console.error('Share failed:', error);
    }
  };

  const copyShareUrl = () => {
    if (shareUrl) {
      navigator.clipboard.writeText(shareUrl);
      alert(i18n.results.linkCopied);
    }
  };
  
  return (
    <div className="pb-12">
      {isGAD7 ? (
        <GAD7ResultDetail result={displayResult} questions={displayQuestions} answers={answers} />
      ) : isStressTest ? (
        <StressTestResultDetail result={displayResult} questions={displayQuestions} answers={answers} />
      ) : (
        <BigFiveResultDetail result={displayResult} questions={displayQuestions} answers={answers} />
      )}
      
      {/* 操作工具栏 */}
      <div className="max-w-4xl mx-auto mt-8 sm:mt-12">
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-slate-200">
          <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">📋 {i18n.results.reportActions}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* 导出按钮 */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                className="w-full py-2.5 sm:py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-sm"
              >
                📥 {i18n.results.export}
              </button>
              {showExportMenu && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 z-10 overflow-hidden">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <span>📄</span> {i18n.results.pdfFormat}
                  </button>
                  <button
                    onClick={() => handleExport('markdown')}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <span>📝</span> {i18n.results.markdownFormat}
                  </button>
                  <button
                    onClick={() => handleExport('text')}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <span>📃</span> {i18n.results.textFormat}
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="w-full px-4 py-3 text-left hover:bg-slate-50 transition-colors flex items-center gap-2"
                  >
                    <span>📊</span> {i18n.results.jsonFormat}
                  </button>
                </div>
              )}
            </div>

            {/* 分享按钮 */}
            <button
              onClick={handleShare}
              className="w-full py-2.5 sm:py-3 bg-green-100 text-green-700 rounded-xl font-semibold hover:bg-green-200 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-sm"
            >
              🔗 {i18n.results.share}
            </button>

            {/* 溯源按钮 */}
            <button
              onClick={() => setShowTracePanel(true)}
              className="w-full py-2.5 sm:py-3 bg-purple-100 text-purple-700 rounded-xl font-semibold hover:bg-purple-200 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-sm"
            >
              🔍 {i18n.results.trace}
            </button>

            {/* 训练推荐 */}
            <Link
              to="/training"
              className="w-full py-2.5 sm:py-3 bg-orange-100 text-orange-700 rounded-xl font-semibold hover:bg-orange-200 transition-colors flex items-center justify-center gap-1.5 sm:gap-2 text-center text-sm"
            >
              💪 {i18n.nav.training}
            </Link>
          </div>

          {/* 分享链接显示 */}
          {shareUrl && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center gap-3">
                <span className="text-green-700 font-medium">{i18n.results.shareLink}</span>
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 bg-white border border-green-300 rounded-lg text-sm text-slate-700"
                />
                <button
                  onClick={copyShareUrl}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  {i18n.results.copy}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 行动按钮 */}
      <div className="max-w-4xl mx-auto mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          to="/assessments"
          onClick={resetAssessment}
          className="flex-1 py-3 sm:py-4 bg-white text-blue-600 border-2 border-blue-200 rounded-xl font-semibold hover:bg-blue-50 transition-colors text-center text-sm sm:text-base"
        >
          {i18n.results.retake}
        </Link>
        <Link
          to="/history"
          className="flex-1 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all text-center shadow-lg text-sm sm:text-base"
        >
          {i18n.results.viewHistory}
        </Link>
      </div>

      {/* 溯源面板 */}
      {showTracePanel && (
        <TracePanel
          assessmentId={displayResult.id || currentAssessment?.id || 'unknown'}
          onClose={() => setShowTracePanel(false)}
        />
      )}
    </div>
  );
}

export default function AssessmentDetail() {
  const { id } = useParams();
  const {
    currentStep,
    setCurrentStep,
    setCurrentAssessment,
    setQuestions,
    resetAssessment,
    assessments,
    setAssessments
  } = useAppStore();
  
  // 初始化数据
  useEffect(() => {
    if (assessments.length === 0) {
      setAssessments(mockAssessments);
    }
    
    if (id) {
      const assessment = mockAssessments.find(a => a.id === id) || mockAssessments[0];
      setCurrentAssessment(assessment);
      
      const questions = getQuestionsForAssessment(id);
      setQuestions(questions);
      
      resetAssessment();
    }
  }, [id, assessments.length, setAssessments, setCurrentAssessment, setQuestions, resetAssessment]);
  
  const handleStart = () => {
    setCurrentStep('quiz');
  };
  
  // 根据步骤渲染对应页面
  const renderStep = () => {
    switch (currentStep) {
      case 'intro':
        return <IntroPage onStart={handleStart} />;
      case 'quiz':
        return <QuizPage />;
      case 'result':
        return <ResultPage />;
      default:
        return <IntroPage onStart={handleStart} />;
    }
  };
  
  return renderStep();
}
