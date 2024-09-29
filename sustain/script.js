let wardrobe = [];

document.getElementById('wardrobe-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const itemName = document.getElementById('item-name').value;
    const category = document.getElementById('category').value;
    const season = document.getElementById('season').value;

    addItemToWardrobe(itemName, category, season);
    displayWardrobe();
});

function addItemToWardrobe(name, category, season) {
    const item = {
        name,
        category,
        season,
        wearCount: 0,
        lastWorn: null
    };
    wardrobe.push(item);
    showNotification(item);
}

function displayWardrobe() {
    const collection = document.getElementById('collection');
    collection.innerHTML = '';

    wardrobe.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('wardrobe-item');
        itemDiv.innerHTML = `
            <h3>${item.name}</h3>
            <p>Category: ${item.category}</p>
            <p>Season: ${item.season}</p>
            <p>Wear Count: ${item.wearCount}</p>
            <button onclick="wearToday('${item.name}')">Wear Today</button>
        `;
        collection.appendChild(itemDiv);
    });
}

function showNotification(item) {
    const notification = document.getElementById('popup-notification');
    notification.style.display = 'block';
    notification.innerHTML = `
        <p>Consider wearing: ${item.name}</p>
        <div class="notification-buttons">
            <button onclick="wearToday('${item.name}')">Wearing Today?</button>
            <button onclick="ignore('${item.name}')">Ignore</button>
            <button onclick="dispose('${item.name}')">Dispose</button>
        </div>
    `;
}

function wearToday(itemName) {
    const item = wardrobe.find(i => i.name === itemName);
    item.wearCount++;
    item.lastWorn = new Date();
    displayWardrobe();
    document.getElementById('popup-notification').style.display = 'none';
}

function ignore(itemName) {
    document.getElementById('popup-notification').style.display = 'none';
    setTimeout(() => showNotification(wardrobe.find(i => i.name === itemName)), 86400000); // Reminder next day
}

function dispose(itemName) {
    wardrobe = wardrobe.filter(i => i.name !== itemName);
    displayWardrobe();
    document.getElementById('popup-notification').style.display = 'none';
}
