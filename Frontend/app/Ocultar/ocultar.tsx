import { useState } from "react";

function ButtonComponent() {
    const [showButton, setShowButton] = useState(true);
  
    const usuario = () => {
      setShowButton(!showButton);
    };
  
    return (
      <div>
        {showButton && <button onClick={usuario} >Usuario</button>}
        {/* Otro contenido de tu componente */}
      </div>
    );
  }
  
  export default ButtonComponent;