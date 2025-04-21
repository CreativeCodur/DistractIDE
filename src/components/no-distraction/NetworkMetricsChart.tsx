import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { NetworkMetrics } from '../../context/NetworkContext';
import { useTheme } from '../../context/ThemeContext';

interface NetworkMetricsChartProps {
  metrics: NetworkMetrics;
}

const NetworkMetricsChart: React.FC<NetworkMetricsChartProps> = ({ metrics }) => {
  const { theme } = useTheme();

  // Prepare data for the chart
  const data = metrics.epochs.map((epoch, index) => ({
    round: epoch,
    accuracy: metrics.values[index]
  }));

  // Define colors based on theme
  const textColor = theme === 'dark' ? '#f3f4f6' : '#1f2937';
  const gridColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

  return (
    <div className="h-48">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 5, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
          <XAxis
            dataKey="round"
            label={{ value: 'Rounds', position: 'insideBottom', offset: -5 }}
            stroke={textColor}
          />
          <YAxis
            label={{ value: 'Model Accuracy (%)', angle: -90, position: 'insideLeft', offset: -5 }}
            domain={[
              Math.floor(Math.min(...metrics.values) - 5),
              Math.ceil(Math.max(...metrics.values) + 5)
            ]}
            stroke={textColor}
            width={80}
          />
          <Tooltip
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Model Accuracy']}
            contentStyle={{
              backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
              borderColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
              color: textColor
            }}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ fill: '#0ea5e9', r: 4 }}
            activeDot={{ r: 6, fill: '#0ea5e9' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NetworkMetricsChart;
