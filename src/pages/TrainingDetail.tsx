import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { trainingService } from '../services/training';
import { Training as TrainingType, TrainingSession, TRAINING_CATEGORIES } from '../types/training';
import { useAppStore } from '../store';
import { getTranslation, t } from '../i18n';

const DIFFICULTY_COLORS = {
  beginner: 'bg-green-100 text-green-700',
  intermediate: 'bg-yellow-100 text-yellow-700',
  advanced: 'bg-red-100 text-red-700'
};

const STEP_TYPE_ICONS = {
  instruction: '📖',
  exercise: '🏃',
  meditation: '🧘',
  reflection: '💭',
  cognitive: '🧠',
  mindfulness: '🌸'
};

export default function TrainingDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const locale = useAppStore((state) => state.locale);
  const i18n = getTranslation(locale);
  const [training, setTraining] = useState<TrainingType | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [session, setSession] = useState<TrainingSession | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    if (id) {
      const t = trainingService.getTrainingById(id);
      if (t) {
        setTraining(t);
      } else {
        navigate('/training');
      }
    }
  }, [id, navigate]);

  const startTraining = () => {
    if (!training) return;
    const newSession = trainingService.startTraining(training.id);
    setSession(newSession);
    setCurrentStep(0);
    setIsPlaying(true);
    if (training.steps[0].duration) {
      setTimer(training.steps[0].duration);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timer > 0) {
      interval = setInterval(() => {
        setTimer(t => t - 1);
      }, 1000);
    } else if (isPlaying && timer === 0 && training) {
      if (currentStep < training.steps.length - 1) {
        nextStep();
      } else {
        setIsPlaying(false);
        setShowComplete(true);
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, timer, currentStep, training]);

  const nextStep = () => {
    if (!training) return;
    const next = currentStep + 1;
    if (next < training.steps.length) {
      setCurrentStep(next);
      if (training.steps[next].duration) {
        setTimer(training.steps[next].duration);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      if (training?.steps[currentStep - 1].duration) {
        setTimer(training.steps[currentStep - 1].duration);
      }
    }
  };

  const completeTraining = () => {
    if (session) {
      trainingService.completeSession(session.id, rating || undefined, feedback || undefined);
      navigate('/training');
    }
  };

  if (!training) return null;

  const categoryInfo = TRAINING_CATEGORIES.find(c => c.category === training.category);
  const currentStepData = training.steps[currentStep];
  const progress = ((currentStep + 1) / training.steps.length) * 100;

  if (session && showComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">{i18n.results.trainingComplete}</h1>
          <p className="text-slate-600 mb-6">{i18n.results.greatJob}</p>
          
          <div className="mb-6">
            <p className="text-sm text-slate-600 mb-2">{i18n.results.rateTraining}</p>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-4xl transition-transform hover:scale-110 ${
                    star <= rating ? 'text-yellow-400' : 'text-slate-300'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder={i18n.results.feedback}
              className="w-full p-4 border border-slate-200 rounded-xl resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={completeTraining}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all"
          >
            {i18n.results.complete}
          </button>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-600 mb-2">
            <span>{t(locale, 'results.step', { current: currentStep + 1, total: training.steps.length })}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200 text-center">
          <div className="text-6xl mb-4">
            {STEP_TYPE_ICONS[currentStepData.type as keyof typeof STEP_TYPE_ICONS] || '📝'}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-3">{currentStepData.title}</h2>
          <p className="text-slate-600 text-lg mb-6">{currentStepData.description}</p>
          
          {currentStepData.duration && (
            <div className="text-5xl font-mono font-bold text-blue-600 mb-6">
              {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
            </div>
          )}

          <div className="flex gap-4 justify-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-semibold hover:bg-slate-200 transition-all disabled:opacity-50"
            >
              {i18n.quiz.previous}
            </button>
            
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-8 py-3 rounded-xl font-semibold transition-all ${
                isPlaying
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
            >
              {isPlaying ? i18n.results.pause : i18n.results.continue}
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === training.steps.length - 1}
              className="px-6 py-3 bg-blue-100 text-blue-700 rounded-xl font-semibold hover:bg-blue-200 transition-all disabled:opacity-50"
            >
              {i18n.results.nextStep}
            </button>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {training.steps.map((step, idx) => (
            <div
              key={step.id}
              className={`p-4 rounded-xl border transition-all ${
                idx === currentStep
                  ? 'bg-blue-50 border-blue-300'
                  : idx < currentStep
                  ? 'bg-green-50 border-green-200'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {idx < currentStep ? '✅' : idx === currentStep ? '🎯' : '⏳'}
                </span>
                <div>
                  <div className={`font-medium ${idx === currentStep ? 'text-blue-700' : 'text-slate-700'}`}>
                    {step.title}
                  </div>
                  {step.duration && (
                    <div className="text-xs text-slate-500">{step.duration}s</div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/training')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
      >
        ← {i18n.common.return} {i18n.training.title}
      </button>

      <div className="bg-white rounded-3xl p-8 shadow-lg border border-slate-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-6xl">{categoryInfo?.icon || '🧘'}</span>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{training.title}</h1>
              <p className="text-slate-600">{categoryInfo?.name}</p>
            </div>
          </div>
          <span className={`px-4 py-2 rounded-full text-sm font-medium ${DIFFICULTY_COLORS[training.difficulty]}`}>
            {i18n.training[training.difficulty as 'beginner' | 'intermediate' | 'advanced']}
          </span>
        </div>

        <p className="text-slate-700 text-lg mb-6">{training.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">⏱️</div>
            <div className="text-sm text-slate-600">{training.estimatedTime}</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-purple-600">{training.steps.length}</div>
            <div className="text-sm text-slate-600">{i18n.training.steps}</div>
          </div>
          <div className="text-center p-4 bg-slate-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">⭐</div>
            <div className="text-sm text-slate-600">
              {training.effectivenessScore ? `${training.effectivenessScore}${i18n.training.effectiveness}` : i18n.training.completed}
            </div>
          </div>
        </div>

        <button
          onClick={startTraining}
          className="w-full py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold text-lg hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
        >
          {i18n.training.start}
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">{i18n.training.benefits}</h2>
        <div className="grid gap-3">
          {training.benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span className="text-green-500">✓</span>
              <span className="text-slate-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">
        <h2 className="text-lg font-semibold text-yellow-800 mb-4">💡 {i18n.training.tips}</h2>
        <div className="space-y-2">
          {training.tips.map((tip, idx) => (
            <p key={idx} className="text-yellow-700">• {tip}</p>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-4">{i18n.training.stepPreview}</h2>
        <div className="space-y-4">
          {training.steps.map((step, idx) => (
            <div key={step.id} className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-semibold text-sm">
                {idx + 1}
              </div>
              <div>
                <h3 className="font-medium text-slate-800">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
                {step.duration && (
                  <span className="text-xs text-slate-400 mt-1 block">{step.duration}s</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
