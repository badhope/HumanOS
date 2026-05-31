// ========================================
// Data - Assessments
// ========================================
const sample1 = {
  id: 'sample1',
  name: '简易人格测试',
  description: '快速了解你的性格特点',
  icon: '🧠',
  color: '#2E7CF5',
  category: 'personality',
  tags: ['性格', '快速', 'MBTI'],
  questionCount: 3,
  duration: 3,
  intro: '这个简单的人格测试可以帮助你快速了解自己的性格特点。请根据直觉回答，没有对错之分。',
  tips: [
    '选择最符合你真实情况的答案',
    '不要思考太久，凭直觉选择',
    '答案没有好坏之分'
  ],
  questions: [
    {
      id: 'q1',
      text: '在社交聚会中，你通常：',
      options: [
        { value: 'E', text: '主动和很多人交谈，感到充满活力' },
        { value: 'E', text: '和几个朋友交谈，感觉舒适' },
        { value: 'I', text: '看情况而定' },
        { value: 'I', text: '大多时候在旁边听' },
        { value: 'I', text: '喜欢一个人待着，感觉疲惫' }
      ]
    },
    {
      id: 'q2',
      text: '做决定时，你更看重：',
      options: [
        { value: 'T', text: '逻辑分析和客观事实' },
        { value: 'T', text: '主要看事实，偶尔考虑感受' },
        { value: 'F', text: '看情况而定' },
        { value: 'F', text: '主要考虑他人感受' },
        { value: 'F', text: '人际关系和情感和谐' }
      ]
    },
    {
      id: 'q3',
      text: '面对新事物，你倾向于：',
      options: [
        { value: 'P', text: '保持开放，灵活应对' },
        { value: 'P', text: '先看看再说' },
        { value: 'J', text: '看情况而定' },
        { value: 'J', text: '提前做计划' },
        { value: 'J', text: '有详细的计划和安排' }
      ]
    }
  ],
  scoring: {
    dimensions: [
      { id: 'E_I', name: '外向性', weight: 1 },
      { id: 'T_F', name: '思考性', weight: 1 },
      { id: 'J_P', name: '判断性', weight: 1 }
    ],
    ranges: [
      { min: 0, max: 40, title: '内向思考型', summary: '你更享受独处，善于深入思考', desc: '你是一个善于思考的人，喜欢深入分析问题。独处让你感到充电，而社交活动可能会让你感到消耗。你注重逻辑，做决定时会仔细权衡。' },
      { min: 41, max: 60, title: '平衡型', summary: '你在各方面都比较均衡', desc: '你是一个性格平衡的人，既能享受社交也能接受独处。你在做决定时会兼顾逻辑和感受，适应性很强。' },
      { min: 61, max: 100, title: '外向情感型', summary: '你充满活力，善于与人交往', desc: '你是一个充满活力的人，喜欢与人交往。你很在意他人的感受，善于建立和维护人际关系，是团队中受欢迎的成员。' }
    ]
  }
};

