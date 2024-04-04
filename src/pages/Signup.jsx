import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(0);

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  // exemple d'une fonction qui est appliquable a tout les inputs
  const handleChangeInput = (event, input) => {
    if (input === "password") {
      setPassword(event.target.value);
    }
    if (input === "description") {
      setDescription(event.target.value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("test");
    try {
      // console.log("avant requete");

      const response = await axios.post(
        "https://site--soutien-6-test--fhx5w78hhgzd.code.run/user/signup",
        {
          email: email,
          username: username,
          description: description,
          password: password,
        }
      );

      // console.log("apres requete");

      console.log(response.data);
    } catch (error) {
      // console.log("je suis dans le catch");
      // j'affiche dans ma console mon error pour pouvoir trouver le pb
      console.log(error.response.data.message);

      if (error.response.data.message === "user already in db") {
        setError(2);
      }
      if (error.response.data.message === "email already in db") {
        setError(1);
      }
    }
  };

  // 0 1 2
  // 0 => pas de pb
  // 1 => email deja en DB
  // 2 => username est deja pris

  return (
    <>
      <div>Signup</div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            handleChangeInput(e, "password");
          }}
        />
        <input
          placeholder="Description"
          type="text"
          name="description"
          value={description}
          onChange={(e) => {
            handleChangeInput(e, "description");
          }}
        />
        <input type="submit" value="Submit" />
      </form>
      {error === 1 ? (
        <p>email déjà pris</p>
      ) : error === 2 ? (
        <p>username deja pris</p>
      ) : null}
    </>
  );
};

export default Signup;
