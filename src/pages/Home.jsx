import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>

      <Link to="/signup">To Signup</Link>
    </div>
  );
};

export default Home;
