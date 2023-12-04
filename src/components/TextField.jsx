const TextField = ({ ...rest }) => {
  const { type } = rest;
  const clases = [
    "btn-textfield",
    "file-input",
    "calendar-input",
    "password-input",
  ];
  let className = "";
  switch (type) {
    case "file":
      className = clases[1];
      break;
    case "date":
      className = clases[2];
      break;
    case "password":
      className = clases[3];
      break;
    default:
      className = clases[0];
      break;
  }
  return (
    <>
      <input {...rest} className={className} />
    </>
  );
};

export default TextField;
