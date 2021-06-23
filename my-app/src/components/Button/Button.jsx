import "./styles.css"

export const Button = ({ text, onClick, disabled}) => (
  <button  disabled={disabled} className="button" onClick={onClick} >
    {text}
  </button>
);