import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, MessageCircle, MoreVertical, MapPin, Briefcase, GraduationCap } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

// Mock user data - in production this would come from API/database
const mockUsers: { [key: string]: any } = {
  'elena.voss': {
    username: 'elena.voss',
    name: 'Elena Voss',
    age: 28,
    location: 'Brooklyn, NY',
    avatar: 'https://images.unsplash.com/photo-1762522921456-cdfe882d36c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcyMzI5MzMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Architect by day, philosopher by night. Fascinated by the impermanence of things and the stories we tell ourselves. Looking for conversations that linger.',
    work: 'Architect at Foster + Partners',
    education: 'Columbia University',
    objectives: ['Long-term relationship', 'Deep conversations'],
    photos: [
      'https://images.unsplash.com/photo-1635248677595-17a15f7a1972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wbGF0aXZlJTIwbmF0dXJlJTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NzIyODU1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1569181067672-d6e87f7a1766?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwYXJjaGl0ZWN0dXJlJTIwbW9ub2Nocm9tZXxlbnwxfHx8fDE3NzIyODU1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  'marcus.chen': {
    username: 'marcus.chen',
    name: 'Marcus Chen',
    age: 31,
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1532272278764-53cd1fe53f72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMG1hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MjM0NDQxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Software engineer building tools for creative expression. Believer in the beauty of slow, intentional connections. Always up for deep dives into art, tech, and the human condition.',
    work: 'Senior Engineer at Anthropic',
    education: 'MIT',
    objectives: ['Meaningful connections', 'Creative collaboration'],
    photos: [
      'https://images.unsplash.com/photo-1667987189392-06fcc377cade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwbW9vZHklMjBuYXR1cmV8ZW58MXx8fHwxNzcyMjE1NzEzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  'sophia.martinez': {
    username: 'sophia.martinez',
    name: 'Sophia Martinez',
    age: 26,
    location: 'Austin, TX',
    avatar: 'https://images.unsplash.com/photo-1770363757711-aa4db84d308d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwY29uZmlkZW50JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjM0NjA0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: "Writer exploring the intersection of memory and identity. I believe the best relationships are built on curiosity and presence. Let's talk about the things that matter.",
    work: 'Editorial Director at The Atlantic',
    education: 'Stanford University',
    objectives: ['Intellectual partnership', 'Long-term relationship'],
    photos: [
      'https://images.unsplash.com/photo-1694473799096-a915b576511f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwc3Vuc2V0JTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MjI5NzM0MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1767911287119-cd9ae9c55afa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xpdGFyeSUyMHBlcnNvbiUyMHNpbGhvdWV0dGV8ZW58MXx8fHwxNzcyMjg1NTQxfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1635248677595-17a15f7a1972?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wbGF0aXZlJTIwbmF0dXJlJTIwYmxhY2slMjB3aGl0ZXxlbnwxfHx8fDE3NzIyODU1NDB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    ],
  },
  'david.park': {
    username: 'david.park',
    name: 'David Park',
    age: 29,
    location: 'Seattle, WA',
    avatar: 'https://images.unsplash.com/photo-1629507208649-70919ca33793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGJ1c2luZXNzJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MjM0NjA0MHww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Product designer obsessed with meaningful experiences. I\'m here to find someone who appreciates thoughtful silence as much as great conversation.',
    work: 'Lead Designer at Airbnb',
    education: 'RISD',
    objectives: ['Creative partnership', 'Shared experiences'],
    photos: [],
  },
};

export default function OtherUserProfilePage() {
  const navigate = useNavigate();
  const { username } = useParams<{ username: string }>();
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);

  // Get user data from mock (in production, fetch from API)
  const user = username ? mockUsers[username] : null;

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-['Libre_Baskerville'] text-[24px] text-white/90 mb-4">
            User not found
          </h1>
          <button
            onClick={() => navigate(-1)}
            className="font-['Inter'] text-[12px] tracking-[0.2em] uppercase text-[#7FFF00] hover:text-[#c8ff4f] transition-colors"
          >
            Go back
          </button>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  const handleMessage = () => {
    // Navigate to messages with this user
    navigate('/messages', { state: { username: user.username } });
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="flex items-center justify-between px-5 py-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
          >
            <ChevronLeft size={20} strokeWidth={1.5} />
          </button>
          <h2 className="font-['Inter'] text-[10px] tracking-[0.3em] uppercase text-white/50">
            Profile
          </h2>
          <div className="relative">
            <button
              onClick={() => setShowOptionsMenu(!showOptionsMenu)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <MoreVertical size={20} strokeWidth={1.5} />
            </button>
            {showOptionsMenu && (
              <div className="absolute right-0 top-full mt-2 w-[200px] bg-[#0a0a0a] border border-white/[0.12] rounded-lg overflow-hidden shadow-xl">
                <button className="w-full px-4 py-3 text-left font-['Inter'] text-[12px] text-white/70 hover:bg-white/[0.05] transition-colors">
                  Report user
                </button>
                <button className="w-full px-4 py-3 text-left font-['Inter'] text-[12px] text-white/70 hover:bg-white/[0.05] transition-colors">
                  Block user
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[600px] mx-auto px-5 py-8">
        {/* Avatar and Name */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-[140px] h-[140px] mb-4">
            <ImageWithFallback
              src={user.avatar}
              alt={user.name}
              className="w-full h-full rounded-full object-cover border-2 border-white/[0.12]"
            />
          </div>
          <h1 className="font-['Libre_Baskerville'] text-[24px] font-light text-white/90 mb-1 text-center">
            {user.name}
          </h1>
          <p className="font-['Inter'] text-[12px] text-white/40 mb-6">
            @{user.username} · {user.age}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 w-full max-w-[380px]">
            <button
              onClick={handleMessage}
              className="flex-1 py-[14px] px-6 rounded-full border-none font-['Inter'] text-[11px] tracking-[0.22em] uppercase bg-[#7FFF00] hover:bg-[#c8ff4f] text-[#050705] transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} strokeWidth={2.5} />
              Message
            </button>
          </div>
        </div>

        {/* Basic Info */}
        <div className="mb-8">
          <h3 className="font-['Inter'] text-[10px] tracking-[0.3em] uppercase text-[#7FFF00]/50 mb-4">
            About
          </h3>
          <div className="space-y-3">
            {user.location && (
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-white/40 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-['Inter'] text-[14px] text-white/70 leading-[1.6]">
                  {user.location}
                </span>
              </div>
            )}
            {user.work && (
              <div className="flex items-start gap-3">
                <Briefcase size={16} className="text-white/40 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-['Inter'] text-[14px] text-white/70 leading-[1.6]">
                  {user.work}
                </span>
              </div>
            )}
            {user.education && (
              <div className="flex items-start gap-3">
                <GraduationCap size={16} className="text-white/40 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
                <span className="font-['Inter'] text-[14px] text-white/70 leading-[1.6]">
                  {user.education}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="mb-8">
            <h3 className="font-['Inter'] text-[10px] tracking-[0.3em] uppercase text-[#7FFF00]/50 mb-4">
              Bio
            </h3>
            <p className="font-['Libre_Baskerville'] text-[15px] font-light leading-[1.75] text-white/70 italic">
              {user.bio}
            </p>
          </div>
        )}

        {/* Objectives */}
        {user.objectives && user.objectives.length > 0 && (
          <div className="mb-8">
            <h3 className="font-['Inter'] text-[10px] tracking-[0.3em] uppercase text-[#7FFF00]/50 mb-4">
              Looking for
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.objectives.map((objective: string, index: number) => (
                <div
                  key={index}
                  className="px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.12]"
                >
                  <span className="font-['Inter'] text-[12px] text-white/70">
                    {objective}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photos */}
        {user.photos && user.photos.length > 0 && (
          <div className="mb-8">
            <h3 className="font-['Inter'] text-[10px] tracking-[0.3em] uppercase text-[#7FFF00]/50 mb-4">
              Photos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {user.photos.map((photo: string, index: number) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden bg-white/[0.05] border border-white/[0.08]"
                >
                  <ImageWithFallback
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}