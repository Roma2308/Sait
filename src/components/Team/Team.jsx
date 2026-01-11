import React, { useEffect, useState } from "react";
import "./team.css";

function Team() {
  const [team, setTeam] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetch("https://693e572112c964ee6b6d1e01.mockapi.io/mebel/v1/Rabotniki")
      .then(res => res.json())
      .then(data => setTeam(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="team-container">
      <h1 className="team-title">Наша команда</h1>

      <div className="team-grid">
        {team.map(worker => (
          <div
            className="team-card"
            key={worker.id}
            onClick={() => setSelected(worker)}
          >
            <div className="avatar">
              {worker.name?.[0] || "👤"}
            </div>
            <h3>{worker.name}</h3>
            <p>{worker.position || "Сотрудник"}</p>
          </div>
        ))}
      </div>

      {/* МОДАЛЬНОЕ ОКНО */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>
              ✕
            </button>

            <div className="modal-avatar">
              {selected.name?.[0] || "👤"}
            </div>

            <h2>{selected.name}</h2>
            <p><b>Должность:</b> {selected.position || "—"}</p>
            <p><b>Email:</b> {selected.email || "—"}</p>
            <p><b>Телефон:</b> {selected.phone || "—"}</p>
            <p><b>Описание:</b> {selected.description || "—"}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Team