const sample2 = {
  id: 'sample2',
  name: '压力水平测试',
  description: '评估你当前的压力程度',
  icon: '💆',
  color: '#16B39A',
  category: 'emotion',
  tags: ['压力', '情绪', '健康'],
  questionCount: 4,
  duration: 3,
  intro: '了解你当前的压力水平，帮助你更好地关注心理健康。请根据最近两周的实际情况作答。',
  tips: [
    '根据最近两周的真实感受回答',
    '这只是一个参考，不是诊断',
    '如有需要请寻求专业帮助'
  ],
  questions: [
    {
      id: 'q1',
      text: '最近你感到紧张或焦虑的频率：',
      options: [
        { value: 1, text: '几乎没有' },
        { value: 2, text: '偶尔' },
        { value: 3, text: '有时' },
        { value: 4, text: '经常' },
        { value: 5, text: '总是' }
      ]
    },
    {
      id: 'q2',
      text: '你的睡眠质量如何：',
      options: [
        { value: 1, text: '很好，睡得很香' },
        { value: 2, text: '还可以' },
        { value: 3, text: '一般' },
        { value: 4, text: '不太好' },
        { value: 5, text: '很差，经常失眠' }
      ]
    },
    {
      id: 'q3',
      text: '你感到疲惫或精力不足的情况：',
      options: [
        { value: 1, text: '几乎没有' },
        { value: 2, text: '偶尔' },
        { value: 3, text: '有时' },
        { value: 4, text: '经常' },
        { value: 5, text: '总是' }
      ]
    },
    {
      id: 'q4',
      text: '你能专注于当前任务的程度：',
      options: [
        { value: 1, text: '非常好' },
        { value: 2, text: '还可以' },
        { value: 3, text: '一般' },
        { value: 4, text: '比较困难' },
        { value: 5, text: '非常困难' }
      ]
    }
  ],
  scoring: {
    dimensions: [
      { id: 'anxiety', name: '焦虑倾向', weight: 1 },
      { id: 'sleep', name: '睡眠质量', weight: 1 },
      { id: 'energy', name: '精力水平', weight: 1 }
    ],
    ranges: [
      { min: 4, max: 8, title: '压力较低', summary: '你目前的状态比较放松', desc: '恭喜你！你目前的压力水平较低，状态比较放松。继续保持良好的生活习惯，关注自己的心理健康。' },
      { min: 9, max: 14, title: '压力适中', summary: '你有一些压力，但还在可控范围', desc: '你目前有一定的压力，但还好在可控范围内。建议适当调整作息，做一些放松的活动。' },
      { min: 15, max: 20, title: '压力较高', summary: '建议你关注自己的心理健康', desc: '你目前的压力水平较高，建议你关注自己的心理健康。可以尝试一些减压方式，如运动、冥想、或者和朋友倾诉。如果持续感到不适，建议寻求专业帮助。' }
    ]
  }
};

const assessments = [sample1, sample2];

// ========================================
// Data - Categories
// ========================================
const categories = [
  { id: 'all', name: '全部' },
  { id: 'personality', name: '人格' },
  { id: 'emotion', name: '情绪' },
  { id: 'stress', name: '压力' },
  { id: 'career', name: '职业' }
];

// ========================================
// Data - Knowledge
// ========================================
const knowledgeArticles = [
  {
    id: 'a1',
    title: '什么是心理健康？',
    summary: '了解心理健康的基本概念和重要性',
    content: `心理健康是指心理的各个方面及活动过程处于一种良好或正常的状态，包括认知正常、情感协调、意志健全、行为适当等。

心理健康不仅仅是没有心理疾病，更是一种能够适应环境、充分发挥自身潜能的状态。

保持心理健康的小建议：
1. 规律作息，保证充足睡眠
2. 适度运动，释放压力
3. 保持社交，与人交流
4. 培养兴趣，丰富生活
5. 接纳自己，善待自己

记住，关注心理健康是每个人的必修课。`
  },
  {
    id: 'a2',
    title: '如何有效管理压力？',
    summary: '学习实用的压力管理技巧',
    content: `现代生活中，压力无处不在。学会有效管理压力，是保持身心健康的重要技能。

压力管理的方法：

1. 深呼吸放松法
当感到紧张时，尝试深呼吸：吸气4秒，屏息2秒，呼气6秒。

2. 运动释放
适度的运动可以促进内啡肽分泌，带来愉悦感。

3. 时间管理
合理安排时间，分清优先级，避免拖延。

4. 社交支持
和信任的朋友或家人倾诉，获得情感支持。

5. 接纳现实
有些事情无法改变，学会接纳，把精力放在可控的事情上。

记住，有压力是正常的，关键是找到适合自己的应对方式。`
  },
  {
    id: 'a3',
    title: '认识情绪，拥抱情绪',
    summary: '了解常见情绪以及如何与情绪共处',
    content: `情绪是我们与生俱来的一部分，没有好坏之分。每一种情绪都有其存在的意义。

常见的情绪：
- 快乐：带来满足感和动力
- 悲伤：帮助我们疗愈和反思
- 愤怒：保护我们的边界
- 焦虑：提醒我们关注风险

与情绪共处的方法：
1. 觉察情绪，不评判
2. 接纳情绪，不抗拒
3. 表达情绪，不压抑
4. 理解情绪背后的需求

情绪就像天气，会来也会走。学会与情绪共处，让它们成为我们了解自己的窗口。`
  }
];

