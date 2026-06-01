import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Assessment } from '../types';
import { mockAssessments } from '../data/mockData';
import { useAppStore } from '../store';
import { getTranslation, t } from '../i18n';
import { DailyTips } from '../components/DailyTips';
import { SlideUp, StaggerContainer, StaggerItem, AnimatedCard } from '../components/animations/AnimatedComponents';

const features = [
  { icon: '📊', key: 'scientific' },
  { icon: '🎯', key: 'precise' },
  { icon: '🚀', key: 'guidance' }
];

export const Home = () => {
  const { setAssessments, assessments, locale } = useAppStore();
  const i18n = getTranslation(locale);
  
  useEffect(() => {
    setAssessments(mockAssessments);
  }, [setAssessments]);

  return (
    <div className="space-y-10 sm:space-y-16">
      <section className="text-center py-10 sm:py-16">
        <SlideUp>
          <div className="mb-6 sm:mb-8">
            <motion.div
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-100 text-blue-700 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
            >
              <span>✨</span>
              {i18n.home.badge}
            </motion.div>
          </div>
        </SlideUp>
        <SlideUp delay={0.15}>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 sm:mb-6 leading-tight">
            {i18n.home.title}
            <motion.span
              className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block"
              initial={{ backgroundPosition: '200% 0' }}
              animate={{ backgroundPosition: '0% 0' }}
              transition={{ duration: 1.5, delay: 0.3, ease: 'easeOut' }}
            >
              {i18n.home.subtitle}
            </motion.span>
          </h1>
        </SlideUp>
        <SlideUp delay={0.25}>
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
            {i18n.home.description}
          </p>
        </SlideUp>
        <SlideUp delay={0.35}>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/assessments"
                className="inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-base sm:text-lg font-semibold rounded-2xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-xl hover:shadow-2xl"
              >
                {i18n.home.getStarted}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </SlideUp>
      </section>

      <section>
        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, idx) => {
            const featureData = i18n.home.features[feature.key as 'scientific' | 'precise' | 'guidance'];
            return (
              <StaggerItem key={idx}>
                <motion.div
                  className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-100 hover:shadow-2xl"
                  whileHover={{ y: -6, borderColor: '#93c5fd' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <motion.div
                    className="text-3xl sm:text-4xl mb-3 sm:mb-4"
                    whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">
                    {featureData.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600">
                    {featureData.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </section>

      <section>
        <SlideUp>
          <div className="flex items-center justify-between mb-6 sm:mb-10">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-1 sm:mb-2">{i18n.home.hotAssessments}</h2>
              <p className="text-sm sm:text-base text-slate-600">{i18n.home.selectAssessment}</p>
            </div>
            <Link to="/assessments" className="text-blue-600 font-medium hover:text-blue-700 flex items-center gap-1 sm:gap-2 text-sm">
              {i18n.home.viewAll} <span>→</span>
            </Link>
          </div>
        </SlideUp>

        <StaggerContainer className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {assessments.slice(0, 3).map((assessment, idx) => (
            <StaggerItem key={assessment.id}>
              <AssessmentCard assessment={assessment} i18n={i18n} locale={locale} delay={idx * 0.1} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      <SlideUp>
        <section className="bg-gradient-to-br from-white to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-10 shadow-lg border border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-xl sm:text-3xl font-bold text-slate-800 mb-4 sm:mb-6">{i18n.home.aboutAssessment.title}</h2>
            <p className="text-sm sm:text-lg text-slate-600 leading-relaxed mb-6 sm:mb-8">
              {i18n.home.aboutAssessment.description}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-slate-500">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span>✓</span>
                {i18n.home.aboutAssessment.scientific}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span>✓</span>
                {i18n.home.aboutAssessment.professional}
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span>✓</span>
                {i18n.home.aboutAssessment.privacy}
              </div>
            </div>
          </div>
        </section>
      </SlideUp>

      <section>
        <DailyTips />
      </section>

      <section>
        <SlideUp>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6">{i18n.home.moreFeatures}</h2>
        </SlideUp>
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { to: '/mood', icon: '😊', label: i18n.home.quickLinks.mood, border: 'hover:border-blue-200' },
            { to: '/achievements', icon: '🏆', label: i18n.home.quickLinks.achievements, border: 'hover:border-purple-200' },
            { to: '/compare', icon: '📊', label: i18n.home.quickLinks.compare, border: 'hover:border-teal-200' },
            { to: '/crisis', icon: '🆘', label: i18n.home.quickLinks.crisis, border: 'hover:border-red-200' },
          ].map((item, idx) => (
            <StaggerItem key={item.to}>
              <Link
                to={item.to}
                className={`bg-white rounded-2xl p-5 shadow-sm border border-slate-100 hover:shadow-lg ${item.border} transition-all text-center group block`}
              >
                <motion.span
                  className="text-3xl block mb-2"
                  whileHover={{ scale: 1.2, rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.span>
                <span className="text-sm font-medium text-slate-700">{item.label}</span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>
    </div>
  );
};

interface AssessmentCardProps {
  assessment: Assessment;
  i18n: ReturnType<typeof getTranslation>;
  locale: 'en' | 'zh';
  delay?: number;
}

function AssessmentCard({ assessment, i18n, locale, delay = 0 }: AssessmentCardProps) {
  return (
    <AnimatedCard delay={delay}>
      <Link
        to={`/assessments/${assessment.id}`}
        className="group bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-100 hover:border-blue-200 block"
      >
        <div className="flex items-start justify-between mb-4 sm:mb-6">
          <span className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-xl text-xs sm:text-sm font-semibold">
            {assessment.category}
          </span>
          <motion.span
            className="text-2xl sm:text-3xl"
            whileHover={{ scale: 1.15, rotate: [0, -5, 5, 0] }}
          >
            {assessment.icon}
          </motion.span>
        </div>
        <h3 className="text-lg sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3 group-hover:text-blue-600 transition-colors">
          {assessment.title}
        </h3>
        <p className="text-sm sm:text-base text-slate-600 mb-4 sm:mb-6 line-clamp-2">
          {assessment.description}
        </p>
        <div className="flex items-center justify-between text-xs sm:text-sm text-slate-500">
          <span className="flex items-center gap-1.5 sm:gap-2">
            <span>📝</span>
            {t(locale, 'assessments.questions', { count: assessment.totalQuestions })}
          </span>
          <motion.span
            whileHover={{ x: 4 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {i18n.assessments.start} →
          </motion.span>
        </div>
      </Link>
    </AnimatedCard>
  );
}
