import React, { useState } from 'react';
import Header from './components/Header';
import StatsBar from './components/StatsBar';
import BountyGrid from './components/BountyGrid';
import PostBountyModal from './components/PostBountyModal';
import BountyDetailModal from './components/BountyDetailModal';
import { Bounty } from './types';

function App() {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState<Bounty | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all'); // all, bounties, projects, grants

  const handleBountyClick = (bounty: Bounty) => {
    setSelectedBounty(bounty);
  };

  const handlePostBounty = (bountyData: Omit<Bounty, 'id' | 'createdAt' | 'applications'>) => {
    console.log('New bounty posted:', bountyData);
    setIsPostModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onPostBounty={() => setIsPostModalOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <StatsBar />
      
      <main>
        <BountyGrid
          searchTerm={searchTerm}
          selectedCategory={selectedCategory}
          selectedType={selectedType}
          onBountyClick={handleBountyClick}
          onCategoryChange={setSelectedCategory}
          onTypeChange={setSelectedType}
        />
      </main>

      {isPostModalOpen && (
        <PostBountyModal
          isOpen={isPostModalOpen}
          onClose={() => setIsPostModalOpen(false)}
          onSubmit={handlePostBounty}
        />
      )}

      {selectedBounty && (
        <BountyDetailModal
          bounty={selectedBounty}
          isOpen={!!selectedBounty}
          onClose={() => setSelectedBounty(null)}
        />
      )}
    </div>
  );
}

export default App;