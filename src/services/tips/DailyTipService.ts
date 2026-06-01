import type { AssessmentResult } from '../../types';

export interface DailyTip {
  id: string;
  category: 'personality' | 'stress' | 'anxiety' | 'general' | 'sleep' | 'social' | 'mindfulness';
  tipZh: string;
  tipEn: string;
  source?: string;
  relatedAssessment?: string;
}

export interface PersonalizedTip extends DailyTip {
  relevance: number;
  reasonZh: string;
  reasonEn: string;
}

const TIPS_DATABASE: DailyTip[] = [
  {
    id: 'p1', category: 'personality',
    tipZh: '你的性格特质没有好坏之分，每种特质都有其独特的优势。了解自己的特质，是为了更好地发挥优势，而非改变自己。',
    tipEn: 'Your personality traits are neither good nor bad. Each trait has its unique strengths. Understanding your traits is about leveraging your strengths, not changing who you are.',
    relatedAssessment: 'big-five',
  },
  {
    id: 'p2', category: 'personality',
    tipZh: '高开放性的人更适合创意性工作，但也需要注意将想法落地执行。尝试给自己设定"完成一个小项目"的目标。',
    tipEn: 'People with high openness are better suited for creative work, but need to ensure ideas are executed. Try setting a goal to "complete one small project."',
    relatedAssessment: 'big-five',
  },
  {
    id: 'p3', category: 'personality',
    tipZh: '内向不是缺点。内向者通常在深度思考和一对一交流中表现更出色。给自己创造安静的工作环境，发挥你的优势。',
    tipEn: 'Introversion is not a weakness. Introverts often excel in deep thinking and one-on-one conversations. Create a quiet work environment to leverage your strengths.',
    relatedAssessment: 'big-five',
  },
  {
    id: 's1', category: 'stress',
    tipZh: '当你感到压力时，试试"5-4-3-2-1"感官法：找出5个看到的、4个摸到的、3个听到的、2个闻到的、1个尝到的东西，帮助自己回到当下。',
    tipEn: 'When stressed, try the "5-4-3-2-1" grounding technique: find 5 things you see, 4 you touch, 3 you hear, 2 you smell, and 1 you taste to bring yourself back to the present.',
    relatedAssessment: 'stress-test',
  },
  {
    id: 's2', category: 'stress',
    tipZh: '研究表明，适度的压力实际上可以提升表现。关键在于你如何看待压力——将压力视为挑战而非威胁，可以显著改善你的应对效果。',
    tipEn: 'Research shows moderate stress can actually improve performance. The key is how you view stress—seeing it as a challenge rather than a threat can significantly improve your coping effectiveness.',
    relatedAssessment: 'stress-test',
  },
  {
    id: 's3', category: 'stress',
    tipZh: '每天花10分钟写"压力日记"，记录让你感到压力的事件和你的反应。这能帮助你识别压力模式，提前做好准备。',
    tipEn: 'Spend 10 minutes daily writing a "stress journal" recording stressful events and your reactions. This helps you identify stress patterns and prepare in advance.',
    relatedAssessment: 'stress-test',
  },
  {
    id: 'a1', category: 'anxiety',
    tipZh: '焦虑时，你的呼吸会变浅变快。尝试4-7-8呼吸法：吸气4秒，屏息7秒，呼气8秒。这能激活副交感神经系统，帮助身体放松。',
    tipEn: 'When anxious, your breathing becomes shallow and rapid. Try the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7, exhale for 8. This activates the parasympathetic nervous system to help your body relax.',
    relatedAssessment: 'anxiety-gad7',
  },
  {
    id: 'a2', category: 'anxiety',
    tipZh: '担忧不等于解决问题。当你发现自己反复担忧时，问自己："这个问题我现在能做什么？"如果能，就行动；如果不能，就暂时放下。',
    tipEn: 'Worrying is not the same as problem-solving. When you catch yourself ruminating, ask: "Can I do something about this right now?" If yes, act; if no, let it go for now.',
    relatedAssessment: 'anxiety-gad7',
  },
  {
    id: 'a3', category: 'anxiety',
    tipZh: '设定"担忧时间"：每天固定15分钟专门用来担忧。其他时间出现担忧时，告诉自己"我会在担忧时间再想这件事"。',
    tipEn: 'Set a "worry time": dedicate 15 minutes daily specifically for worrying. When worries arise at other times, tell yourself "I\'ll think about this during my worry time."',
    relatedAssessment: 'anxiety-gad7',
  },
  {
    id: 'g1', category: 'general',
    tipZh: '每天至少做一件让你感到愉悦的小事，哪怕只是喝一杯好茶或听一首喜欢的歌。积极情绪的积累能增强你的心理韧性。',
    tipEn: 'Do at least one small thing that brings you pleasure each day, even if it\'s just a good cup of tea or a favorite song. Accumulating positive emotions builds psychological resilience.',
  },
  {
    id: 'g2', category: 'general',
    tipZh: '研究表明，每天写下3件感恩的事情，持续21天就能显著提升幸福感。试试在睡前做这个练习。',
    tipEn: 'Research shows writing down 3 things you\'re grateful for daily can significantly increase happiness in just 21 days. Try this practice before bed.',
  },
  {
    id: 'g3', category: 'general',
    tipZh: '完美主义往往是焦虑的根源。尝试接受"足够好"的标准，你会发现生活轻松很多，效率反而更高。',
    tipEn: 'Perfectionism is often the root of anxiety. Try accepting "good enough" standards—you\'ll find life becomes easier and your efficiency actually improves.',
  },
  {
    id: 'sl1', category: 'sleep',
    tipZh: '睡前1小时远离电子屏幕，蓝光会抑制褪黑素分泌。取而代之，试试阅读纸质书或做轻度拉伸。',
    tipEn: 'Avoid screens 1 hour before bed—blue light suppresses melatonin. Instead, try reading a physical book or doing light stretching.',
  },
  {
    id: 'sl2', category: 'sleep',
    tipZh: '保持固定的睡眠时间，即使周末也尽量一致。规律的作息是改善睡眠质量最有效的方法之一。',
    tipEn: 'Maintain consistent sleep times, even on weekends. A regular schedule is one of the most effective ways to improve sleep quality.',
  },
  {
    id: 'so1', category: 'social',
    tipZh: '社交不一定要大型聚会。与一个好友深度交谈30分钟，比在人群中寒暄3小时更能满足你的社交需求。',
    tipEn: 'Socializing doesn\'t require large gatherings. A 30-minute deep conversation with a close friend can better satisfy your social needs than 3 hours of small talk in a crowd.',
  },
  {
    id: 'so2', category: 'social',
    tipZh: '学会说"不"是一种重要的社交技能。每次答应别人之前，先问自己："我真的想做这件事吗？"',
    tipEn: 'Learning to say "no" is an important social skill. Before agreeing to something, ask yourself: "Do I really want to do this?"',
  },
  {
    id: 'm1', category: 'mindfulness',
    tipZh: '正念不需要特殊的环境。吃饭时专注食物的味道和口感，走路时感受脚底的触感，这些都是正念练习。',
    tipEn: 'Mindfulness doesn\'t require special settings. Focusing on food\'s taste while eating, or feeling your feet while walking—these are all mindfulness practices.',
  },
  {
    id: 'm2', category: 'mindfulness',
    tipZh: '当负面情绪来袭时，不要试图立刻消除它。试着像观察天空中的云一样观察你的情绪——它来了，也会走。',
    tipEn: 'When negative emotions arise, don\'t try to eliminate them immediately. Observe your emotions like clouds in the sky—they come, and they will go.',
  },
];