// ========================================
// Utils - Storage
// ========================================
const Storage = {
  KEYS: {
    RECORDS: 'mindmirror_records',
    SETTINGS: 'mindmirror_settings'
  },

  get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.error('Storage get error:', e);
      return null;
    }
  },

  set(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Storage set error:', e);
      return false;
    }
  },

  getRecords() {
    return this.get(this.KEYS.RECORDS) || [];
  },

  addRecord(record) {
    const records = this.getRecords();
    records.unshift(record);
    this.set(this.KEYS.RECORDS, records);
    return record;
  },

  clearRecords() {
    this.set(this.KEYS.RECORDS, []);
  },

  getSettings() {
    const defaultSettings = {
      userName: '用户',
      notifications: true
    };
    const saved = this.get(this.KEYS.SETTINGS);
    return { ...defaultSettings, ...saved };
  },

  saveSettings(settings) {
    this.set(this.KEYS.SETTINGS, settings);
  }
};

// ========================================
// Utils - Calculator
// ========================================
const Calculator = {
  buildAnswerMap(answers) {
    const map = {};
    answers.forEach(a => {
      map[a.questionId] = a;
    });
    return map;
  },

  calcDimensionScore(dimension, answerMap, questions) {
    let score = 0;
    let count = 0;
    
    questions.forEach(q => {
      const answer = answerMap[q.id];
      if (!answer) return;
      
      const option = q.options.find(o => o.text === answer.selectedText);
      if (!option) return;
      
      if (typeof option.value === 'number') {
        score += option.value;
        count++;
      } else {
        if (option.value === 'E' || option.value === 'T' || option.value === 'J') {
          score += 1;
        }
        count += 1;
      }
    });
    
    return count > 0 ? Math.round((score / count) * 100) : 50;
  },

  calcOverallScore(dimensions) {
    if (dimensions.length === 0) return 50;
    const sum = dimensions.reduce((acc, d) => acc + d.score, 0);
    return Math.round(sum / dimensions.length);
  },

  matchTemplate(ranges, score) {
    for (const range of ranges) {
      if (score >= range.min && score <= range.max) {
        return range;
      }
    }
    return ranges[ranges.length - 1];
  },

  calculate(assessment, answers) {
    const answerMap = this.buildAnswerMap(answers);
    const dimensions = assessment.scoring.dimensions.map(dim => {
      const score = this.calcDimensionScore(dim, answerMap, assessment.questions);
      return {
        id: dim.id,
        name: dim.name,
        score: score,
        desc: score > 60 ? '较高' : score > 40 ? '中等' : '较低'
      };
    });
    
    const overallScore = this.calcOverallScore(dimensions);
    const template = this.matchTemplate(assessment.scoring.ranges, overallScore);
    
    return {
      overallScore,
      dimensions,
      title: template.title,
      summary: template.summary,
      desc: template.desc
    };
  }
};

// ========================================
// Utils - Date
// ========================================
const DateUtils = {
  formatTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hour = String(date.getHours()).padStart(2, '0');
    const minute = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }
};

// ========================================
// Vue 3 App
// ========================================
const { createApp, ref, reactive, computed, onMounted, watch } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

// ========================================
// Components - Pages
// ========================================

