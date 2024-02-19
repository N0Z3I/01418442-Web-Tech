const form = document.getElementById("new-comment");
const clearButton = document.getElementById("clear");

function getComment() {
  let comments = localStorage.getItem("comments");
  return comments ? JSON.parse(comments) : [];
}

function saveComment(comments) {
  if (comments) {
    localStorage.setItem("comments", JSON.stringify(comments));
  }
}

function displayComment() {
  const comments = getComment();
  const commentsDiv = document.getElementById("comments");
  commentsDiv.innerHTML = "";
  comments.forEach((comment) => {
    const p = document.createElement("p");
    p.textContent = comment.comment_text;
    commentsDiv.appendChild(p);
  });
}

function clearComments() {
  localStorage.removeItem("comments");
  displayComment();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const comment_text = document.getElementById("comment-text").value;
  console.log(comment_text);
  let comments = getComment();
  comments.push({ comment_text: comment_text });
  saveComment(comments);
  displayComment();
  document.getElementById("comment-text").value = "";
});

clearButton.addEventListener("click", function (event) {
  clearComments();
});