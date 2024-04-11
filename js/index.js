document.addEventListener('DOMContentLoaded', () => {
    fetchMonsters();
    const form = document.getElementById('monster-form');
    const loadMoreButton = document.getElementById('load-more');
  
    form.addEventListener('submit', addMonster);
    loadMoreButton.addEventListener('click', loadNextMonsters);
  });
  
  let currentPage = 1;
  
  function fetchMonsters() {
    fetch('http://localhost:3000/monsters?_limit=50')
      .then(response => response.json())
      .then(monsters => {
        displayMonsters(monsters);
      })
      .catch(error => console.error('Error fetching monsters:', error));
  }
  
  function displayMonsters(monsters) {
    const monsterContainer = document.getElementById('monster-container');
    monsterContainer.innerHTML = '';
    monsters.forEach(monster => {
      const monsterCard = document.createElement('div');
      monsterCard.classList.add('monster-card');
      monsterCard.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>Description: ${monster.description}</p>
      `;
      monsterContainer.appendChild(monsterCard);
    });
  }
  
  function addMonster(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('#name').value;
    const age = form.querySelector('#age').value;
    const description = form.querySelector('#description').value;
    const monsterData = { name, age, description };
  
    fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(monsterData),
    })
      .then(response => response.json())
      .then(newMonster => {
        displayMonster(newMonster);
        form.reset();
      })
      .catch(error => console.error('Error adding monster:', error));
  }
  
  function displayMonster(monster) {
    const monsterContainer = document.getElementById('monster-container');
    const monsterCard = document.createElement('div');
    monsterCard.classList.add('monster-card');
    monsterCard.innerHTML = `
      <h2>${monster.name}</h2>
      <p>Age: ${monster.age}</p>
      <p>Description: ${monster.description}</p>
    `;
    monsterContainer.appendChild(monsterCard);
  }
  
  function loadNextMonsters() {
    currentPage++;
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${currentPage}`)
      .then(response => response.json())
      .then(monsters => {
        displayMonsters(monsters);
      })
      .catch(error => console.error('Error fetching monsters:', error));
  }
  