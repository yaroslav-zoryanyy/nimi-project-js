const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');

// Отримуємо інформацію про користувача
fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => displayUserDetails(user));

function displayUserDetails(user) {
    const userDetailsContainer = document.getElementById('user-details-container');

    const userInfo = document.createElement('div');
    userInfo.className = 'user-details';
    userInfo.innerHTML = `
    <h2>User ID: ${user.id}</h2>
    <p><strong>Name:</strong> ${user.name}</p>
    <p><strong>Username:</strong> ${user.username}</p>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Website:</strong> ${user.website}</p>
  `;

    userDetailsContainer.appendChild(userInfo);
}

// Кнопка для отримання постів
document.getElementById('posts-button').addEventListener('click', () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => displayPosts(posts));
});

// Відображення постів
function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = ''; // Очищення контейнера перед відображенням постів

    posts.forEach(post => {
        const postBlock = document.createElement('div');
        postBlock.className = 'post-block';

        const postTitle = document.createElement('h4');
        postTitle.innerText = post.title;

        const postLink = document.createElement('a');
        postLink.innerText = 'View Post';
        postLink.href = `post-details.html?id=${post.id}`;

        postBlock.appendChild(postTitle);
        postBlock.appendChild(postLink);
        postsContainer.appendChild(postBlock);
    });
}
