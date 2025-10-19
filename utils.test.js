import { describe, test, expect } from "vitest";
import { sortBookmarksByDate } from "./utils.js";

describe("sortBookmarksByDate", () => {
  test("sorts bookmarks in reverse chronological order (newest first)", () => {
    const bookmarks = [
      { title: "Oldest", timestamp: 1000 },
      { title: "Newest", timestamp: 3000 },
      { title: "Middle", timestamp: 2000 },
    ];

    const sorted = sortBookmarksByDate(bookmarks);

    expect(sorted[0].title).toBe("Newest");
    expect(sorted[1].title).toBe("Middle");
    expect(sorted[2].title).toBe("Oldest");
    expect(sorted[0].timestamp).toBe(3000);
    expect(sorted[2].timestamp).toBe(1000);
  });

  test("does not mutate the original array", () => {
    const bookmarks = [
      { title: "First", timestamp: 1000 },
      { title: "Second", timestamp: 2000 },
    ];
    const originalOrder = [...bookmarks];

    sortBookmarksByDate(bookmarks);

    // Original array should be unchanged
    expect(bookmarks[0].title).toBe("First");
    expect(bookmarks[1].title).toBe("Second");
  });

  test("handles empty array", () => {
    const sorted = sortBookmarksByDate([]);
    expect(sorted).toEqual([]);
  });

  test("handles single bookmark", () => {
    const bookmarks = [{ title: "Only", timestamp: 1000 }];
    const sorted = sortBookmarksByDate(bookmarks);
    expect(sorted).toEqual(bookmarks);
  });

  test("handles bookmarks with same timestamp", () => {
    const bookmarks = [
      { title: "First", timestamp: 1000 },
      { title: "Second", timestamp: 1000 },
    ];
    const sorted = sortBookmarksByDate(bookmarks);
    expect(sorted.length).toBe(2);
  });
});
