import "./Card.css";

export default function Card({ Title, Desc, icon }) {
  return (
    // <div className="features-grid">
    <div className="feature-card">
      <div className="feature-icon">
        <i className={icon}></i>
      </div>
      <h3>{Title}</h3>
      <p>{Desc}</p>
    </div>
  );
}