const HomePage = {
  template: `
    <div class="page fade-in">
      <div class="container">
        <div class="header">
          <div class="header-title">{{ greeting }}，{{ settings.userName }}</div>
          <div class="header-subtitle">探索你的内心世界</div>
        </div>
        
        <div class="quick-actions">
          <div class="quick-action" @click="goTo('library')">
            <div class="quick-action-icon">📋</div>
            <div class="quick-action-text">测评库</div>
          </div>
          <div class="quick-action" @click="goTo('archive')">
            <div class="quick-action-icon">📊</div>
            <div class="quick-action-text">档案</div>
          </div>
          <div class="quick-action" @click="goTo('knowledge')">
            <div class="quick-action-icon">📚</div>
            <div class="quick-action-text">知识</div>
          </div>
        </div>
        
        <div class="stats-grid">
          <div class="stat-card">
            <div class="stat-value">{{ records.length }}</div>
            <div class="stat-label">完成测评</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ streak }}</div>
            <div class="stat-label">连续天数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ thisWeek }}</div>
            <div class="stat-label">近7天</div>
          </div>
        </div>
        
        <div class="section">
          <div class="section-header">
            <div class="section-title">推荐测评</div>
            <div class="section-more" @click="goTo('library')">更多 ></div>
          </div>
          <div class="assessment-list">
            <div class="assessment-card" v-for="item in assessments" :key="item.id" @click="startAssessment(item)">
              <div class="assessment-icon-wrapper">
                <span class="assessment-icon">{{ item.icon }}</span>
              </div>
              <div class="assessment-info">
                <div class="assessment-name">{{ item.name }}</div>
                <div class="assessment-desc">{{ item.description }}</div>
                <div class="assessment-meta">
                  <span>📝 {{ item.questionCount }}题</span>
                  <span>⏱️ {{ item.duration }}分钟</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="section" v-if="recentRecords.length > 0">
          <div class="section-header">
            <div class="section-title">最近记录</div>
            <div class="section-more" @click="goTo('archive')">更多 ></div>
          </div>
          <div class="record-list">
            <div class="record-card" v-for="item in recentRecords" :key="item.id" @click="viewResult(item)">
              <div class="record-icon-wrapper">
                <span class="record-icon">{{ item.assessmentIcon }}</span>
              </div>
              <div class="record-info">
                <div class="record-name">{{ item.assessmentName }}</div>
                <div class="record-result">{{ item.result.title }}</div>
                <div class="record-time">{{ formatTime(item.createdAt) }}</div>
              </div>
              <div class="record-score">{{ item.result.overallScore }}</div>
            </div>
          </div>
        </div>
        
        <div class="empty-state" v-if="records.length === 0">
          <div class="empty-icon">🎯</div>
          <div class="empty-text">开始你的测评之旅</div>
          <div class="empty-hint">选择一个测评，了解更好的自己</div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const settings = reactive(Storage.getSettings());
    const records = reactive(Storage.getRecords());
    
    const recentRecords = computed(() => records.slice(0, 3));
    
    const streak = computed(() => {
      if (records.length === 0) return 0;
      let count = 0;
      let lastDate = null;
      const now = new Date();
      
      for (const record of records) {
        const date = new Date(record.createdAt);
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        if (diffDays === count) {
          count++;
          lastDate = date;
        } else if (diffDays > count) {
          break;
        }
      }
      return count;
    });
    
    const thisWeek = computed(() => {
      if (records.length === 0) return 0;
      const now = new Date();
      let count = 0;
      
      for (const record of records) {
        const date = new Date(record.createdAt);
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        if (diffDays < 7) {
          count++;
        }
      }
      return count;
    });
    
    const greeting = computed(() => {
      const hour = new Date().getHours();
      if (hour < 6) return '夜深了';
      if (hour < 12) return '早上好';
      if (hour < 18) return '下午好';
      return '晚上好';
    });
    
    const goTo = (name) => {
      router.push({ name });
    };
    
    const startAssessment = (assessment) => {
      router.push({ name: 'intro', params: { id: assessment.id } });
    };
    
    const viewResult = (record) => {
      router.push({ name: 'result', params: { id: record.id } });
    };
    
    const formatTime = (t) => DateUtils.formatTime(t);
    
    return {
      settings,
      records,
      recentRecords,
      assessments,
      streak,
      thisWeek,
      greeting,
      goTo,
      startAssessment,
      viewResult,
      formatTime
    };
  }
};

const LibraryPage = {
  template: `
    <div class="page fade-in">
      <div class="container">
        <div class="header">
          <div class="header-title">测评库</div>
          <div class="header-subtitle">发现适合你的测评</div>
        </div>
        
        <div class="search-bar">
          <div class="search-input-wrapper">
            <div class="search-icon">🔍</div>
            <input class="search-input" v-model="searchText" placeholder="搜索测评..." />
            <div class="search-clear" v-if="searchText" @click="searchText = ''">✕</div>
          </div>
        </div>
        
        <div class="category-nav">
          <div class="category-list">
            <div class="category-item" 
                 :class="{ active: activeCategory === item.id }"
                 v-for="item in categories" 
                 :key="item.id"
                 @click="activeCategory = item.id">
              {{ item.name }}
            </div>
          </div>
        </div>
        
        <div class="assessment-list">
          <div class="assessment-card" v-for="item in filteredAssessments" :key="item.id" @click="startAssessment(item)">
            <div class="assessment-icon-wrapper">
              <span class="assessment-icon">{{ item.icon }}</span>
            </div>
            <div class="assessment-info">
              <div class="assessment-name">{{ item.name }}</div>
              <div class="assessment-desc">{{ item.description }}</div>
              <div class="assessment-meta">
                <span>📝 {{ item.questionCount }}题</span>
                <span>⏱️ {{ item.duration }}分钟</span>
              </div>
              <div class="assessment-tags">
                <div class="tag" v-for="tag in item.tags" :key="tag">{{ tag }}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="empty-state" v-if="filteredAssessments.length === 0">
          <div class="empty-icon">🔍</div>
          <div class="empty-text">没有找到相关测评</div>
          <div class="empty-hint">试试其他关键词吧</div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const searchText = ref('');
    const activeCategory = ref('all');
    
    const filteredAssessments = computed(() => {
      return assessments.filter(item => {
        const matchesSearch = !searchText.value || 
          item.name.toLowerCase().includes(searchText.value.toLowerCase()) ||
          item.description.toLowerCase().includes(searchText.value.toLowerCase());
        const matchesCategory = activeCategory.value === 'all' || item.category === activeCategory.value;
        return matchesSearch && matchesCategory;
      });
    });
    
    const startAssessment = (assessment) => {
      router.push({ name: 'intro', params: { id: assessment.id } });
    };
    
    return {
      searchText,
      activeCategory,
      categories,
      filteredAssessments,
      startAssessment
    };
  }
};

