import React, { useState } from 'react';
import { Search, Plus, Bell, User, Menu, X, ChevronDown, Globe } from 'lucide-react';

interface HeaderProps {
  onPostBounty: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  onPostBounty,
  searchTerm,
  onSearchChange,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Shrine
              </h1>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-gray-900 font-medium hover:text-purple-600 transition-colors">
                Bounties
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Projects
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Grants
              </a>
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                  <span>More</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Leaderboard
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Sponsors
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    About
                  </a>
                </div>
              </div>
            </nav>
          </div>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-80 pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button className="hidden sm:flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">Global</span>
              </button>
              
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <span className="text-sm font-medium">Become a Sponsor</span>
              </button>
              
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <span className="text-sm">Login</span>
              </button>
              
              <button
                onClick={onPostBounty}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Create</span>
              </button>

              <button 
                className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              <a href="#" className="block px-4 py-2 text-gray-900 font-medium">Bounties</a>
              <a href="#" className="block px-4 py-2 text-gray-600">Projects</a>
              <a href="#" className="block px-4 py-2 text-gray-600">Grants</a>
              <a href="#" className="block px-4 py-2 text-gray-600">Leaderboard</a>
              <a href="#" className="block px-4 py-2 text-gray-600">Sponsors</a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;