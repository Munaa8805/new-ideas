export function getIdeaOwnerId(idea) {
  if (!idea?.user) return null;
  if (typeof idea.user === "string") return idea.user;
  if (typeof idea.user === "object" && idea.user?._id) return idea.user._id;
  return null;
}

export function isIdeaOwnedBy(idea, user) {
  if (!user?._id) return false;
  const ownerId = getIdeaOwnerId(idea);
  if (!ownerId) return false;
  return String(ownerId) === String(user._id);
}
