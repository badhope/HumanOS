import { useState } from 'react';
import { useAppStore } from '../store';
import { getTranslation } from '../i18n';
import { cn } from '../lib/utils';

interface CrisisResource {
  icon: string;
  nameZh: string;
  nameEn: string;
  phone: string;
  descriptionZh: string;
  descriptionEn: string;
  availableZh: string;
  availableEn: string;
  type: 'hotline' | 'online' | 'organization';
}

interface SelfHelpResource {
  icon: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  stepsZh: string[];
  stepsEn: string[];
}

const CRISIS_RESOURCES: CrisisResource[] = [
  {
    icon: '📞',
    nameZh: '全国心理援助热线',
    nameEn: 'National Psychological Aid Hotline',
    phone: '010-82951332',
    descriptionZh: '24小时免费心理危机干预热线，由专业心理咨询师接听',
    descriptionEn: '24/7 free psychological crisis intervention hotline answered by professional counselors',
    availableZh: '24小时',
    availableEn: '24/7',
    type: 'hotline',
  },
  {
    icon: '📞',
    nameZh: '北京心理危机研究与干预中心',
    nameEn: 'Beijing Crisis Intervention Center',
    phone: '010-82951332',
    descriptionZh: '提供专业的心理危机干预服务，包括电话咨询和面询',
    descriptionEn: 'Professional psychological crisis intervention services including phone and in-person counseling',
    availableZh: '24小时',
    availableEn: '24/7',
    type: 'hotline',
  },
  {
    icon: '📞',
    nameZh: '生命热线',
    nameEn: 'Life Hotline',
    phone: '400-161-9995',
    descriptionZh: '全国性生命教育与危机干预热线',
    descriptionEn: 'National life education and crisis intervention hotline',
    availableZh: '24小时',
    availableEn: '24/7',
    type: 'hotline',
  },
  {
    icon: '📞',
    nameZh: '希望24热线',
    nameEn: 'Hope 24 Hotline',
    phone: '400-161-9995',
    descriptionZh: '提供全天候的心理援助和生命危机干预',
    descriptionEn: '24/7 psychological aid and life crisis intervention',
    availableZh: '24小时',
    availableEn: '24/7',
    type: 'hotline',
  },
  {
    icon: '💻',
    nameZh: '壹心理在线咨询',
    nameEn: 'Xinli001 Online Counseling',
    phone: 'www.xinli001.com',
    descriptionZh: '专业在线心理咨询平台，提供文字、语音、视频咨询',
    descriptionEn: 'Professional online counseling platform with text, voice, and video options',
    availableZh: '24小时',
    availableEn: '24/7',
    type: 'online',
  },
  {
    icon: '💻',
    nameZh: '简单心理',
    nameEn: 'Jiandanxinli',
    phone: 'www.jiandanxinli.com',
    descriptionZh: '提供专业心理咨询师匹配和在线咨询服务',
    descriptionEn: 'Professional counselor matching and online counseling services',
    availableZh: '24小时',
    availableEn: '24/7',
    type: 'online',
  },
  {
    icon: '🏥',
    nameZh: '北京大学第六医院',
    nameEn: 'Peking University Sixth Hospital',
    phone: '010-82801984',
    descriptionZh: '国家精神心理疾病临床医学研究中心',
    descriptionEn: 'National Clinical Research Center for Mental Disorders',
    availableZh: '工作日 8:00-17:00',
    availableEn: 'Weekdays 8:00-17:00',
    type: 'organization',
  },
  {
    icon: '🏥',
    nameZh: '上海市精神卫生中心',
    nameEn: 'Shanghai Mental Health Center',
    phone: '021-64387250',
    descriptionZh: '上海市最大的精神卫生专科医院',
    descriptionEn: "Shanghai's largest specialized mental health hospital",
    availableZh: '工作日 8:00-17:00',
    availableEn: 'Weekdays 8:00-17:00',
    type: 'organization',
  },
];