class DailyTipService {
  private seededRandom(seed: number): number {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  getDailyTips(locale: 'zh' | 'en', count = 3, history?: AssessmentResult[]): PersonalizedTip[] {
    const today = new Date();
    const daySeed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();

    let tips: (DailyTip | PersonalizedTip)[] = [...TIPS_DATABASE];

    if (history && history.length > 0) {
      const recentAssessments = history.slice(0, 5);
      const assessmentTypes = new Set(recentAssessments.map(a => a.assessmentId));
      const categoryMap: Record<string, string> = {
        'big-five': 'personality',
        '1': 'personality',
        'stress-test': 'stress',
        '2': 'stress',
        'anxiety-gad7': 'anxiety',
        '3': 'anxiety',
      };

      tips = tips.map(tip => {
        let relevance = 1;
        let reasonZh = '通用心理建议';
        let reasonEn = 'General mental health tip';

        if (tip.relatedAssessment && assessmentTypes.has(tip.relatedAssessment)) {
          relevance = 3;
          const cat = categoryMap[tip.relatedAssessment];
          if (cat === 'personality') {
            reasonZh = '基于你的人格测评结果';
            reasonEn = 'Based on your personality assessment';
          } else if (cat === 'stress') {
            reasonZh = '基于你的压力测评结果';
            reasonEn = 'Based on your stress assessment';
          } else if (cat === 'anxiety') {
            reasonZh = '基于你的焦虑测评结果';
            reasonEn = 'Based on your anxiety assessment';
          }
        } else if (tip.category === 'general') {
          relevance = 2;
        }

        return { ...tip, relevance, reasonZh, reasonEn } as PersonalizedTip;
      });

      tips.sort((a, b) => (b as PersonalizedTip).relevance - (a as PersonalizedTip).relevance);
    }

    const selected: PersonalizedTip[] = [];
    const usedCategories = new Set<string>();
    const shuffled = tips.sort((a, b) => {
      const ra = this.seededRandom(daySeed + a.id.charCodeAt(0));
      const rb = this.seededRandom(daySeed + b.id.charCodeAt(0));
      return ra - rb;
    });

    for (const tip of shuffled) {
      if (selected.length >= count) break;
      if (usedCategories.has(tip.category) && selected.length < count - 1) continue;
      selected.push({
        ...tip,
        relevance: (tip as PersonalizedTip).relevance || 1,
        reasonZh: (tip as PersonalizedTip).reasonZh || '通用心理建议',
        reasonEn: (tip as PersonalizedTip).reasonEn || 'General mental health tip',
      });
      usedCategories.add(tip.category);
    }

    return selected;
  }

  getTipById(id: string, locale: 'zh' | 'en'): DailyTip | undefined {
    return TIPS_DATABASE.find(t => t.id === id);
  }

  getAllTips(): DailyTip[] {
    return TIPS_DATABASE;
  }
}

export const dailyTipService = new DailyTipService();
