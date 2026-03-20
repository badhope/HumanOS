import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import { Button, Card } from '@/components/atoms';

const NotFound: FC = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="relative z-10 mx-auto max-w-md text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8">
            <div className="mb-6 text-8xl font-bold text-primary-500">404</div>
            <h1 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
              页面不存在
            </h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">
              抱歉，您访问的页面不存在或已被移除。
            </p>
            <div className="flex flex-col gap-4">
              <Link to="/">
                <Button size="lg" leftIcon={<Home className="w-5 h-5" />} className="w-full">
                  返回首页
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                leftIcon={<ArrowLeft className="w-5 h-5" />}
                onClick={() => window.history.back()}
                className="w-full"
              >
                返回上一页
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
