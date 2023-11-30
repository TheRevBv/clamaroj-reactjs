const Label = ({ text, ...rest }) => {
  return (
    <label {...rest} htmlFor="title" className="text-gray-500">
      {text}*
    </label>
  );
};

export default Label;
