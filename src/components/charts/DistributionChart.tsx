import { Card } from '@/components/atoms';

interface DistributionChartProps {
  data: { range: string; count: number; percentage: number }[];
  title?: string;
  className?: string;
}

export function DistributionChart({ data, title, className }: DistributionChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count));

  return (
    <Card className={className}>
      {title && (
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
      )}
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.range}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-700 dark:text-gray-300">{item.range}</span>
              <span className="text-gray-500 dark:text-gray-400">
                {item.count}人 ({item.percentage}%)
              </span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${(item.count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
