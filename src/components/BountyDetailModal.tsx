import React, { useState } from 'react';
import { X, DollarSign, Calendar, Clock, Users, Star, CheckCircle, ArrowRight, MapPin, ExternalLink, Shield } from 'lucide-react';
import { Bounty } from '../types';

interface BountyDetailModalProps {
  bounty: Bounty;
  isOpen: boolean;
  onClose: () => void;
}

const BountyDetailModal: React.FC<BountyDetailModalProps> = ({ bounty, isOpen, onClose }) => {
  const [showApplication, setShowApplication] = useState(false);
  const [applicationData, setApplicationData] = useState({
    message: '',
    timeline: '',
    portfolio: ''
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', applicationData);
    setShowApplication(false);
    onClose();
  };

  if (!isOpen) return null;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-50 text-green-700 border-green-200';
      case 'Intermediate': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Advanced': return 'bg-red-50 text-red-700 border-red-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'development': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'design': return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'marketing': return 'bg-pink-50 text-pink-700 border-pink-200';
      case 'writing': return 'bg-green-50 text-green-700 border-green-200';
      case 'research': return 'bg-orange-50 text-orange-700 border-orange-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const formatReward = () => {
    if (bounty.compensationType === 'range' && bounty.minReward && bounty.maxReward) {
      return `$${bounty.minReward.toLocaleString()} - $${bounty.maxReward.toLocaleString()}`;
    }
    return `$${bounty.reward.toLocaleString()}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src={bounty.companyLogo}
                  alt={bounty.company}
                  className="w-16 h-16 rounded-xl object-cover border border-gray-200"
                />
                {bounty.isVerified && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{bounty.title}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <p className="text-gray-600">{bounty.company}</p>
                  {bounty.isVerified && (
                    <div className="flex items-center space-x-1 text-blue-600">
                      <Shield className="w-4 h-4" />
                      <span className="text-sm">Verified</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2 mt-2">
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getCategoryColor(bounty.category)}`}>
                    {bounty.category}
                  </span>
                  <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(bounty.difficulty)}`}>
                    {bounty.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-lg text-sm font-medium bg-purple-50 text-purple-700 border border-purple-200">
                    {bounty.type}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Description</h3>
                  <p className="text-gray-700 leading-relaxed">{bounty.description}</p>
                </div>

                {bounty.requirements.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h3>
                    <ul className="space-y-3">
                      {bounty.requirements.map((req, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {bounty.deliverables.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Deliverables</h3>
                    <ul className="space-y-3">
                      {bounty.deliverables.map((deliverable, index) => (
                        <li key={index} className="flex items-start space-x-3">
                          <ArrowRight className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {bounty.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium border border-purple-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sticky top-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2 text-3xl font-bold text-gray-900 mb-2">
                    <DollarSign className="w-8 h-8 text-green-600" />
                    <span>{formatReward()}</span>
                  </div>
                  <p className="text-gray-600">{bounty.currency}</p>
                  {bounty.compensationType === 'range' && (
                    <p className="text-sm text-gray-500 mt-1">Range based on quality</p>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Deadline</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {new Date(bounty.deadline).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Estimated Time</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{bounty.estimatedTime}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-700">Applications</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{bounty.applications}</span>
                  </div>

                  {bounty.totalWinners && (
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center space-x-2">
                        <Star className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Winners</span>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{bounty.totalWinners}</span>
                    </div>
                  )}
                </div>

                {!showApplication ? (
                  <div className="space-y-3">
                    <button
                      onClick={() => setShowApplication(true)}
                      className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                    >
                      Apply Now
                    </button>
                    <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                      Save for Later
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Application Message
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={applicationData.message}
                        onChange={(e) => setApplicationData({...applicationData, message: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="Why are you the best fit for this opportunity?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Timeline
                      </label>
                      <input
                        type="text"
                        required
                        value={applicationData.timeline}
                        onChange={(e) => setApplicationData({...applicationData, timeline: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="e.g., 5-7 days"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Portfolio/Examples
                      </label>
                      <input
                        type="url"
                        value={applicationData.portfolio}
                        onChange={(e) => setApplicationData({...applicationData, portfolio: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500 text-sm"
                        placeholder="https://portfolio.com"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => setShowApplication(false)}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg font-medium hover:bg-gray-50 transition-colors text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 bg-purple-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-purple-700 transition-colors text-sm"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BountyDetailModal;