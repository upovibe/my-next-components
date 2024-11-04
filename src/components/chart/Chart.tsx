import React, { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
  BubbleController,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Line, Bar, Pie, Doughnut, Radar, PolarArea, Bubble } from 'react-chartjs-2';

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
  BubbleController
);

// Define chart types (removed 'scatter')
type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble';

// Define chart props with type safety
interface ChartProps<TType extends ChartType> {
  type: TType;
  data: ChartData<TType>;
  options?: ChartOptions<TType>;
  className?: string;
}

const Chart = <TType extends ChartType>({
  type,
  data,
  options,
  className = '',
}: ChartProps<TType>) => {
  // Memoize the render logic for the specific chart type
  const renderChart = useMemo(() => {
    switch (type) {
      case 'line':
        return <Line data={data} options={options} />;
      case 'bar':
        return <Bar data={data} options={options} />;
      case 'pie':
        return <Pie data={data} options={options} />;
      case 'doughnut':
        return <Doughnut data={data} options={options} />;
      case 'radar':
        return <Radar data={data} options={options} />;
      case 'polarArea':
        return <PolarArea data={data} options={options} />;
      case 'bubble':
        return <Bubble data={data} options={options} />;
      default:
        return null;
    }
  }, [type, data, options]);

  return <div className={`relative w-full h-full mx-auto ${className}`}>{renderChart}</div>;
};

export default Chart;
