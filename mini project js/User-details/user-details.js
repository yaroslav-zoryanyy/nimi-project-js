
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('id');
const container = document.getElementById("container")
const post = document.getElementById("post")
let postsContainer = document.getElementById('post-container');

fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((response) => userDetails(response));

function userDetails(users){
    for (const user of users) {
        if(user.id == userId){
            writeUserDetails(user)
        }
    }
}

function writeUserDetails(user){
    const userBloc = document.createElement("div")
    userBloc.className = "user-bloc";
    const userList = document.createElement("ol")
    for(let i = 0; i < Object.keys(user).length; i++){
        const userItem = document.createElement("li")
        userItem.innerText = `${Object.keys(user)[i]}:`;

        if (typeof Object.values(user)[i] == "object"){
            const dop = Object.values(user)[i]
            const userSupList = document.createElement("ol")
            for (let j = 0; j < Object.keys(dop).length; j++){
                const userSupItem = document.createElement("li")
                userSupItem.innerText = `${Object.keys(dop)[j]}:`;

                if (typeof Object.values(dop)[j] == "object"){
                    const dop2 = Object.values(dop)[j]
                    const userSupList2 = document.createElement("ol")
                    for (let h = 0; h < Object.keys(dop2).length; h++){
                        const userSupItem2 = document.createElement("li")
                        userSupItem2.innerText = `${Object.keys(dop2)[h]}: ${Object.values(dop2)[h]}`;

                        userSupList2.appendChild(userSupItem2)
                        userSupItem.appendChild(userSupList2)
                    }
                }else{
                    userSupItem.innerText = `${Object.keys(dop)[j]}: ${Object.values(dop)[j]}`;
                }
                userSupList.appendChild(userSupItem)
                userItem.appendChild(userSupList)
            }
        }else{
            userItem.innerText = `${Object.keys(user)[i]}: ${Object.values(user)[i]}`;
        }
        userList.appendChild(userItem)
    }
    userBloc.appendChild(userList)
    container.appendChild(userBloc)
}

post.addEventListener("click", () => {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => displayPosts(posts));
})

function displayPosts(posts){
    postsContainer.innerText = ''
    for (let i = 0; i < posts.length; i++){
        const  postsTitle = document.createElement("p")
        postsTitle.innerText = `Title: ${posts[i].title}`

        const postLink = document.createElement('a');
        postLink.innerText = 'View Post';
        postLink.href = `../Post-details/post-details.html?idUser=${userId}&idPost=${posts[i].id}`;

        postsTitle.appendChild(postLink)
        postsContainer.appendChild(postsTitle)
    }
}



























