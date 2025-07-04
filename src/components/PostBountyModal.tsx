import React, { useState } from 'react';
import { X, Upload, DollarSign, Calendar, Users, Zap } from 'lucide-react';
import { Bounty } from '../types';

interface PostBountyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bounty: Omit<Bounty, 'id' | 'createdAt' | 'applications'>) => void;
}

const PostBountyModal: React.FC<PostBountyModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    reward: '',
    currency: 'USD',
    category: 'development',
    skills: '',
    difficulty: 'Intermediate' as const,
    deadline: '',
    company: '',
    companyLogo: '',
    requirements: '',
    deliverables: '',
    estimatedTime: '1-2 weeks'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bountyData = {
      ...formData,
      reward: parseInt(formData.reward),
      skills: formData.skills.split(',').map(s => s.trim()),
      requirements: formData.requirements.split('\n').filter(r => r.trim()),
      deliverables: formData.deliverables.split('\n').filter(d => d.trim()),
      status: 'open' as const,
      companyLogo: formData.companyLogo || 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100'
    };

    onSubmit(bountyData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-white/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white">Create New Bounty</h2>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Bounty Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
                placeholder="e.g., Build React Dashboard Component"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
                placeholder="e.g., TechCorp"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
              placeholder="Describe the bounty in detail..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Reward Amount *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="number"
                  required
                  value={formData.reward}
                  onChange={(e) => setFormData({...formData, reward: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
                  placeholder="2500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Currency
              </label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({...formData, currency: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white backdrop-blur-sm"
              >
                <option value="USD" className="bg-black">USD</option>
                <option value="EUR" className="bg-black">EUR</option>
                <option value="GBP" className="bg-black">GBP</option>
                <option value="ETH" className="bg-black">ETH</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Deadline *
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="date"
                  required
                  value={formData.deadline}
                  onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white backdrop-blur-sm"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white backdrop-blur-sm"
              >
                <option value="development" className="bg-black">Development</option>
                <option value="design" className="bg-black">Design</option>
                <option value="marketing" className="bg-black">Marketing</option>
                <option value="writing" className="bg-black">Writing</option>
                <option value="research" className="bg-black">Research</option>
                <option value="other" className="bg-black">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({...formData, difficulty: e.target.value as any})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white backdrop-blur-sm"
              >
                <option value="Beginner" className="bg-black">Beginner</option>
                <option value="Intermediate" className="bg-black">Intermediate</option>
                <option value="Advanced" className="bg-black">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Estimated Time
              </label>
              <select
                value={formData.estimatedTime}
                onChange={(e) => setFormData({...formData, estimatedTime: e.target.value})}
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white backdrop-blur-sm"
              >
                <option value="1-2 days" className="bg-black">1-2 days</option>
                <option value="3-5 days" className="bg-black">3-5 days</option>
                <option value="1-2 weeks" className="bg-black">1-2 weeks</option>
                <option value="2-3 weeks" className="bg-black">2-3 weeks</option>
                <option value="1 month+" className="bg-black">1 month+</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Required Skills (comma-separated) *
            </label>
            <input
              type="text"
              required
              value={formData.skills}
              onChange={(e) => setFormData({...formData, skills: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
              placeholder="e.g., React, TypeScript, Tailwind CSS"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Requirements (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.requirements}
              onChange={(e) => setFormData({...formData, requirements: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
              placeholder="3+ years React experience&#10;Portfolio of dashboard projects&#10;TypeScript proficiency"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Deliverables (one per line)
            </label>
            <textarea
              rows={3}
              value={formData.deliverables}
              onChange={(e) => setFormData({...formData, deliverables: e.target.value})}
              className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 text-white placeholder-gray-400 backdrop-blur-sm"
              placeholder="Complete React component&#10;Documentation&#10;Unit tests"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 border border-white/20 text-gray-300 rounded-xl hover:bg-white/5 transition-colors backdrop-blur-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40"
            >
              Create Bounty
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostBountyModal;