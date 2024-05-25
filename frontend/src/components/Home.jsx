const Home = ({ user, logout }) => {
  return (
    <>
      <h1>Welcome {user}</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Home;
