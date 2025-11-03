import { useEffect, useState } from "react";
import "./App.css";

// Gerador de emoji aleatório

function getRandomEmoji() {
  const emojis = ['😊', '😂', '😍', '👍', '🥳', '🌟', '🚀'];
  const randomIndex = Math.floor(Math.random() * emojis.length);
  return emojis[randomIndex];
}

// Componente de emoji
function RandomEmoji({ initialEmoji }) {
  const [emoji, setEmoji] = useState(initialEmoji || getRandomEmoji());

  const generateRandomEmoji = () => {
    setEmoji(getRandomEmoji());
  };

  return (
      <span 
        role="img" 
        aria-label="random emoji" 
        onClick={generateRandomEmoji}
        style={{ cursor: 'pointer' }}
      >
        {emoji}
      </span>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [userAdded, setUserAdded] = useState(false);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Erro ao carregar usuários:", err));
  }, []);

  // Nova data de usuário
  
  const addUser = () => {
    const newUser = {
      id: users.length + 1,
      name: "Pedro Amaral Foncesca",
      email: "serjaodosfoguetes@compania.net",
      website: "computaria.com.br",
      phone: "(62) 91337-6969"
    }
    
    setUsers((prev) => [ ...prev, newUser]);
    setUserAdded(true);
  }

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <header className="header">
        <h1>Listinha de usuários! <RandomEmoji /></h1>
        <label>Filtrar usuário: </label>
        <input
          className="search"
          type="text"
          placeholder="Digite um nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <br />
        <button 
          className="clear" 
          type="button" 
          onClick={() => setSearch("")}>
          Limpar
        </button>
      </header>

      <hr />

      <ul className="list">
        {search && 
          <p>Mostrando {filtered.length}/{users.length} usuário(s)</p>
        }
        {filtered.map((u) => (
          <li className="card" key={u.id}>
            <h1><RandomEmoji /></h1>
            <div className="title">{u.name}</div>
            <div className="muted">{u.email}</div>
            <div className="phone">{u.phone}</div>
            <a
              className="link"
              href={`http://${u.website}`}
              target="_blank"
              rel="noreferrer"
            >
              {u.website}
            </a>
          </li>
        ))}
        {!userAdded && (
          <button onClick={addUser}>Adicionar usuário</button>
        )}
      </ul>
    </div>
  );
}

export default App;