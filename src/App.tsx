import { useState, useEffect } from "react";
import Comp from "./Comp";

// Base API URL
const BASE_URL = "https://restcountries.com/v3.1/all";

// Define Country type (used across App.tsx and Component.tsx)
export interface Country {
  name: string;
  capital: string;
}

export default function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(`${BASE_URL}`)
      .then((response) => response.json())
      .then((data) => {
        // Log the data to inspect the structure
        console.log("Fetched data:", data);

        const countryData: Country[] = data.map((country: any) => ({
          name: country.name.common,
          capital: country.capital && country.capital.length > 0 ? country.capital[0] : "No capital", // Safe handling for missing capitals
        }));
        setCountries(countryData);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Filter handler
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  // Filtered countries
  const filteredCountries = countries.filter((country) =>
    country.capital.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Countries and Capitals</h1>
      <input
        type="text"
        placeholder="Filter by capital"
        value={filter}
        onChange={handleFilterChange}
      />
      <Comp countries={filteredCountries} />
    </div>
  );
}
