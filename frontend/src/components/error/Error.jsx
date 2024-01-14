const Error = ({ message }) => {
  return (
    <h4 style={{ padding: "1em" }}>{message || "something went wrong"}</h4>
  );
};

export default Error;
