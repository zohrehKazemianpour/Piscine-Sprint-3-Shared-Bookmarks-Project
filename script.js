import { getData, setData, getUserIds, clearData } from "./storage.js";
import { sortBookmarksByDate } from "./utils.js";

////DOM references
let userDropdown;
let bookmarkContainer;
let bookmarkForm;
let urlInput;
let titleInput;
let descriptionInput;

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

  bookmarkDescriptionEl.innerText = bookmark.description;
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
    const sortedData = sortBookmarksByDate(data);

    sortedData.forEach((bookmark) => {
      const bookmarkElement = createBookmarkElement(bookmark);
      bookmarkContainer.appendChild(bookmarkElement);
    });
  }
}

function handleUserSelect(event) {
  const selectedUser = event.target.value;
  showBookmarksForSelectedUser(selectedUser);
}

function handleUserSubmit(event) {
  event.preventDefault();

  const selectedUser = userDropdown.value;
  const urlInputValue = urlInput.value;
  const titleInputValue = titleInput.value;
  const descriptionInputValue = descriptionInput.value;

  if (!selectedUser) {
    alert("Please select a user first");
    return;
  }
  const existingBookmarks = getData(selectedUser) || [];
  const newBookmark = {
    url: urlInputValue,
    title: titleInputValue,
    description: descriptionInputValue,
    timestamp: Date.now(),
  };
  existingBookmarks.push(newBookmark);
  setData(selectedUser, existingBookmarks);
  showBookmarksForSelectedUser(selectedUser);
  bookmarkForm.reset();
}

// Initialize application
function setUp() {
  userDropdown = document.getElementById("user");
  bookmarkContainer = document.getElementById("book-mark");
  bookmarkForm = document.getElementById("bookmark-form");
  urlInput = document.getElementById("url");
  titleInput = document.getElementById("title");
  descriptionInput = document.getElementById("description");

  //event listener
  userDropdown.addEventListener("change", handleUserSelect);
  populateUserDropdown();

  bookmarkForm.addEventListener("submit", handleUserSubmit);
}

window.onload = setUp;
