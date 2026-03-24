import React from "react";

export default function FeatureCard({ icon, title, description, colorClass }) {
  return (
    <div className={`card ${colorClass}`}>
      <div className="icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}