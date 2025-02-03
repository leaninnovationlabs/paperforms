import "./RulesModal.component.css";

interface IRulesModalProps {
  rulesText: string;
  setRulesText: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
}

const RulesModal = (props: IRulesModalProps) => {
  const { rulesText, setRulesText, handleClose } = props;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRulesText(e.target.value);
  };

  return (
    <div className="rules-container">
      <div className="rules-scrim" />
      <div className="rules-modal">
        <h2 className="rules-title">Customize Rules</h2>
        <div className="rules-text-container">
          <textarea className="rules-text" onChange={(e) => handleChange(e)}>
            {rulesText}
          </textarea>
        </div>
        <div
          className="rules-modal-button"
          onClick={() => {
            handleClose();
          }}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
