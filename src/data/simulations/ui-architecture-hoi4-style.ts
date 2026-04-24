export const HOI4_STYLE_UI = {
  layout: 'TOP_BAR + CENTER_MAP + SIDE_PANEL',
  designPhilosophy: '90%空间给地图，10%给UI，所有数据藏在菜单里',

  topBar: {
    height: 40,
    fixed: true,
    leftSection: [
      {
        id: 'date',
        type: 'date_display',
        width: 100,
        format: 'YYYY年M月D日',
      },
      {
        id: 'speed',
        type: 'speed_controls',
        width: 120,
        buttons: ['⏸️', '▶️', '⏩', '⏩⏩'],
      },
    ],
    centerSection: [
      {
        id: 'core_resources',
        type: 'resource_bar',
        items: [
          { id: 'treasury', icon: '💰', format: '$#{value}B' },
          { id: 'political_capital', icon: '🎯', format: '#{value}' },
          { id: 'research', icon: '🔬', format: '#{value}' },
          { id: 'stability', icon: '⚖️', format: '#{value}%' },
          { id: 'war_support', icon: '⚔️', format: '#{value}%' },
        ],
      },
    ],
    rightSection: [
      {
        id: 'notifications',
        icon: '🔔',
        badge: true,
        dropdown: true,
      },
      {
        id: 'menu',
        icon: '☰',
        dropdown: true,
      },
    ],
  },

  leftSidebar: {
    width: 50,
    mode: 'icon_only',
    expandable: true,
    categories: [
      {
        id: 'politics',
        name: '政治',
        icon: '🏛️',
        color: '#9C27B0',
        submenu: [
          { id: 'national_focus', name: '国策树' },
          { id: 'government', name: '政府' },
          { id: 'parties', name: '政党' },
          { id: 'laws', name: '法律' },
        ],
      },
      {
        id: 'economy',
        name: '经济',
        icon: '💰',
        color: '#2196F3',
        submenu: [
          { id: 'budget', name: '预算' },
          { id: 'industry', name: '工业' },
          { id: 'trade', name: '贸易' },
          { id: 'finance', name: '金融' },
        ],
      },
      {
        id: 'diplomacy',
        name: '外交',
        icon: '🌐',
        color: '#4CAF50',
        submenu: [
          { id: 'relations', name: '国际关系' },
          { id: 'alliances', name: '同盟' },
          { id: 'treaties', name: '条约' },
          { id: 'sanctions', name: '制裁' },
        ],
      },
      {
        id: 'military',
        name: '军事',
        icon: '⚔️',
        color: '#F44336',
        submenu: [
          { id: 'army', name: '陆军' },
          { id: 'navy', name: '海军' },
          { id: 'airforce', name: '空军' },
          { id: 'doctrine', name: '学说' },
        ],
      },
      {
        id: 'research',
        name: '科技',
        icon: '🔬',
        color: '#FF9800',
        submenu: [
          { id: 'research_queue', name: '研究队列' },
          { id: 'tech_tree', name: '科技树' },
          { id: 'projects', name: '重大项目' },
        ],
      },
      {
        id: 'society',
        name: '社会',
        icon: '👥',
        color: '#795548',
        submenu: [
          { id: 'population', name: '人口' },
          { id: 'culture', name: '文化' },
          { id: 'welfare', name: '福利' },
        ],
      },
    ],
  },

  centerArea: {
    default: 'map',
    mapModes: [
      { id: 'political', name: '政治', color: true },
      { id: 'economic', name: '经济', heatmap: true },
      { id: 'diplomatic', name: '外交', relations: true },
      { id: 'military', name: '军事', units: true },
    ],
  },

  rightSidebar: {
    width: 280,
    collapsible: true,
    defaultCollapsed: false,
    widgets: [
      {
        id: 'national_focus',
        name: '国策进行中',
        type: 'progress_card',
        size: 'small',
        collapsible: true,
        showTimer: true,
      },
      {
        id: 'research_in_progress',
        name: '研究中',
        type: 'progress_card',
        size: 'small',
        collapsible: true,
        maxItems: 3,
      },
      {
        id: 'event_pending',
        name: '待处理事件',
        type: 'notification_list',
        size: 'small',
        badge: true,
      },
    ],
  },

  bottomBar: {
    height: 80,
    collapsible: true,
    defaultCollapsed: true,
    widgets: [
      {
        id: 'alert_list',
        type: 'icon_row',
        alerts: [
          { id: 'low_stability', icon: '⚠️', condition: 'stability < 30' },
          { id: 'high_inflation', icon: '💹', condition: 'inflation > 15' },
          { id: 'debt_crisis', icon: '💸', condition: 'debtToGdp > 150' },
          { id: 'election_soon', icon: '🗳️', condition: 'election < 180 days' },
        ],
      },
    ],
  },

  decisionWindows: {
    style: 'hoi4_popup',
    center: true,
    backdrop: true,
    twoButtonMax: true,
  },

  complexityManagement: {
    beginnerMode: {
      enabled: true,
      hideAdvancedSubmenus: true,
      autoHideSidebarDetails: true,
      tooltipsLevel: 'detailed',
      decisionHints: true,
    },
    informationDensity: {
      default: 'low',
      modes: ['minimal', 'low', 'medium', 'high', 'extreme'],
      affects: ['tooltips', 'stats_display', 'warnings'],
    },
  },
}

