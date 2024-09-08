const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Отримуємо інформацію про пост
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(post => displayPostDetails(post));

function displayPostDetails(post) {
    const postDetailsContainer = document.getElementById('post-details-container');

    const postInfo = document.createElement('div');
    postInfo.className = 'post-details';
    postInfo.innerHTML = `
    <h2>Post Title: ${post.title}</h2>
    <p>${post.body}</p>
  `;

    postDetailsContainer.appendChild(postInfo);

    // Отримуємо коментарі до поста
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json())
        .then(comments => displayComments(comments));
}

// Відображення коментарів
function displayComments(comments) {
    const commentsContainer = document.getElementById('comments-container');

    comments.forEach(comment => {
        const commentBlock = document.createElement('div');
        commentBlock.className = 'comment-block';

        const commentBody = document.createElement('p');
        commentBody.innerText = comment.body;

        commentBlock.appendChild(commentBody);
        commentsContainer.appendChild(commentBlock);
    });
}
