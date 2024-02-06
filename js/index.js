const loaderTxt = document.createElement('div');
loaderTxt.classList.add('loading-text');
loaderTxt.textContent = 'Идет загрузка...';
document.body.append(loaderTxt);

let postFlag = false;

fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => {
    loaderTxt.textContent = "";
    const usersWrapper = document.createElement('div');
    usersWrapper.classList.add('users-wrapper');

    users.forEach(user => {
        const userItems = document.createElement('div');
        userItems.classList.add('user-items');

        createUserItemBlock(userItems, user);

        userItems.addEventListener('click', e => {
            if (!postFlag) {
                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                    .then(response => response.json())
                    .then(posts => {
                        posts.forEach(post => {
                            postFlag = true;
                            const userPost = document.createElement('div');
                            userPost.classList.add('user-post-items');

                            const postId = document.createElement('div');
                            postId.classList.add('user-post-item');
                            postId.textContent = 'User Id: ' + post.userId + ' | ' + 'ID: ' + post.id;
                            userPost.append(postId);

                            const Title = document.createElement('div');
                            Title.classList.add('user-post-item');
                            Title.textContent = 'Title:' + post.title;
                            userPost.append(Title);

                            const Body = document.createElement('div');
                            Body.classList.add('user-post-item');
                            Body.textContent = 'Body:' + post.body;
                            userPost.append(Body);

                            document.body.append(userPost);
                        });
                    });
            }
        });

        usersWrapper.append(userItems);
    });

    document.body.append(usersWrapper);
});

function createUserItemBlock(userItems, user) {
    const userId = document.createElement('div');
    userId.classList.add('user-item');
    userId.textContent = 'ID: ' + user.id;
    userItems.append(userId);

    const userName = document.createElement('div');
    userName.classList.add('user-item');
    userName.textContent = 'Name: ' + user.name;
    userItems.append(userName);

    const userEmail = document.createElement('div');
    userEmail.classList.add('user-item');
    userEmail.textContent = 'E-mail: ' + user.email;
    userItems.append(userEmail);

    const userAddress = document.createElement('div');
    const addressJson = JSON.stringify(user.address);
    userAddress.textContent = `Address: ${addressJson}`
    userItems.append(userAddress);
}