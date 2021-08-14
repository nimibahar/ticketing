import buildClient from "../api/build-client";

const LandingPage = ({ user }) => {
  return <h1>You're {user ? "signed" : "NOT signed"} in</h1>;
};

LandingPage.getInitialProps = async (context) => {
  const client = buildClient(context);
  const response = await client.get("/api/users/currentuser");

  return response?.data || {};
};

export default LandingPage;
