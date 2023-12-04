const Button = ({ text }) => {
  return (
    <button className="w-full py-3 bg-primary text-white ring-red-900 focus:outline-none focus:ring-4 mt-4 rounded-lg transition duration-300 ">
      {text}
    </button>
  );
};

export default Button;
