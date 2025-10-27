export const AnnouncementBar = () => {
  const announcements = [
    "🎉 Free Shipping on Orders Over $100",
    "⚡ Limited Time Offer - 20% Off All YouTube Channels",
    "🚀 New TikTok Accounts Available Now",
    "💎 Premium Support Included with Every Purchase",
  ];

  return (
    <div className="bg-primary text-primary-foreground py-2 overflow-hidden relative">
      <div className="animate-scroll-left whitespace-nowrap inline-block">
        {announcements.map((announcement, index) => (
          <span key={index} className="mx-8 text-sm font-medium">
            {announcement}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {announcements.map((announcement, index) => (
          <span key={`duplicate-${index}`} className="mx-8 text-sm font-medium">
            {announcement}
          </span>
        ))}
      </div>
    </div>
  );
};
