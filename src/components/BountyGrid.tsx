import React, { useState } from 'react';
import BountyCard from './BountyCard';
import { Bounty } from '../types';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface BountyGridProps {
  searchTerm: string;
  selectedCategory: string;
  selectedType: string;
  onBountyClick: (bounty: Bounty) => void;
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: string) => void;
}

const mockBounties: Bounty[] = [
  {
    id: '1',
    title: 'Voice Actor for Crypto Content Channel',
    description: 'We need a professional voice actor for our crypto education YouTube channel. Must have clear pronunciation and engaging delivery.',
    reward: 1500,
    currency: 'USDC',
    category: 'content',
    skills: ['Voice Acting', 'Audio Production', 'Crypto Knowledge'],
    difficulty: 'Intermediate',
    deadline: '2024-01-15',
    status: 'open',
    createdAt: '2024-01-01',
    company: 'Cryptowood',
    companyLogo: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    applications: 6,
    requirements: ['Professional voice acting experience', 'Understanding of crypto terminology', 'High-quality recording equipment'],
    deliverables: ['Voice-over recordings', 'Raw audio files', 'Script reading'],
    estimatedTime: '6h',
    type: 'Project',
    isVerified: true,
    totalWinners: 1,
    compensationType: 'fixed',
    applicationDeadline: '2024-01-10',
    submissionDeadline: '2024-01-15'
  },
  {
    id: '2',
    title: 'Ballies Product Roast Bounty',
    description: 'Provide detailed feedback and constructive criticism on our new DeFi product. Help us identify pain points and improvement areas.',
    reward: 250,
    currency: 'USDC',
    category: 'content',
    skills: ['Product Analysis', 'UX Review', 'DeFi Knowledge'],
    difficulty: 'Beginner',
    deadline: '2024-01-20',
    status: 'open',
    createdAt: '2024-01-02',
    company: 'Badchain (Bandit Network)',
    companyLogo: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    applications: 12,
    requirements: ['DeFi product experience', 'Analytical thinking', 'Clear communication'],
    deliverables: ['Detailed feedback report', 'UX improvement suggestions', 'Competitive analysis'],
    estimatedTime: '7h',
    type: 'Bounty',
    isVerified: true,
    totalWinners: 3,
    compensationType: 'fixed'
  },
  {
    id: '3',
    title: 'Write a report on Solana DePIN',
    description: 'Research and write a comprehensive report on Solana\'s Decentralized Physical Infrastructure Networks (DePIN) ecosystem.',
    reward: 2250,
    currency: 'USDC',
    category: 'research',
    skills: ['Research', 'Technical Writing', 'Solana', 'DePIN'],
    difficulty: 'Advanced',
    deadline: '2024-01-25',
    status: 'open',
    createdAt: '2024-01-03',
    company: 'Solana Foundation',
    companyLogo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    applications: 29,
    requirements: ['Deep understanding of Solana ecosystem', 'Technical writing experience', 'DePIN knowledge'],
    deliverables: ['Comprehensive research report', 'Market analysis', 'Future predictions'],
    estimatedTime: '8h',
    type: 'Bounty',
    isVerified: true,
    totalWinners: 1,
    compensationType: 'fixed'
  },
  {
    id: '4',
    title: 'LayerZero Solana Integration',
    description: 'Develop integration examples and documentation for LayerZero protocol on Solana blockchain.',
    reward: 20000,
    currency: 'USDC',
    category: 'development',
    skills: ['Solana', 'Rust', 'LayerZero', 'Smart Contracts'],
    difficulty: 'Advanced',
    deadline: '2024-02-01',
    status: 'open',
    createdAt: '2024-01-04',
    company: 'LayerZero Labs',
    companyLogo: 'https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    applications: 14,
    requirements: ['Expert Solana development', 'LayerZero protocol knowledge', 'Rust programming'],
    deliverables: ['Integration code', 'Documentation', 'Testing suite'],
    estimatedTime: '9h',
    type: 'Bounty',
    isVerified: true,
    totalWinners: 2,
    compensationType: 'fixed'
  },
  {
    id: '5',
    title: 'DeFi Protocol Security Audit',
    description: 'Conduct a comprehensive security audit of our DeFi smart contracts. Identify vulnerabilities and provide recommendations.',
    reward: 5000,
    minReward: 3000,
    maxReward: 8000,
    currency: 'USDC',
    category: 'development',
    skills: ['Smart Contracts', 'Security', 'Solidity', 'Auditing'],
    difficulty: 'Advanced',
    deadline: '2024-02-10',
    status: 'open',
    createdAt: '2024-01-05',
    company: 'DeFi Protocol',
    companyLogo: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    applications: 8,
    requirements: ['Smart contract auditing experience', 'Security expertise', 'Solidity proficiency'],
    deliverables: ['Security audit report', 'Vulnerability assessment', 'Recommendations'],
    estimatedTime: '2 weeks',
    type: 'Bounty',
    isVerified: true,
    totalWinners: 1,
    compensationType: 'range'
  },
  {
    id: '6',
    title: 'NFT Marketplace UI/UX Design',
    description: 'Design a modern, user-friendly interface for our NFT marketplace. Focus on clean aesthetics and intuitive user experience.',
    reward: 3500,
    currency: 'USDC',
    category: 'design',
    skills: ['UI/UX Design', 'Figma', 'Web3 Design', 'User Research'],
    difficulty: 'Intermediate',
    deadline: '2024-02-15',
    status: 'open',
    createdAt: '2024-01-06',
    company: 'NFT Labs',
    companyLogo: 'https://images.pexels.com/photos/3184327/pexels-photo-3184327.jpeg?auto=compress&cs=tinysrgb&w=100&h=100',
    applications: 23,
    requirements: ['UI/UX design experience', 'Web3 product knowledge', 'Figma proficiency'],
    deliverables: ['High-fidelity designs', 'Interactive prototype', 'Design system'],
    estimatedTime: '2 weeks',
    type: 'Project',
    isVerified: false,
    totalWinners: 1,
    compensationType: 'fixed'
  }
];

