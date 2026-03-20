import type { FC } from 'react';
import { Inbox } from 'lucide-react';
import { StatusPageTemplate } from '@/components/molecules/StatusPageTemplate';

interface EmptyProps {
  title?: string;
  message?: string;
  description?: string;
}

const Empty: FC<EmptyProps> = ({
  title = '暂无内容',
  message = '这里还没有任何测评',
  description = '该分类下暂时没有可用的测评内容，请稍后再来',
}) => {
  return (
    <StatusPageTemplate
      icon={<Inbox className="h-10 w-10" />}
      iconBgColor="bg-gray-100 dark:bg-gray-800"
      iconColor="text-gray-500 dark:text-gray-400"
      title={title}
      description={description}
      statusType="empty"
      details={{
        title: '提示',
        items: [message, '您可以先体验其他类别的测评', '我们会持续更新内容'],
      }}
      primaryAction={{
        label: '浏览所有测评',
        onClick: () => { window.location.hash = '#/categories'; },
      }}
    />
  );
};

export default Empty;
