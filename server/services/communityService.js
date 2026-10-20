export const getCommunityLinks = (ticketType = 'VIP', userEmail = '') => {
  const baseWhatsAppGroup = process.env.VIP_WHATSAPP_GROUP_URL || 'https://chat.whatsapp.com/demoWebinarFlowVip2026';
  const discordInvite = 'https://discord.gg/webinarflow-vip';
  const calendarEventTemplate = (title, date, time) => {
    const textParam = encodeURIComponent(title);
    const detailsParam = encodeURIComponent(`Live Webinar Access Room for ${title}. Bring your laptop & questions!`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${textParam}&details=${detailsParam}&location=Online+Live+Room`;
  };

  return {
    whatsappVipLink: `${baseWhatsAppGroup}?ref=${encodeURIComponent(userEmail)}`,
    discordLink: discordInvite,
    getCalendarUrl: calendarEventTemplate
  };
};
