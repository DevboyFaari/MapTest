import React from "react";
import { Country } from "./App"; // Import unified Country type

interface ComponentProps {
  countries: Country[];
}

const Comp: React.FC<ComponentProps> = ({ countries }) => {
  return (
    <div>
      {countries.length > 0 ? (
        <ul>
          {countries.map((country, index) => (
            <li
              key={index}
              style={{
                marginBottom: "10px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            >
              <strong>{country.name}</strong> - {country.capital}
            </li>
          ))}
        </ul>
      ) : (
        <p>No countries found</p>
      )}
    </div>
  );
};

export default Comp;
