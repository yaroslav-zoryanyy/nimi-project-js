const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('idUser');
const postId = urlParams.get('idPost');
const postContainer = document.getElementById("post-container");
const commentsContainer = document.getElementById("comments-container");

fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then(response => response.json())
    .then(posts => displayPost(posts));

function displayPost(posts){
    for (const post of posts){
        if (post.id == postId){
            writePost(post)
        }
    }
}
function writePost(post){
    const postBloc = document.createElement("div")
    postBloc.className = "postBloc"
    const postList = document.createElement("ol")
    for (let i = 0; i < Object.keys(post).length; i++){
        const postItem = document.createElement("li")
        postItem.innerText = `${Object.keys(post)[i]}: ${Object.values(post)[i]}`;
        postList.appendChild(postItem)
    }
    postBloc.appendChild(postList)
    postContainer.appendChild(postBloc)
}

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => displayComments(comments));

function displayComments(comments){
    const commentsBloc = document.createElement("div")
    commentsBloc.className = "commentsBloc"

    for (let i = 0; i < Object.keys(comments).length; i++){
        const commentsBlocWrap = document.createElement("div")
        commentsBlocWrap.innerText = `${Object.keys(comments)[i]}:`;

        if (typeof Object.values(comments)[i] == "object"){
            const dop = Object.values(comments)[i]
            const commentsSupList = document.createElement("ol")

            for (let h = 0; h < Object.keys(comments).length; h++){
                const commentsSupItem = document.createElement("li")
                commentsSupItem.innerText = `${Object.keys(comments)[h]}: ${Object.values(comments)[h]}`;

                if (typeof Object.values(dop)[h] == "object"){
                    const dop2 = Object.values(dop)[h]
                    const commentsSupList2 = document.createElement("ol")
                    for (let j = 0; j < Object.keys(dop2).length; j++){
                        const commentsSupItem2 = document.createElement("li")
                        commentsSupItem2.innerText = `${Object.keys(dop2)[j]}: ${Object.values(dop2)[j]}`;

                        commentsSupList2.appendChild(commentsSupItem2)
                        commentsSupItem.appendChild(commentsSupList2)
                    }
                }else{
                    commentsSupItem.innerText = `${Object.keys(dop)[h]}: ${Object.values(dop)[h]}`;
                }

                commentsSupList.appendChild(commentsSupItem)
                commentsBlocWrap.appendChild(commentsSupList)
            }
        }else{
            commentsBlocWrap.innerText = `${Object.keys(comments)[i]}: ${Object.values(comments)[i]}`;
        }
        commentsBloc.appendChild(commentsBlocWrap)
    }
    commentsContainer.appendChild(commentsBloc)
}