const IntroPage = {
  template: `
    <div class="page fade-in" v-if="assessment">
      <div class="container">
        <div class="intro-header">
          <div class="intro-icon-wrapper">
            <span class="intro-icon">{{ assessment.icon }}</span>
          </div>
          <div class="intro-title">{{ assessment.name }}</div>
          <div class="intro-subtitle">{{ assessment.description }}</div>
          <div class="intro-meta">
            <span>📝 {{ assessment.questionCount }}题</span>
            <span>⏱️ {{ assessment.duration }}分钟</span>
          </div>
        </div>
        
        <div class="card">
          <div class="intro-content">{{ assessment.intro }}</div>
          
          <div class="intro-tips">
            <div class="tip-item" v-for="(tip, index) in assessment.tips" :key="index">
              <div class="tip-icon">💡</div>
              <div class="tip-text">{{ tip }}</div>
            </div>
          </div>
        </div>
        
        <div class="card" style="margin-top: 24px; background: transparent; box-shadow: none; padding: 0; border: none;">
          <div class="btn btn-primary btn-block" @click="start">开始测评</div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const route = VueRouter.useRoute();
    const assessmentId = route.params.id;
    const assessment = assessments.find(a => a.id === assessmentId);
    
    const start = () => {
      router.push({ name: 'taking', params: { id: assessmentId } });
    };
    
    return { assessment, start };
  }
};

const TakingPage = {
  template: `
    <div class="page fade-in" v-if="assessment">
      <div class="container">
        <div class="progress-header">
          <div class="progress-bar-wrapper">
            <div class="progress-bar">
              <div class="progress-fill" :style="{ width: progress + '%' }"></div>
            </div>
          </div>
          <div class="progress-text">{{ currentIndex + 1 }} / {{ assessment.questions.length }}</div>
        </div>
        
        <div class="question-area">
          <div class="question-text">{{ currentQuestion.text }}</div>
          
          <div class="options">
            <div class="option" 
                 :class="{ selected: selectedValue === opt.text }"
                 v-for="opt in currentQuestion.options" 
                 :key="opt.text"
                 @click="selectOption(opt)">
              <div class="option-circle"></div>
              <div class="option-text">{{ opt.text }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="taking-footer">
        <div class="btn-group">
          <button class="btn btn-secondary" @click="prev" :disabled="currentIndex === 0">上一题</button>
          <button class="btn btn-primary" @click="nextOrSubmit" :disabled="!selectedValue">
            {{ currentIndex === assessment.questions.length - 1 ? '完成' : '下一题' }}
          </button>
        </div>
      </div>
    </div>
  `,
  setup() {
    const route = VueRouter.useRoute();
    const assessmentId = route.params.id;
    const assessment = assessments.find(a => a.id === assessmentId);
    
    const currentIndex = ref(0);
    const answers = ref([]);
    
    const currentQuestion = computed(() => assessment.questions[currentIndex.value]);
    const selectedValue = computed(() => {
      const a = answers.value.find(a => a.questionId === currentQuestion.value.id);
      return a ? a.selectedText : null;
    });
    const progress = computed(() => ((currentIndex.value + 1) / assessment.questions.length) * 100);
    
    const selectOption = (option) => {
      const existingIndex = answers.value.findIndex(a => a.questionId === currentQuestion.value.id);
      const answer = {
        questionId: currentQuestion.value.id,
        selectedText: option.text
      };
      
      if (existingIndex >= 0) {
        answers.value[existingIndex] = answer;
      } else {
        answers.value.push(answer);
      }
    };
    
    const prev = () => {
      if (currentIndex.value > 0) {
        currentIndex.value--;
      }
    };
    
    const nextOrSubmit = () => {
      if (!selectedValue.value) return;
      
      if (currentIndex.value === assessment.questions.length - 1) {
        submit();
      } else {
        currentIndex.value++;
      }
    };
    
    const submit = () => {
      const result = Calculator.calculate(assessment, answers.value);
      const record = {
        id: 'record_' + Date.now(),
        assessmentId: assessment.id,
        assessmentName: assessment.name,
        assessmentIcon: assessment.icon,
        assessmentColor: assessment.color,
        answers: [...answers.value],
        result,
        createdAt: Date.now()
      };
      
      Storage.addRecord(record);
      router.push({ name: 'result', params: { id: record.id } });
    };
    
    return {
      assessment,
      currentIndex,
      currentQuestion,
      selectedValue,
      progress,
      selectOption,
      prev,
      nextOrSubmit
    };
  }
};

const ResultPage = {
  template: `
    <div class="page fade-in" v-if="record">
      <div class="result-header">
        <div class="result-icon">{{ record.assessmentIcon }}</div>
        <div class="result-type">{{ record.result.title }}</div>
        <div class="result-summary">{{ record.result.summary }}</div>
        <div class="result-score">{{ record.result.overallScore }}</div>
        <div class="result-score-label">综合得分</div>
      </div>
      
      <div class="container">
        <div class="card" style="margin-top: 24px;">
          <h3 style="margin-bottom: 16px;">维度分析</h3>
          <div class="dimension-list">
            <div class="dimension-item" v-for="dim in record.result.dimensions" :key="dim.id">
              <div class="dimension-header">
                <div class="dimension-name">{{ dim.name }}</div>
                <div class="dimension-value">{{ dim.score }}</div>
              </div>
              <div class="dimension-bar">
                <div class="dimension-fill" :style="{ width: dim.score + '%' }"></div>
              </div>
              <div class="dimension-desc">{{ dim.desc }}</div>
            </div>
          </div>
        </div>
        
        <div class="card" style="margin-top: 24px;">
          <h3 style="margin-bottom: 16px;">详细解读</h3>
          <div class="result-desc">{{ record.result.desc }}</div>
        </div>
        
        <div class="card" style="margin-top: 24px;">
          <div class="text-muted text-sm text-center">
            完成时间：{{ formatTime(record.createdAt) }}
          </div>
        </div>
        
        <div class="result-footer">
          <div class="btn-group">
            <button class="btn btn-secondary" @click="backToHome">返回首页</button>
            <button class="btn btn-primary" @click="restart">再测一次</button>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const route = VueRouter.useRoute();
    const recordId = route.params.id;
    const records = Storage.getRecords();
    const record = records.find(r => r.id === recordId);
    
    const backToHome = () => {
      router.push({ name: 'home' });
    };
    
    const restart = () => {
      router.push({ name: 'intro', params: { id: record.assessmentId } });
    };
    
    const formatTime = (t) => DateUtils.formatTime(t);
    
    return { record, backToHome, restart, formatTime };
  }
};

