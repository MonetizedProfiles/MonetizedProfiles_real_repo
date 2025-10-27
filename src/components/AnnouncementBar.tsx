export const AnnouncementBar = () => {
  const announcements = [
    "✅ New Accounts Restocked",
    "⭐ Trusted by Thousands of Creators",
    "💎 Over 27,000+ Accounts Sold",
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
