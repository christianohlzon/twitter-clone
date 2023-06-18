export const PostSkeleton = () => {
  return (
    <div className="w-full h-24 px-4 py-2 border-b border-zinc-800">
      <div className="flex flex-row animate-pulse">
        <div className="w-12 h-12 bg-zinc-700 rounded-full mt-1"></div>
        <div className="pl-3 py-1">
          <div className="w-36 h-4 bg-zinc-700 rounded"></div>
          <div className="w-64 h-5 bg-zinc-700 rounded mt-2"></div>
          <div className="w-24 h-4 bg-zinc-700 rounded mt-2"></div>
        </div>
      </div>
    </div>
  );
};