const SELF_HELP_RESOURCES: SelfHelpResource[] = [
  {
    icon: '🫁',
    titleZh: '呼吸放松法',
    titleEn: 'Breathing Relaxation',
    descriptionZh: '通过控制呼吸节奏来缓解紧张和焦虑',
    descriptionEn: 'Relieve tension and anxiety by controlling breathing rhythm',
    stepsZh: ['找一个舒适的坐姿，闭上眼睛', '慢慢吸气4秒，感受腹部膨胀', '屏住呼吸7秒', '缓慢呼气8秒，感受身体放松', '重复4-8次'],
    stepsEn: ['Sit comfortably and close your eyes', 'Inhale slowly for 4 seconds, feel your belly expand', 'Hold your breath for 7 seconds', 'Exhale slowly for 8 seconds, feel your body relax', 'Repeat 4-8 times'],
  },
  {
    icon: '🧊',
    titleZh: '5-4-3-2-1 接地技术',
    titleEn: '5-4-3-2-1 Grounding Technique',
    descriptionZh: '帮助你在焦虑或恐慌时回到当下',
    descriptionEn: 'Help you return to the present during anxiety or panic',
    stepsZh: ['看周围5样东西，说出它们的名字', '触摸4样东西，感受它们的质地', '听3种声音，辨别它们的来源', '闻2种气味，描述它们的特点', '尝1种味道，专注感受'],
    stepsEn: ['Look at 5 things around you and name them', 'Touch 4 things and feel their texture', 'Listen to 3 sounds and identify their source', 'Smell 2 scents and describe them', 'Taste 1 thing and focus on the sensation'],
  },
  {
    icon: '🚶',
    titleZh: '安全空间想象',
    titleEn: 'Safe Space Visualization',
    descriptionZh: '在脑海中构建一个安全、平静的空间',
    descriptionEn: 'Build a safe, peaceful space in your mind',
    stepsZh: ['闭上眼睛，深呼吸3次', '想象一个让你感到安全的地方', '注意这个地方的颜色、声音、气味', '感受这个地方的温度和触感', '在这里停留几分钟，享受平静'],
    stepsEn: ['Close your eyes and take 3 deep breaths', 'Imagine a place where you feel safe', 'Notice the colors, sounds, and scents', 'Feel the temperature and textures', 'Stay here for a few minutes, enjoy the peace'],
  },
];

