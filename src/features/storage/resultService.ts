import { db, type ResultRecord } from './database';
import type { AssessmentCategory, AIReportRecord } from '@/shared/types';

export async function saveResult(result: Omit<ResultRecord, 'id'>): Promise<number> {
  return await db.results.add(result as ResultRecord);
}

export async function getResultById(id: number): Promise<ResultRecord | undefined> {
  return await db.results.get(id);
}

export async function getAllResults(): Promise<ResultRecord[]> {
  return await db.results.orderBy('completedAt').reverse().toArray();
}

export async function getResultsByAssessmentSlug(assessmentSlug: string): Promise<ResultRecord[]> {
  return await db.results
    .where('assessmentSlug')
    .equals(assessmentSlug)
    .reverse()
    .sortBy('completedAt');
}

export async function getResultsByCategory(category: AssessmentCategory): Promise<ResultRecord[]> {
  return await db.results
    .where('category')
    .equals(category)
    .reverse()
    .sortBy('completedAt');
}

export async function getLatestResult(): Promise<ResultRecord | undefined> {
  const results = await db.results.orderBy('completedAt').reverse().limit(1).toArray();
  return results[0];
}

export async function getLatestResultByAssessmentSlug(assessmentSlug: string): Promise<ResultRecord | undefined> {
  const results = await getResultsByAssessmentSlug(assessmentSlug);
  return results[0];
}

export async function deleteResult(id: number): Promise<void> {
  await db.results.delete(id);
}

export async function deleteResultsByAssessmentSlug(assessmentSlug: string): Promise<void> {
  const results = await getResultsByAssessmentSlug(assessmentSlug);
  await db.results.bulkDelete(results.map(r => r.id!).filter(Boolean));
}

export async function clearAllResults(): Promise<void> {
  await db.results.clear();
}

export async function getResultsCount(): Promise<number> {
  return await db.results.count();
}

export async function getTotalDurationSpent(): Promise<number> {
  const results = await getAllResults();
  return results.reduce((sum, r) => sum + (r.durationSpent || 0), 0);
}

export async function getRecentResults(limit: number = 10): Promise<ResultRecord[]> {
  return await db.results.orderBy('completedAt').reverse().limit(limit).toArray();
}

export async function searchResults(query: string): Promise<ResultRecord[]> {
  const allResults = await getAllResults();
  const lowerQuery = query.toLowerCase();
  return allResults.filter(
    r =>
      r.assessmentName.toLowerCase().includes(lowerQuery) ||
      r.resultType.toLowerCase().includes(lowerQuery) ||
      r.summary.toLowerCase().includes(lowerQuery)
  );
}

export async function getResultByResultId(resultId: number): Promise<ResultRecord | undefined> {
  return await db.results.get(resultId);
}

export async function hasResultForAssessment(assessmentSlug: string): Promise<boolean> {
  const count = await db.results.where('assessmentSlug').equals(assessmentSlug).count();
  return count > 0;
}

export async function updateResultMetadata(id: number, metadata: Record<string, unknown>): Promise<void> {
  await db.results.update(id, { metadata });
}

export async function updateResultAiAnalysis(id: number, aiAnalysis: string): Promise<void> {
  await db.results.update(id, { aiAnalysis });
}

export async function updateResultAiReport(
  id: number,
  aiReport: AIReportRecord
): Promise<void> {
  await db.results.update(id, { aiAnalysis: JSON.stringify(aiReport) });
}