export const CIVILIZATION_STYLE_QUICK_ACTIONS = {
  position: 'bottom_right_corner',
  size: 60,
  expandable: true,
  actions: [
    {
      id: 'next_turn',
      name: '下一天',
      icon: '⏭️',
      hotkey: 'space',
    },
    {
      id: 'production',
      name: '生产',
      icon: '🏭',
    },
    {
      id: 'research',
      name: '科技',
      icon: '🔬',
    },
    {
      id: 'policies',
      name: '政策',
      icon: '📋',
    },
    {
      id: 'diplomacy',
      name: '外交',
      icon: '🕊️',
    },
  ],
}

export const MENU_CATEGORY_MERGE = {
  MERGED_CATEGORIES: [
    {
      id: 'state_admin',
      name: '国家管理',
      icon: '🏛️',
      merges: ['政治', '法律', '政党', '人口', '福利'],
      tabs: ['政府', '法律', '人口', '政党'],
    },
    {
      id: 'national_economy',
      name: '国民经济',
      icon: '💰',
      merges: ['财政', '工业', '金融', '贸易', '基建'],
      tabs: ['预算', '工业', '金融', '贸易'],
    },
    {
      id: 'power_projection',
      name: '国力投射',
      icon: '🌍',
      merges: ['外交', '军事', '情报', '文化'],
      tabs: ['外交', '军事', '情报', '软实力'],
    },
    {
      id: 'technology_society',
      name: '科技与社会',
      icon: '🔬',
      merges: ['科技', '社会', '文化', '教育'],
      tabs: ['科技树', '研发', '社会', '文化'],
    },
  ],
}

export const TOOLTIP_DESIGN = {
  style: 'hoi4_detailed',
  sections: [
    { id: 'name', size: 'large', bold: true },
    { id: 'description', size: 'normal', italic: false },
    { id: 'effects', header: '效果:', itemized: true, green_red: true },
    { id: 'requirements', header: '要求:', itemized: true },
    { id: 'time', header: '需要时间:' },
  ],
}

export const USA_MINIMAL_UI_PRESET = {
  country: 'USA',
  theme: 'modern_dark',
  topBarResources: ['treasury', 'political_capital', 'stability', 'approval'],
  leftSidebarIcons: 6,
  rightWidgets: 3,
  centerMapDefault: true,
  defaultMenuLayout: '4x_merged_categories',
}

export const UI_DESIGN_SUMMARY = `
🎯 最终UI设计原则 (钢铁雄心 + 文明 结合)

1. 空间分配: 地图优先
   ├─ 90% 游戏区域 = 地图
   └─ 10% 界面元素

2. 左侧边栏: 6个图标 (50px宽)
   🏛️ 政治  → 点开才看到: 国策/政府/政党/法律
   💰 经济  → 点开才看到: 预算/工业/金融/贸易
   🌐 外交  → 点开才看到: 关系/同盟/条约/制裁
   ⚔️ 军事  → 点开才看到: 陆海空/学说
   🔬 科技  → 点开才看到: 队列/科技树/项目
   👥 社会  → 点开才看到: 人口/文化/福利

3. 顶部资源条: 只显示5个核心数字
   💰国库  🎯政治点  🔬研究点  ⚖️稳定  ⚔️战争支持

4. 右侧: 3个小卡片 (可收起)
   📌 国策进行中 + 进度条
   📌 研究中 x 3
   📌 待处理事件

5. 地图模式切换
   🗺️ 政治/经济/外交/军事 四种视图

✨ 核心理念:
   默认打开游戏看到的 = 地图 + 十几个按钮
   所有复杂的数据 = 点击菜单才显示
   所有复杂的计算 = 鼠标悬停tooltip才显示
`
