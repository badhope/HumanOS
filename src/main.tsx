import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { initializeDatabase } from './features/storage';
import { initializeSettings } from '@/features/storage/settingsService';
import { useSettingsStore } from '@/store/settingsStore';
import './styles/globals.css';
import './styles/animations.css';

async function bootstrap() {
  try {
    await initializeDatabase();
    await initializeSettings();
    await useSettingsStore.getState().syncFromDB();
  } catch (error) {
    console.error('Initialization error:', error);
  }
}

bootstrap();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>
);