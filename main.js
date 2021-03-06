let tagsInput = document.querySelector("input#tags");
let tagsList = document.querySelector("ul.tag-list");

// if (document.getElementsByClassName("mark-remove")) {
//   let remButtons = document.getElementsByClassName("mark-remove");
//   for (let button of remButtons) {
//     button.addEventListener("click", () => {
//       bookmarkRemove(button.value);
//     });
//   }
// }

let items = [];

// Get Data From Local storage
let bookmarks;
let bookmarkCount;

if (!localStorage.getItem("bookmarkCount")) {
  localStorage.setItem("bookmarkCount", "0");
  bookmarkCount = 0;
} else {
  bookmarkCount = parseInt(localStorage.getItem("bookmarkCount"));
}

if (!localStorage.getItem("bookmarks")) {
  localStorage.setItem("bookmarks", JSON.stringify([]));
  bookmarks = [];
} else {
  bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  renderBookmark();
}

// Tag Input Event
tagsInput.addEventListener("keyup", tagEvent);
function tagEvent(e) {
  if (e.key === ",") {
    let val = tagsInput.value;
    if (val !== "") {
      if (items.indexOf(val) >= 0) {
        alert("Tag name is a duplicate");
      } else {
        items.push(val.slice(0, val.length - 1));
        render();
        tagsInput.value = "";
        tagsInput.focus();
      }
    } else {
      alert("Please type a tag Name");
    }
  }
}

// Tag Render
function render() {
  tagsList.innerHTML = "";
  items.map((item, index) => {
    tagsList.innerHTML += `<li><span>${item}</span><a href="javascript: remove(${index})">X</a></li>`;
  });
}

// Tag Remove
function remove(i) {
  items = items.filter((item) => items.indexOf(item) !== i);
  render();
}

// Event Listener for form submmition
let form = document.getElementById("bookmark-form");

form.addEventListener("submit", addBookmark);

function addBookmark(e) {
  e.preventDefault();

  let title = document.getElementById("title").value;
  let url = document.getElementById("url").value;
  let category = document.getElementById("categories").value;
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;

  let data = {
    bookmarkCount: bookmarkCount++,
    title: title,
    url: url,
    category: category,
    date: today,
    tags: items,
  };
  bookmarks.push(data);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  localStorage.setItem("bookmarkCount", String(bookmarkCount));
  console.log("Data Added of id", bookmarkCount);

  renderBookmark();
  addRemoveEvent();

  // console.log(title + " " + url + " " + category + " " + today + " ", items);

  // let tr = document.createElement("tr");

  // let tbody = document.getElementsByTagName("tbody")[0];

  // let tagList = document.createElement("ul");
  // tagList.className = "tag-list";

  // for (item in items) {
  //   let li = document.createElement("li");
  //   li.className = "tags-item";
  //   li.textContent = items[item];
  //   tagList.appendChild(li);
  // }

  // let element = `<td>${bookmarks.length}<a class="mark-remove" href="javascript: bookmarkRemove(${data.bookmarkCount})">X</a></td><td><a class="bookmark-link" href="${url}" target="_blank">${title}</a></td><td>${category}</td><td>${tagList.outerHTML}</td><td>${today}</td>`;

  // tr.innerHTML = element;
  // tbody.appendChild(tr);

  document.getElementById("title").value = "";
  document.getElementById("url").value = "";
  document.getElementById("categories").value = "";
  today = "";
  items = [];
  render();
}

// Remove bookmark event handler
function addRemoveEvent() {
  let remButtons = document.getElementsByClassName("mark-remove");
  for (let button of remButtons) {
    button.addEventListener("click", () => {
      bookmarkRemove(button.value);
    });
  }
}

// Rendering Bookmark to the table
function renderBookmark() {
  let tablebody = document.createElement("tbody");
  for (i in bookmarks) {
    let tags = bookmarks[i].tags;
    let tagList = document.createElement("ul");
    tagList.className = "tag-list";
    for (tag in tags) {
      let li = document.createElement("li");
      li.className = "tags-item";
      li.textContent = tags[tag];
      tagList.appendChild(li);
    }
    let sr = Number(i) + 1;
    let element = `<td class="d-flex">${sr}<button class="mark-remove" value="${bookmarks[i].bookmarkCount}">X</button></td><td><a class="bookmark-link" href="${bookmarks[i].url}" target="_blank">${bookmarks[i].title}</a></td><td>${bookmarks[i].category}</td><td>${tagList.outerHTML}</td><td>${bookmarks[i].date}</td>`;
    let tr = document.createElement("tr");
    tr.innerHTML = element;
    tablebody.appendChild(tr);
  }
  let tbody = document.getElementsByTagName("tbody")[0];
  tbody.outerHTML = tablebody.outerHTML;
}

// Removing bookmark from table
function bookmarkRemove(id) {
  // console.log(bookmarks);
  bookmarks = bookmarks.filter((data) => data.bookmarkCount != id);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // console.log(bookmarks);
  renderBookmark();
  addRemoveEvent();
}