const ArchivePage = {
  template: `
    <div class="page fade-in">
      <div class="container">
        <div class="header">
          <div class="header-title">成长档案</div>
          <div class="header-subtitle">记录你的每一步成长</div>
        </div>
        
        <div class="stats-grid" v-if="records.length > 0">
          <div class="stat-card">
            <div class="stat-value">{{ records.length }}</div>
            <div class="stat-label">完成测评</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ avgScore }}</div>
            <div class="stat-label">平均得分</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ thisWeek }}</div>
            <div class="stat-label">近7天</div>
          </div>
        </div>
        
        <div class="section" v-if="records.length > 0">
          <div class="section-header">
            <div class="section-title">测评记录</div>
          </div>
          <div class="record-list">
            <div class="record-card" v-for="item in records" :key="item.id" @click="viewResult(item)">
              <div class="record-icon-wrapper">
                <span class="record-icon">{{ item.assessmentIcon }}</span>
              </div>
              <div class="record-info">
                <div class="record-name">{{ item.assessmentName }}</div>
                <div class="record-result">{{ item.result.title }}</div>
                <div class="record-time">{{ formatTime(item.createdAt) }}</div>
              </div>
              <div class="record-score">{{ item.result.overallScore }}</div>
            </div>
          </div>
        </div>
        
        <div class="empty-state" v-if="records.length === 0">
          <div class="empty-icon">📝</div>
          <div class="empty-text">暂无记录</div>
          <div class="empty-hint">完成测评后，这里会显示你的记录</div>
          <div class="empty-btn">
            <button class="btn btn-primary" @click="goToLibrary">去测评</button>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const records = reactive(Storage.getRecords());
    
    const avgScore = computed(() => {
      if (records.length === 0) return 0;
      const sum = records.reduce((acc, r) => acc + r.result.overallScore, 0);
      return Math.round(sum / records.length);
    });
    
    const thisWeek = computed(() => {
      if (records.length === 0) return 0;
      const now = new Date();
      let count = 0;
      
      for (const record of records) {
        const date = new Date(record.createdAt);
        const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
        
        if (diffDays < 7) {
          count++;
        }
      }
      return count;
    });
    
    const viewResult = (record) => {
      router.push({ name: 'result', params: { id: record.id } });
    };
    
    const goToLibrary = () => {
      router.push({ name: 'library' });
    };
    
    const formatTime = (t) => DateUtils.formatTime(t);
    
    return { records, avgScore, thisWeek, viewResult, goToLibrary, formatTime };
  }
};

const KnowledgePage = {
  template: `
    <div class="page fade-in">
      <div class="container">
        <div class="header">
          <div class="header-title">心理知识</div>
          <div class="header-subtitle">了解心理学，更好地认识自己</div>
        </div>
        
        <div class="article-list">
          <div class="article-card" v-for="article in articles" :key="article.id" @click="viewArticle(article)">
            <div class="article-title">{{ article.title }}</div>
            <div class="article-summary">{{ article.summary }}</div>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const articles = knowledgeArticles;
    
    const viewArticle = (article) => {
      router.push({ name: 'article', params: { id: article.id } });
    };
    
    return { articles, viewArticle };
  }
};

