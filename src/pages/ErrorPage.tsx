import type { FC } from 'react';
import { AlertTriangle } from 'lucide-react';
import { StatusPageTemplate } from '@/components/molecules/StatusPageTemplate';

interface ErrorPageProps {
  title?: string;
  message?: string;
  errorCode?: string;
}

const ErrorPage: FC<ErrorPageProps> = ({
  title = '出错了',
  message = '抱歉，发生了错误',
  errorCode,
}) => {
  return (
    <StatusPageTemplate
      icon={<AlertTriangle className="h-10 w-10" />}
      iconBgColor="bg-red-100 dark:bg-red-900/30"
      iconColor="text-red-600 dark:text-red-400"
      title={title}
      description={message}
      statusType="error"
      details={{
        title: '错误信息',
        items: errorCode ? [`错误代码: ${errorCode}`] : ['未知错误', '请尝试刷新页面'],
      }}
      primaryAction={{
        label: '刷新页面',
        onClick: () => { window.location.reload(); },
      }}
      secondaryAction={{
        label: '返回首页',
        onClick: () => { window.location.hash = '#/'; },
      }}
    />
  );
};

export default ErrorPage;
