const BottomFooter = () => {
  return (
    <div className="flex items-center pt-8">
      <div className="flex flex-grow gap-4 items-center">
        <span className="text-gray-500">Desarrollado por </span>
        <a
          className="text-primary hover:text-primary-dark"
          href="https://github.com/TheRevBv/Clamaroj-Reactjs"
          target="_blank"
          rel="noreferrer"
        >
          TheRevBv
        </a>
      </div>

      <div className="flex justify-end items-center space-x-6">
        <span className="text-white cursor-pointer">
          Política de Privacidad
        </span>
        <span className="text-white cursor-pointer">
          Términos y Condiciones
        </span>
      </div>
    </div>
  );
};

export default BottomFooter;
