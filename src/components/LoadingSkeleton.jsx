import { motion } from 'framer-motion';

export function MatchCardSkeleton() {
  return (
    <div className="bg-slate-800/50 rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
          <div className="h-5 bg-slate-700 rounded w-24"></div>
        </div>
        <div className="h-8 bg-slate-700 rounded w-16"></div>
        <div className="flex items-center space-x-3">
          <div className="h-5 bg-slate-700 rounded w-24"></div>
          <div className="w-12 h-12 bg-slate-700 rounded-full"></div>
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-slate-700 rounded w-1/2"></div>
        <div className="h-4 bg-slate-700 rounded w-1/3"></div>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-12 bg-slate-700 rounded w-64 mb-8 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <MatchCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden animate-pulse">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
      <div className="relative z-10 text-center px-4">
        <div className="h-16 bg-slate-700 rounded w-96 mx-auto mb-6"></div>
        <div className="h-8 bg-slate-700 rounded w-64 mx-auto mb-8"></div>
        <div className="h-12 bg-slate-700 rounded w-40 mx-auto"></div>
      </div>
    </div>
  );
}

// Default export for route loading
export default PageSkeleton;
