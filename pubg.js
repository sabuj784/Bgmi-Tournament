let registeredPlayers = {};
let users = [];
document.body.classList.add('login-page'); 
document.body.classList.remove('login-page');

document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    
    if (users.find(user => user.username === username)) {
        alert('Username already exists. Please choose another.');
        return;
    }
    
    users.push({ username, password });
    alert('Registration successful! Please login.');
    document.getElementById('registration-form').reset();
    document.getElementById('registration-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
});

document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        alert('Invalid username or password.');
        return;
    }
    
    alert('Login successful!');
    document.getElementById('login-form').reset();
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
});

function showSection(section) {
    alert(`${section} section selected.`);
}

function showMaps() {
    document.getElementById('map-selection').style.display = 'block';
}

function showMapForm(map) {
    const forms = document.querySelectorAll('.map-form');
    forms.forEach(form => form.style.display = 'none');
    document.getElementById(`${map}-form`).style.display = 'block';
}

function addPlayer(map) {
    const teamName = document.getElementById(`${map}-team`).value;
    const playerName = document.getElementById(`${map}-player`).value;
    const playerImage = document.getElementById(`${map}-image`).files[0];
    
    if (!teamName || !playerName || !playerImage) {
        alert('Please fill in all fields.');
        return;
    }
    
    if (!registeredPlayers[teamName]) {
        registeredPlayers[teamName] = [];
    }
    
    if (registeredPlayers[teamName].length >= 4) {
        alert('Team is full.');
        notifyAdmin(teamName);
        resetForm(map);
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        const imgSrc = e.target.result;
        const listItem = document.createElement('li');
        listItem.innerHTML = `<img src="${imgSrc}" alt="Player Image"><span>${playerName}</span>`;
        document.getElementById(`${map}-list`).appendChild(listItem);
        registeredPlayers[teamName].push({ playerName, imgSrc });
        
        if (registeredPlayers[teamName].length === 4) {
            alert('Team is full.');
            notifyAdmin(teamName);
            resetForm(map);
        }
    };
    reader.readAsDataURL(playerImage);
}

function resetForm(map) {
    document.getElementById(`${map}-team`).value = '';
    document.getElementById(`${map}-player`).value = '';
    document.getElementById(`${map}-image`).value = '';
    document.getElementById(`${map}-list`).innerHTML = '';
    delete registeredPlayers[document.getElementById(`${map}-team`).value];
}

function notifyAdmin(teamName) {
    alert(`Admin notification: Team ${teamName} has registered for the tournament.`);
}
