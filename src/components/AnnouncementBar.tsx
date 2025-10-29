export const AnnouncementBar = () => {
  const announcements = [
    "✅ New Monetized Accounts Restocked",
    "⭐ Loved By 28,000+ Users",
    "💎 100% Organic Followers - No Bots",
    "🔥 Start Earning On Your First Post",
  ];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden relative">
      <div className="animate-scroll-left whitespace-nowrap inline-block">
        {Array.from({ length: 10 }).map((_, setIndex) => (
          announcements.map((announcement, index) => (
            <span key={`${setIndex}-${index}`} className="mx-8 text-sm font-medium">
              {announcement}
            </span>
          ))
        ))}
      </div>
    </div>
  );
};