const categories = [
  { id: 'all', name: 'All Categories' },
  { id: 'content', name: 'Content' },
  { id: 'design', name: 'Design' },
  { id: 'development', name: 'Development' },
  { id: 'research', name: 'Research' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'other', name: 'Other' }
];

const BountyGrid: React.FC<BountyGridProps> = ({ 
  searchTerm, 
  selectedCategory, 
  selectedType, 
  onBountyClick, 
  onCategoryChange, 
  onTypeChange 
}) => {
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  const filteredBounties = mockBounties.filter(bounty => {
    const matchesSearch = bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bounty.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || bounty.category === selectedCategory;
    
    const matchesType = selectedType === 'all' || 
                       (selectedType === 'bounties' && bounty.type === 'Bounty') ||
                       (selectedType === 'projects' && bounty.type === 'Project') ||
                       (selectedType === 'grants' && bounty.type === 'Grant');
    
    return matchesSearch && matchesCategory && matchesType;
  });

  return (
    <section className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Browse Opportunities</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => onTypeChange('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                All
              </button>
              <button 
                onClick={() => onTypeChange('bounties')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'bounties'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Bounties
              </button>
              <button 
                onClick={() => onTypeChange('projects')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'projects'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Projects
              </button>
              <button 
                onClick={() => onTypeChange('grants')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedType === 'grants'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                Grants
              </button>
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-purple-100 text-purple-700 border border-purple-300'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {filteredBounties.length} opportunities found
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-gray-300 rounded-lg px-3 py-1 bg-white text-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="latest">Latest</option>
                <option value="reward">Highest Reward</option>
                <option value="deadline">Deadline</option>
                <option value="applications">Most Applied</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bounty List */}
        <div className="space-y-4">
          {filteredBounties.map(bounty => (
            <BountyCard
              key={bounty.id}
              bounty={bounty}
              onClick={() => onBountyClick(bounty)}
            />
          ))}
        </div>

        {filteredBounties.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BountyGrid;