export function CrisisResources() {
  const { locale } = useAppStore();
  const i18n = getTranslation(locale);
  const t = i18n.crisis;
  const [activeTab, setActiveTab] = useState<'hotlines' | 'selfhelp' | 'warning'>('hotlines');
  const [expandedResource, setExpandedResource] = useState<string | null>(null);

  const tabs = [
    { key: 'hotlines' as const, label: t.hotlines, icon: '📞' },
    { key: 'selfhelp' as const, label: t.selfHelp, icon: '🧘' },
    { key: 'warning' as const, label: t.warningSigns, icon: '⚠️' },
  ];

  const warningSigns = locale === 'zh' ? [
    { icon: '😔', title: '持续情绪低落', desc: '超过两周的持续悲伤、空虚或绝望感' },
    { icon: '😴', title: '睡眠障碍', desc: '严重失眠或过度嗜睡，影响日常生活' },
    { icon: '🍽️', title: '食欲显著变化', desc: '食欲明显增加或减少，体重显著变化' },
    { icon: '⚡', title: '精力严重不足', desc: '即使简单的事情也感到极度疲惫' },
    { icon: '🚫', title: '丧失兴趣', desc: '对以前喜欢的活动完全失去兴趣' },
    { icon: '💭', title: '反复消极想法', desc: '反复出现无价值感、自责或死亡念头' },
    { icon: '😰', title: '严重焦虑', desc: '无法控制的担忧、恐慌发作' },
    { icon: '🤝', title: '社交退缩', desc: '完全回避社交，与亲友断绝联系' },
  ] : [
    { icon: '😔', title: 'Persistent Low Mood', desc: 'Sadness, emptiness, or hopelessness lasting more than 2 weeks' },
    { icon: '😴', title: 'Sleep Disturbance', desc: 'Severe insomnia or oversleeping affecting daily life' },
    { icon: '🍽️', title: 'Significant Appetite Changes', desc: 'Marked increase or decrease in appetite with weight changes' },
    { icon: '⚡', title: 'Severe Fatigue', desc: 'Feeling extremely exhausted even with simple tasks' },
    { icon: '🚫', title: 'Loss of Interest', desc: 'Complete loss of interest in previously enjoyed activities' },
    { icon: '💭', title: 'Recurring Negative Thoughts', desc: 'Repeated feelings of worthlessness, self-blame, or thoughts of death' },
    { icon: '😰', title: 'Severe Anxiety', desc: 'Uncontrollable worry or panic attacks' },
    { icon: '🤝', title: 'Social Withdrawal', desc: 'Completely avoiding social contact, cutting off from friends and family' },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
          {t.title}
        </h1>
        <p className="text-slate-500 mt-2">{t.subtitle}</p>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">🆘</span>
          <div>
            <h3 className="font-semibold text-red-800">{t.emergencyTitle}</h3>
            <p className="text-sm text-red-700 mt-1">{t.emergencyDesc}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <a href="tel:010-82951332" className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                📞 010-82951332
              </a>
              <a href="tel:4001619995" className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors">
                📞 400-161-9995
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              'flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2',
              activeTab === tab.key
                ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
            )}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hotlines' && (
        <div className="space-y-4">
          {CRISIS_RESOURCES.map((resource, idx) => {
            const isExpanded = expandedResource === `r-${idx}`;
            const availText = locale === 'zh' ? resource.availableZh : resource.availableEn;
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setExpandedResource(isExpanded ? null : `r-${idx}`)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center text-2xl shrink-0">
                    {resource.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-slate-800">
                      {locale === 'zh' ? resource.nameZh : resource.nameEn}
                    </h3>
                    <p className="text-sm text-blue-600 font-mono mt-0.5">{resource.phone}</p>
                  </div>
                  <span className={cn(
                    'text-xs px-2 py-1 rounded-full font-medium',
                    resource.type === 'hotline' ? 'bg-red-50 text-red-600' :
                    resource.type === 'online' ? 'bg-blue-50 text-blue-600' :
                    'bg-green-50 text-green-600'
                  )}>
                    {availText}
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t border-slate-100">
                    <p className="text-sm text-slate-600 mt-3">
                      {locale === 'zh' ? resource.descriptionZh : resource.descriptionEn}
                    </p>
                    {resource.type === 'hotline' && (
                      <a
                        href={`tel:${resource.phone}`}
                        className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-orange-600 transition-all"
                      >
                        📞 {t.callNow}
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'selfhelp' && (
        <div className="space-y-4">
          {SELF_HELP_RESOURCES.map((resource, idx) => {
            const isExpanded = expandedResource === `sh-${idx}`;
            return (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setExpandedResource(isExpanded ? null : `sh-${idx}`)}
                  className="w-full p-5 flex items-center gap-4 text-left"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center text-2xl shrink-0">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-800">
                      {locale === 'zh' ? resource.titleZh : resource.titleEn}
                    </h3>
                    <p className="text-sm text-slate-500 mt-0.5">
                      {locale === 'zh' ? resource.descriptionZh : resource.descriptionEn}
                    </p>
                  </div>
                  <span className="text-slate-400">{isExpanded ? '▲' : '▼'}</span>
                </button>
                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 border-t border-slate-100">
                    <div className="mt-3 space-y-3">
                      {(locale === 'zh' ? resource.stepsZh : resource.stepsEn).map((step, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          <p className="text-sm text-slate-700 pt-0.5">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {activeTab === 'warning' && (
        <div className="space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 mb-4">
            <p className="text-sm text-amber-800">
              {locale === 'zh'
                ? '如果你或你认识的人出现以下症状，请及时寻求专业帮助。这些症状可能是心理健康问题的信号。'
                : 'If you or someone you know shows these signs, please seek professional help. These may be signs of mental health issues.'}
            </p>
          </div>
          {warningSigns.map((sign, idx) => (
            <div key={idx} className="bg-white rounded-xl p-4 border border-slate-200 flex items-start gap-3">
              <span className="text-xl">{sign.icon}</span>
              <div>
                <h4 className="font-medium text-slate-800">{sign.title}</h4>
                <p className="text-sm text-slate-500 mt-0.5">{sign.desc}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
        <h3 className="font-semibold text-slate-700 mb-2">{t.disclaimerTitle}</h3>
        <p className="text-sm text-slate-500">{t.disclaimer}</p>
      </div>
    </div>
  );
}
