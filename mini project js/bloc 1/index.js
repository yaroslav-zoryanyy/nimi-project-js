//  Масив користувачів
fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
        displayUsers(users);
    });

// Функція для відображення користувачів
function displayUsers(users) {
    const container = document.getElementById('users-container');

    users.forEach(user => {
        const userBlock = document.createElement('div');
        userBlock.className = 'user-block';

        const userInfo = document.createElement('p');
        userInfo.innerText = `ID: ${user.id}, Name: ${user.name}`;

        const detailsLink = document.createElement('a');
        detailsLink.innerText = 'View Details';
        detailsLink.href = `user-details.html?id=${user.id}`;

        userBlock.appendChild(userInfo);
        userBlock.appendChild(detailsLink);
        container.appendChild(userBlock);
    });
}
