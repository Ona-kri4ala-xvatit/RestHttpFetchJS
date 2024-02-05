const loaderTxt = document.createElement('div');
loaderTxt.classList.add('loading-text');
loaderTxt.textContent = 'Идет загрузка...';
document.body.append(loaderTxt);

fetch('https://jsonplaceholder.typicode.com/users').then(response => response.json()).then(users => {
    loaderTxt.textContent = "";
    const usersWrapper = document.createElement('div');
    usersWrapper.classList.add('users-wrapper');

    users.forEach(user => {
        const userItems = document.createElement('div');
        userItems.classList.add('user-items');

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

        usersWrapper.append(userItems);
    });

    document.body.append(usersWrapper);
});


