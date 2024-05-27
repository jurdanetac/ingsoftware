const Card = ({ form }) => {
  const backgroundStyle = {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const shapeStyle = {
    height: "200px",
    width: "200px",
    borderRadius: "50%",
  };

  return (
    <div style={backgroundStyle}>
      <div style={shapeStyle}>{form}</div>
    </div>
  );
};

export default Card;
