import type { FC } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Construction, CheckCircle } from 'lucide-react';
import { StatusPageTemplate } from '@/components/molecules/StatusPageTemplate';

const Maintenance: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const moduleName = searchParams.get('name') || '';
  const isCompleted = searchParams.get('completed') === 'true';

  if (isCompleted) {
    return (
      <StatusPageTemplate
        icon={<CheckCircle className="h-10 w-10" />}
        iconBgColor="bg-green-100 dark:bg-green-900/30"
        iconColor="text-green-600 dark:text-green-400"
        title={moduleName ? `${moduleName} 测评完成` : '测评完成'}
        description="您的答案已保存，该模块的详细报告正在制作中"
        statusType="preparing"
        details={{
          title: '感谢您的参与',
          items: [
            '您的测评结果已本地保存',
            '详细分析报告即将上线',
            '您可以先体验其他已开放的模块',
          ],
        }}
        primaryAction={{
          label: '体验 MBTI 测评',
          onClick: () => navigate('/quiz/mbti-basic'),
        }}
        secondaryAction={{
          label: '查看所有测评',
          onClick: () => navigate('/categories'),
        }}
      />
    );
  }

  return (
    <StatusPageTemplate
      icon={<Construction className="h-10 w-10" />}
      iconBgColor="bg-amber-100 dark:bg-amber-900/30"
      iconColor="text-amber-600 dark:text-amber-400"
      title={moduleName ? `${moduleName} 模块维护中` : '模块维护中'}
      description="该模块正在完善中，敬请期待"
      statusType="maintenance"
      details={{
        title: '已有完整模块',
        items: [
          'MBTI 职业性格测试 - 完整可用',
          '16种人格类型分析',
          '四维性格倾向解读',
          '个性化建议与发展指南',
        ],
      }}
      primaryAction={{
        label: '立即体验 MBTI',
        onClick: () => navigate('/quiz/mbti-basic'),
      }}
      secondaryAction={{
        label: '返回测评分类',
        onClick: () => navigate('/categories'),
      }}
    />
  );
};

export default Maintenance;
