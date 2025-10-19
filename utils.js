export function sortBookmarksByDate(bookmarks) {
  return [...bookmarks].sort((a, b) => b.timestamp - a.timestamp);
}
