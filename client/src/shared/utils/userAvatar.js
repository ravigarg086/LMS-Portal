export function getUserAvatarUrl(user) {
  if (user?.profilePictureUrl) {
    return user.profilePictureUrl;
  }

  const seed = encodeURIComponent(user?.email || 'LMSPortalLearner');
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
}
