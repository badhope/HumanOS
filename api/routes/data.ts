import { Router, type Request, type Response } from 'express';
import { createSupabaseClient, isSupabaseConfigured } from '../utils/supabase.js';

const router = Router();

function getToken(req: Request): string | null {
  const authorization = req.headers.authorization;
  return authorization?.startsWith('Bearer ') ? authorization.slice(7) : null;
}

async function getAuthenticatedSupabase(req: Request, res: Response) {
  const token = getToken(req);
  if (!token) {
    res.status(401).json({ success: false, error: 'No token provided' });
    return null;
  }

  const supabase = createSupabaseClient();

  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error || !user) {
    res.status(401).json({ success: false, error: 'Invalid or expired token' });
    return null;
  }

  await supabase.auth.setSession({
    access_token: token,
    refresh_token: '',
  });

  return supabase;
}

router.get('/history', async (req: Request, res: Response): Promise<void> => {
  if (!isSupabaseConfigured()) {
    res.status(503).json({ success: false, error: 'Supabase backend not configured' });
    return;
  }

  const supabase = await getAuthenticatedSupabase(req, res);
  if (!supabase) return;

  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .select('*')
      .order('completed_at', { ascending: false })
      .limit(50);

    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.post('/history', async (req: Request, res: Response): Promise<void> => {
  if (!isSupabaseConfigured()) {
    res.status(503).json({ success: false, error: 'Supabase backend not configured' });
    return;
  }

  const supabase = await getAuthenticatedSupabase(req, res);
  if (!supabase) return;

  const { assessment_id, assessment_title, total_score, traits } = req.body;

  if (!assessment_id || !assessment_title || total_score === undefined || !traits) {
    res.status(400).json({
      success: false,
      error: 'assessment_id, assessment_title, total_score, and traits are required',
    });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('assessment_results')
      .insert({
        assessment_id,
        assessment_title,
        total_score,
        traits,
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.delete('/history/:id', async (req: Request, res: Response): Promise<void> => {
  if (!isSupabaseConfigured()) {
    res.status(503).json({ success: false, error: 'Supabase backend not configured' });
    return;
  }

  const supabase = await getAuthenticatedSupabase(req, res);
  if (!supabase) return;

  try {
    const { error } = await supabase
      .from('assessment_results')
      .delete()
      .eq('id', req.params.id);

    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/mood', async (req: Request, res: Response): Promise<void> => {
  if (!isSupabaseConfigured()) {
    res.status(503).json({ success: false, error: 'Supabase backend not configured' });
    return;
  }

  const supabase = await getAuthenticatedSupabase(req, res);
  if (!supabase) return;

  try {
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .order('recorded_at', { ascending: false })
      .limit(90);

    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.post('/mood', async (req: Request, res: Response): Promise<void> => {
  if (!isSupabaseConfigured()) {
    res.status(503).json({ success: false, error: 'Supabase backend not configured' });
    return;
  }

  const supabase = await getAuthenticatedSupabase(req, res);
  if (!supabase) return;

  const { mood, mood_score, note, tags, recorded_at } = req.body;

  if (!mood || mood_score === undefined) {
    res.status(400).json({
      success: false,
      error: 'mood and mood_score are required',
    });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('mood_entries')
      .insert({
        mood,
        mood_score,
        note: note || null,
        tags: tags || [],
        recorded_at: recorded_at || new Date().toISOString().split('T')[0],
      })
      .select()
      .single();

    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.get('/achievements', async (req: Request, res: Response): Promise<void> => {
  if (!isSupabaseConfigured()) {
    res.status(503).json({ success: false, error: 'Supabase backend not configured' });
    return;
  }

  const supabase = await getAuthenticatedSupabase(req, res);
  if (!supabase) return;

  try {
    const { data, error } = await supabase
      .from('achievements')
      .select('*')
      .order('unlocked_at', { ascending: false });

    if (error) {
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

router.post('/achievements', async (req: Request, res: Response): Promise<void> => {
  if (!isSupabaseConfigured()) {
    res.status(503).json({ success: false, error: 'Supabase backend not configured' });
    return;
  }

  const supabase = await getAuthenticatedSupabase(req, res);
  if (!supabase) return;

  const { achievement_key, title, description, icon } = req.body;

  if (!achievement_key || !title) {
    res.status(400).json({
      success: false,
      error: 'achievement_key and title are required',
    });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('achievements')
      .insert({
        achievement_key,
        title,
        description: description || null,
        icon: icon || null,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        res.status(409).json({ success: false, error: 'Achievement already unlocked' });
        return;
      }
      res.status(400).json({ success: false, error: error.message });
      return;
    }

    res.json({ success: true, data });
  } catch {
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

export default router;