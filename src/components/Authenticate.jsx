import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      if (token != null) {
      setSuccessMessage(result.message);
      } else {
        console.error("Error Response:", result);
        setError("An error occurred");
      }
    } catch (error) {
      setError("An error occurred");
      console.error("Error:", error);

    }
  }

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button id="auth" onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}