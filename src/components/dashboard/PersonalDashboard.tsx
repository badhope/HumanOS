import { useState, useEffect } from 'react';
import { dashboardService } from '../../services/dashboard/DashboardService';
import { dataSyncService } from '../../services/dataAbstraction/DataSyncService';
import { UnifiedAssessmentResult, DataStatistics } from '../../types/dataAbstraction';
import { useAppStore } from '../../store';
import { getTranslation } from '../../i18n';

export function PersonalDashboard() {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<DataStatistics | null>(null);
  const [recentResults, setRecentResults] = useState<UnifiedAssessmentResult[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const locale = useAppStore((state) => state.locale);
  const i18n = getTranslation(locale);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await dashboardService.initializeDashboard('default');
      setStatistics(data.statistics);
      setRecentResults(data.recentResults);
      setInsights(data.insights);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    loadDashboardData();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">{i18n.dashboard.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">{i18n.dashboard.title}</h1>
        <p className="text-blue-100">{i18n.dashboard.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title={i18n.dashboard.totalAssessments}
          value={statistics?.totalAssessments || 0}
          icon="📋"
          color="bg-blue-500"
        />
        <StatCard
          title={i18n.dashboard.streakDays}
          value={statistics?.streakDays || 0}
          icon="🔥"
          color="bg-orange-500"
        />
        <StatCard
          title={i18n.dashboard.averageScore}
          value={Math.round(statistics?.averageScore || 0)}
          icon="📊"
          color="bg-green-500"
        />
        <StatCard
          title={i18n.dashboard.tagsEarned}
          value={Object.keys(statistics?.tagDistribution || {}).length}
          icon="🏷️"
          color="bg-purple-500"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">💡 {i18n.dashboard.insights}</h2>
        {insights.length > 0 ? (
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                <span className="text-2xl">💡</span>
                <p className="text-slate-700 flex-1">{insight}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">{i18n.dashboard.noInsights}</p>
        )}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">📈 {i18n.dashboard.recentResults}</h2>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
          >
            {i18n.dashboard.refresh}
          </button>
        </div>
        
        {recentResults.length > 0 ? (
          <div className="space-y-4">
            {recentResults.slice(0, 5).map((result) => (
              <ResultCard key={result.id} result={result} locale={locale} />
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-center py-8">{i18n.dashboard.noData}</p>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }: { title: string; value: number; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <span className={`${color} text-white p-3 rounded-lg text-2xl`}>{icon}</span>
      </div>
      <h3 className="text-3xl font-bold text-slate-800 mb-1">{value}</h3>
      <p className="text-slate-600 text-sm">{title}</p>
    </div>
  );
}

function ResultCard({ result, locale }: { result: UnifiedAssessmentResult; locale: 'en' | 'zh' }) {
  const i18n = getTranslation(locale);

  const typeNames: Record<string, string> = {
    personality: i18n.dashboard.personality,
    stress: i18n.dashboard.stress,
    anxiety: i18n.dashboard.anxiety
  };

  const typeColors: Record<string, string> = {
    personality: 'bg-purple-100 text-purple-800',
    stress: 'bg-green-100 text-green-800',
    anxiety: 'bg-blue-100 text-blue-800'
  };

  return (
    <div className="border border-slate-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-slate-800">{result.title}</h3>
          <p className="text-sm text-slate-500">
            {new Date(result.timestamp).toLocaleDateString(locale === 'zh' ? 'zh-CN' : 'en-US')}
          </p>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${typeColors[result.assessmentType]}`}>
          {typeNames[result.assessmentType]}
        </span>
      </div>
      
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-slate-600">总分</span>
          <span className="text-lg font-bold text-blue-600">{result.totalScore}</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all"
            style={{ width: `${Math.min((result.totalScore / 100) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      {result.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {result.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
