import React from 'react';
import { Clock, Users, MapPin, CheckCircle, Calendar, DollarSign } from 'lucide-react';
import { Bounty } from '../types';

interface BountyCardProps {
  bounty: Bounty;
  onClick: () => void;
}

const BountyCard: React.FC<BountyCardProps> = ({ bounty, onClick }) => {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'content': return 'bg-green-50 text-green-700 border-green-200';
      case 'design': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'development': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'research': return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'marketing': return 'bg-pink-50 text-pink-700 border-pink-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Bounty': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Project': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Grant': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatReward = () => {
    if (bounty.compensationType === 'range' && bounty.minReward && bounty.maxReward) {
      return `$${bounty.minReward.toLocaleString()} - $${bounty.maxReward.toLocaleString()}`;
    }
    return `$${bounty.reward.toLocaleString()}`;
  };

  const getDaysLeft = () => {
    const deadline = new Date(bounty.deadline);
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Expired';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4 flex-1">
          {/* Company Logo */}
          <div className="relative">
            <div className="w-12 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0">
              <img
                src={bounty.companyLogo}
                alt={bounty.company}
                className="w-full h-full object-cover"
              />
            </div>
            {bounty.isVerified && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            {/* Title and Company */}
            <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
              {bounty.title}
            </h3>
            <p className="text-gray-600 mb-3">{bounty.company}</p>

            {/* Tags */}
            <div className="flex items-center space-x-2 mb-3">
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getTypeColor(bounty.type)}`}>
                {bounty.type}
              </span>
              <span className={`px-2 py-1 rounded-md text-xs font-medium border ${getCategoryColor(bounty.category)}`}>
                {bounty.category}
              </span>
              <span className="px-2 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
                {bounty.difficulty}
              </span>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 mb-3">
              {bounty.skills.slice(0, 4).map((skill, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                >
                  {skill}
                </span>
              ))}
              {bounty.skills.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  +{bounty.skills.length - 4} more
                </span>
              )}
            </div>

            {/* Meta Info */}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{getDaysLeft()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{bounty.applications} applied</span>
              </div>
              {bounty.totalWinners && (
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>{bounty.totalWinners} winner{bounty.totalWinners > 1 ? 's' : ''}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reward */}
        <div className="text-right">
          <div className="flex items-center space-x-1 text-xl font-bold text-gray-900 mb-1">
            <DollarSign className="w-5 h-5 text-green-600" />
            <span>{formatReward()}</span>
          </div>
          <div className="text-sm text-gray-500">{bounty.currency}</div>
          {bounty.compensationType === 'range' && (
            <div className="text-xs text-gray-400 mt-1">Range</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BountyCard;