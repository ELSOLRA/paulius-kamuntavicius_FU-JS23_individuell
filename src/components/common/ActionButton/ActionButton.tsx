import "./actionbutton.scss"

interface ActionButtonProps {
  onClick: () => void;
  label: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label }) => {
  return (
    <button className="action-btn animate" onClick={onClick}>
      {label}
    </button>
  );
};

export default ActionButton;