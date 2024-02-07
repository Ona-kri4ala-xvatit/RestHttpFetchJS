import {createUserItemBlock} from './functions.js';
import {createUserPostBlock} from './functions.js';

const loaderTxt = document.createElement('div');
loaderTxt.classList.add('loading-text');
loaderTxt.textContent = 'Идет загрузка...';
document.body.append(loaderTxt);

let userId = 0;

fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => {
    loaderTxt.style.display = 'none'; //.textContent = "";
    const usersWrapper = document.createElement('div');
    usersWrapper.classList.add('users-wrapper');

    users.forEach(user => {
        const userItems = document.createElement('div');
        userItems.classList.add('user-items');

        createUserItemBlock(userItems, user);

        userItems.addEventListener('click', e => {
            if (user.id !== userId) {
                fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`)
                    .then(response => response.json())
                    .then(posts => {
                        posts.forEach(post => {
                            createUserPostBlock(post);
                            userId = post.userId;
                        });
                    });
            }
        });

        usersWrapper.append(userItems);
    });

    document.body.append(usersWrapper);
});
