import type { FC } from 'react';
import { Sparkles } from 'lucide-react';
import { StatusPageTemplate } from '@/components/molecules/StatusPageTemplate';

interface PreparingProps {
  moduleName?: string;
  estimatedTime?: string;
}

const Preparing: FC<PreparingProps> = ({ moduleName = '该模块', estimatedTime }) => {
  return (
    <StatusPageTemplate
      icon={<Sparkles className="h-10 w-10" />}
      iconBgColor="bg-blue-100 dark:bg-blue-900/30"
      iconColor="text-blue-600 dark:text-blue-400"
      title={`${moduleName} 正在准备中`}
      description="该测评模块正在精心准备中，敬请期待"
      statusType="preparing"
      details={{
        title: '即将推出',
        items: estimatedTime
          ? [`预计开放时间: ${estimatedTime}`, '内容正在精心准备', '我们会尽快与您见面']
          : ['内容正在精心准备', '完善后将第一时间开放', '感谢您的耐心等待'],
      }}
      alternativeModules={[
        { name: 'MBTI 职业性格测试', description: '完整版测评', status: '✅ 可用' },
      ]}
      primaryAction={{
        label: '体验 MBTI 测评',
        onClick: () => { window.location.hash = '#/quiz/mbti-basic'; },
      }}
    />
  );
};

export default Preparing;
