import { getData, setData, getUserIds, clearData } from "./storage.js";

////DOM references
let userDropdown;
let bookmarkContainer;

//data
const userIds = getUserIds();

//populate the dropdown
function populateUserDropdown() {
  userIds.forEach((user) => {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = `User ${user}`;
    userDropdown.appendChild(option);
  });
}

function createBookmarkElement(bookmark) {
  const bookmarkLiEl = document.createElement("li");
  const bookmarkTitleEl = document.createElement("a");
  bookmarkTitleEl.href = bookmark.url;
  bookmarkTitleEl.innerText = bookmark.title;
  bookmarkTitleEl.target = "_blank";

  const bookmarkDescriptionEl = document.createElement("p");

  bookmarkDescriptionEl.innerText =
    bookmark.description || "No description provided";
  const dateEl = document.createElement("small");
  const bookmarkDate = new Date(bookmark.timestamp); // converts number to date object
  dateEl.textContent = `added on ${bookmarkDate.toLocaleString()}`;

  bookmarkLiEl.appendChild(bookmarkTitleEl);
  bookmarkLiEl.appendChild(bookmarkDescriptionEl);
  bookmarkLiEl.appendChild(dateEl);
  return bookmarkLiEl;
}

function showBookmarksForSelectedUser(userId) {
  const data = getData(userId);

  if (!data || data.length === 0) {
    bookmarkContainer.innerHTML = "<li>No bookmarks found</li>";
  } else {
    bookmarkContainer.innerHTML = "";
    const sortedData = data.sort((a, b) => b.timestamp - a.timestamp);

    sortedData.forEach((bookmark) => {
      const bookmarkElement = createBookmarkElement(bookmark);
      bookmarkContainer.appendChild(bookmarkElement);
    });
  }
}

function handelUserSelect(event) {
  const selectedUser = event.target.value;
  showBookmarksForSelectedUser(selectedUser);
}

// Initialize application
function setUp() {
  userDropdown = document.getElementById("user");
  bookmarkContainer = document.getElementById("book-mark");
  //event listener
  userDropdown.addEventListener("change", handelUserSelect);
  populateUserDropdown();
}

window.onload = setUp;
