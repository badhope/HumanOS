import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useSettingsStore } from '@/store/settingsStore';
import { PageTransition } from '@/components/molecules/PageTransition';
import Home from '@/pages/Home';
import Categories from '@/pages/Categories';
import AssessmentList from '@/pages/AssessmentList';
import Quiz from '@/pages/Quiz';
import Results from '@/pages/Results';
import Profile from '@/pages/Profile';
import { ImmersiveBackground } from '@/components/3d/ImmersiveBackground';

function App() {
  const location = useLocation();
  const { animationLevel } = useSettingsStore();

  return (
    <div className="relative min-h-screen overflow-hidden">
      {animationLevel !== 'none' && <ImmersiveBackground />}
      <AnimatePresence mode="wait">
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
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
