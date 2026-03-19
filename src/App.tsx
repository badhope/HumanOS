import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '@/store/settingsStore';
import { PageTransition } from '@/components/molecules';
import { ImmersiveBackground } from '@/components/3d/ImmersiveBackground';
import LoadingScreen from '@/components/atoms/LoadingScreen';

const Home = lazy(() => import('@/pages/Home'));
const Categories = lazy(() => import('@/pages/Categories'));
const AssessmentList = lazy(() => import('@/pages/AssessmentList'));
const Quiz = lazy(() => import('@/pages/Quiz'));
const Results = lazy(() => import('@/pages/Results'));
const Profile = lazy(() => import('@/pages/Profile'));
const Maintenance = lazy(() => import('@/pages/Maintenance'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function App() {
  const location = useLocation();
  const { animationLevel } = useSettingsStore();
  const isHomePage = location.hash === '' || location.hash === '#/';

  return (
    <div className="relative min-h-screen overflow-hidden">
      {animationLevel !== 'none' && isHomePage && <ImmersiveBackground />}
      <AnimatePresence mode="wait">
        <Suspense fallback={<LoadingScreen />}>
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/categories"
              element={
                <PageTransition>
                  <Categories />
                </PageTransition>
              }
            />
            <Route
              path="/assessments/:category"
              element={
                <PageTransition>
                  <AssessmentList />
                </PageTransition>
              }
            />
            <Route
              path="/quiz/:assessmentId"
              element={
                <PageTransition>
                  <Quiz />
                </PageTransition>
              }
            />
            <Route
              path="/results/:assessmentId"
              element={
                <PageTransition>
                  <Results />
                </PageTransition>
              }
            />
            <Route
              path="/profile"
              element={
                <PageTransition>
                  <Profile />
                </PageTransition>
              }
            />
            <Route
              path="/maintenance"
              element={
                <PageTransition>
                  <Maintenance />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </div>
  );
}

export default App;