const ArticlePage = {
  template: `
    <div class="page fade-in" v-if="article">
      <div class="container">
        <div class="header" style="padding-bottom: 0; margin-bottom: 24px;">
          <div class="header-title">{{ article.title }}</div>
        </div>
        
        <div class="card">
          <div class="article-content">{{ article.content }}</div>
        </div>
        
        <div style="height: 24px;"></div>
      </div>
    </div>
  `,
  setup() {
    const route = VueRouter.useRoute();
    const articleId = route.params.id;
    const article = knowledgeArticles.find(a => a.id === articleId);
    
    return { article };
  }
};

const ProfilePage = {
  template: `
    <div class="page fade-in">
      <div class="profile-header">
        <div class="profile-avatar-wrapper">
          <div class="profile-avatar">👤</div>
        </div>
        <div class="profile-info">
          <div class="profile-name">{{ settings.userName }}</div>
          <div class="profile-stats">已完成 {{ records.length }} 个测评</div>
        </div>
      </div>
      
      <div class="container">
        <div class="menu-section">
          <div class="menu-item" @click="goTo('settings')">
            <div class="menu-icon">⚙️</div>
            <div class="menu-text">设置</div>
            <div class="menu-arrow">›</div>
          </div>
          <div class="menu-item" @click="goTo('knowledge')">
            <div class="menu-icon">📚</div>
            <div class="menu-text">心理知识</div>
            <div class="menu-arrow">›</div>
          </div>
          <div class="menu-item" @click="goTo('about')">
            <div class="menu-icon">ℹ️</div>
            <div class="menu-text">关于我们</div>
            <div class="menu-arrow">›</div>
          </div>
        </div>
        
        <div class="menu-section">
          <div class="menu-item" @click="showClearConfirm = true">
            <div class="menu-icon">🗑️</div>
            <div class="menu-text danger">清除所有记录</div>
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const settings = reactive(Storage.getSettings());
    const records = reactive(Storage.getRecords());
    const showClearConfirm = ref(false);
    
    watch(showClearConfirm, (val) => {
      if (val) {
        if (confirm('确定要清除所有测评记录吗？此操作不可恢复。')) {
          Storage.clearRecords();
          records.length = 0;
          alert('已清除所有记录');
        }
        showClearConfirm.value = false;
      }
    });
    
    const goTo = (name) => {
      router.push({ name });
    };
    
    return { settings, records, showClearConfirm, goTo };
  }
};

const SettingsPage = {
  template: `
    <div class="page fade-in">
      <div class="container">
        <div class="header" style="padding-bottom: 0; margin-bottom: 24px;">
          <div class="header-title">设置</div>
        </div>
        
        <div class="settings-form">
          <div class="form-item">
            <div class="form-label">昵称</div>
            <input class="form-input" v-model="settings.userName" />
          </div>
          
          <div class="form-item">
            <div class="form-label">通知提醒</div>
            <label class="switch">
              <input type="checkbox" v-model="settings.notifications" />
              <div class="switch-slider"></div>
            </label>
          </div>
          
          <button class="btn btn-primary btn-block" @click="save">保存设置</button>
        </div>
      </div>
    </div>
  `,
  setup() {
    const settings = reactive({ ...Storage.getSettings() });
    
    const save = () => {
      Storage.saveSettings(settings);
      alert('设置已保存');
    };
    
    return { settings, save };
  }
};

const AboutPage = {
  template: `
    <div class="page fade-in">
      <div class="container">
        <div class="about-header">
          <div class="about-logo-wrapper">
            <span class="about-logo">🧠</span>
          </div>
          <div class="about-name">心镜 MindMirror</div>
          <div class="about-version">版本 1.0.0</div>
        </div>
        
        <div class="card">
          <div class="about-content">
            心镜 MindMirror 是一款专业、简洁的心理测评应用。我们希望通过简单易用的方式，帮助你更好地了解自己。
            
            <br><br>
            <strong>⚠️ 重要提示</strong><br>
            本应用提供的测评结果仅供参考，不作为诊断依据。如有专业需求，请咨询专业心理医生或心理咨询师。
            
            <br><br>
            愿每个人都能更好地认识自己，接纳自己。💕
          </div>
        </div>
      </div>
    </div>
  `,
  setup() {
    return {};
  }
};

// ========================================
// Router
// ========================================
const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/library', name: 'library', component: LibraryPage },
  { path: '/intro/:id', name: 'intro', component: IntroPage },
  { path: '/taking/:id', name: 'taking', component: TakingPage },
  { path: '/result/:id', name: 'result', component: ResultPage },
  { path: '/archive', name: 'archive', component: ArchivePage },
  { path: '/knowledge', name: 'knowledge', component: KnowledgePage },
  { path: '/article/:id', name: 'article', component: ArticlePage },
  { path: '/profile', name: 'profile', component: ProfilePage },
  { path: '/settings', name: 'settings', component: SettingsPage },
  { path: '/about', name: 'about', component: AboutPage }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// ========================================
// Main App Component
// ========================================
const App = {
  template: `
    <div>
      <router-view />
      <div class="tab-bar" v-if="showTabBar">
        <div class="tab-item" :class="{ active: currentTab === 'home' }" @click="goToTab('home')">
          <div class="tab-icon">🏠</div>
          <div class="tab-text">首页</div>
        </div>
        <div class="tab-item" :class="{ active: currentTab === 'library' }" @click="goToTab('library')">
          <div class="tab-icon">📋</div>
          <div class="tab-text">测评库</div>
        </div>
        <div class="tab-item" :class="{ active: currentTab === 'archive' }" @click="goToTab('archive')">
          <div class="tab-icon">📊</div>
          <div class="tab-text">档案</div>
        </div>
        <div class="tab-item" :class="{ active: currentTab === 'profile' }" @click="goToTab('profile')">
          <div class="tab-icon">👤</div>
          <div class="tab-text">我的</div>
        </div>
      </div>
    </div>
  `,
  setup() {
    const route = VueRouter.useRoute();
    const mainTabs = ['home', 'library', 'archive', 'profile'];
    
    const currentTab = computed(() => route.name);
    
    const showTabBar = computed(() => {
      return mainTabs.includes(route.name);
    });
    
    const goToTab = (name) => {
      router.push({ name });
    };
    
    return { currentTab, showTabBar, goToTab };
  }
};

// ========================================
// Mount App
// ========================================
const app = createApp(App);
app.use(router);
app.mount('#app');
