import { db, type DraftRecord } from './database';

export async function saveDraft(draft: Omit<DraftRecord, 'id'>): Promise<number> {
  const existing = await getDraftByAssessmentSlug(draft.assessmentSlug);
  if (existing) {
    await db.drafts.update(existing.id!, {
      ...draft,
      updatedAt: new Date().toISOString(),
    });
    return existing.id!;
  }
  return await db.drafts.add(draft as DraftRecord);
}

export async function getDraftById(id: number): Promise<DraftRecord | undefined> {
  return await db.drafts.get(id);
}

export async function getDraftByAssessmentSlug(assessmentSlug: string): Promise<DraftRecord | undefined> {
  const drafts = await db.drafts
    .where('assessmentSlug')
    .equals(assessmentSlug)
    .and(d => !d.isAbandoned)
    .toArray();
  return drafts[0];
}

export async function getAllDrafts(): Promise<DraftRecord[]> {
  return await db.drafts
    .filter(d => !d.isAbandoned)
    .reverse()
    .sortBy('updatedAt');
}

export async function deleteDraft(id: number): Promise<void> {
  await db.drafts.delete(id);
}

export async function deleteDraftByAssessmentSlug(assessmentSlug: string): Promise<void> {
  const draft = await getDraftByAssessmentSlug(assessmentSlug);
  if (draft && draft.id) {
    await db.drafts.delete(draft.id);
  }
}

export async function clearAllDrafts(): Promise<void> {
  await db.drafts.clear();
}

export async function abandonDraft(id: number): Promise<void> {
  await db.drafts.update(id, { isAbandoned: true });
}

export async function getDraftsCount(): Promise<number> {
  return await db.drafts.filter(d => !d.isAbandoned).count();
}

export async function hasDraft(assessmentSlug: string): Promise<boolean> {
  const draft = await getDraftByAssessmentSlug(assessmentSlug);
  return !!draft;
}
