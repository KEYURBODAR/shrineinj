import React from 'react';
import { TrendingUp, Users, Award, Building } from 'lucide-react';

const StatsBar: React.FC = () => {
  const stats = [
    {
      icon: TrendingUp,
      label: 'Total Rewards',
      value: '$7,186,710',
      subtext: 'USD'
    },
    {
      icon: Award,
      label: 'Opportunities',
      value: '1,946',
      subtext: 'Listed'
    },
    {
      icon: Users,
      label: 'Participants',
      value: '110,330+',
      subtext: 'Registered'
    },
    {
      icon: Building,
      label: 'Sponsors',
      value: '250+',
      subtext: 'Companies'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
              <div className="text-xs text-gray-500">{stat.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsBar;