import type { FC } from 'react';
import { Ban } from 'lucide-react';
import { StatusPageTemplate } from '@/components/molecules/StatusPageTemplate';

interface UnavailableProps {
  moduleName?: string;
  reason?: string;
}

const Unavailable: FC<UnavailableProps> = ({
  moduleName = '该模块',
  reason = '该测评模块当前不可用',
}) => {
  return (
    <StatusPageTemplate
      icon={<Ban className="h-10 w-10" />}
      iconBgColor="bg-gray-100 dark:bg-gray-800"
      iconColor="text-gray-500 dark:text-gray-400"
      title={`${moduleName} 暂不可用`}
      description={reason}
      statusType="unavailable"
      details={{
        title: '可能原因',
        items: [
          '模块正在维护中',
          '该功能暂时关闭',
          '如需帮助请联系支持',
        ],
      }}
      primaryAction={{
        label: '浏览可用测评',
        onClick: () => { window.location.hash = '#/categories'; },
      }}
    />
  );
};

export default Unavailable;
