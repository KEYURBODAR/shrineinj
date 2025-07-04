export interface Bounty {
  id: string;
  title: string;
  description: string;
  reward: number;
  currency: string;
  category: string;
  skills: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  deadline: string;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  createdAt: string;
  company: string;
  companyLogo: string;
  applications: number;
  requirements: string[];
  deliverables: string[];
  estimatedTime: string;
  type: 'Bounty' | 'Project' | 'Grant';
  region?: string;
  isVerified?: boolean;
  totalWinners?: number;
  isWinnersAnnounced?: boolean;
  token?: string;
  compensationType?: 'fixed' | 'range' | 'variable';
  minReward?: number;
  maxReward?: number;
  applicationDeadline?: string;
  submissionDeadline?: string;
  pocSocials?: {
    twitter?: string;
    discord?: string;
    telegram?: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  skills: string[];
  completedBounties: number;
  totalEarned: number;
  rating: number;
  bio?: string;
  location?: string;
  github?: string;
  twitter?: string;
  discord?: string;
  website?: string;
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  website: string;
  isVerified: boolean;
  totalBounties: number;
  totalRewards: number;
}

export interface Submission {
  id: string;
  bountyId: string;
  userId: string;
  title: string;
  description: string;
  link: string;
  submittedAt: string;
  status: 'pending' | 'winner' | 'rejected';
  feedback?: string;
}

export interface Stats {
  totalRewards: number;
  totalOpportunities: number;
  totalParticipants: number;
  totalSponsors: number;
}