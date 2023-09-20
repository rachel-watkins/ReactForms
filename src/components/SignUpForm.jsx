import { useState } from "react"

export default function SignUpForm ({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit (e) {
    e.preventDefault();
    try {
      const response = await fetch ("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      })
      const result = await response.json();
      console.log(result);
      setToken(result.token);
      if (username.length == 0) {
        alert('Invalid Form, Username cannot be empty')
        return
      }
      if (username.length < 8) {
        alert('Invalid Form, Username must be at least 8 characters')
        return
      }
      if (password.length < 8) {
        alert('Invalid Form, Password must be at least 8 characters')
        return
      }
    } catch (error) {
      setError(error);
    }
  }

  return (
    <>
    <h2>Sign Up!</h2>
    {error && <p>{error}</p>}
    <form onSubmit={handleSubmit}>
      <label>
      Username: <input placeholder="Type Your Username"
      value={username} onChange={(e) => {
        setUsername(e.target.value);
      }}/>
      </label> <br />
      <label>
      Password: <input placeholder="Type Your Password"
      value={password} onChange={(e) => {
        setPassword(e.target.value);
      }}/>
      </label> <br />
      <label>
        <button>Submit</button>
      </label>
    </form>
  </>
  )
}