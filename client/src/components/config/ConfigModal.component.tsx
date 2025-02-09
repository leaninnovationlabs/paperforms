import "./ConfigModal.component.css";

interface IConfigModalProps {
  rulesText: string;
  fieldsText: string;
  setRulesText: React.Dispatch<React.SetStateAction<string>>;
  setFieldsText: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
}

const ConfigModal = (props: IConfigModalProps) => {
  const { rulesText, fieldsText, setRulesText, setFieldsText, handleClose } =
    props;

  const handleRulesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRulesText(e.target.value);
  };

  const handleFieldsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFieldsText(e.target.value);
  };

  return (
    <div className="rules-container">
      <div className="rules-scrim" />
      <div className="rules-modal">
        <h2 className="rules-title">Customize Rules</h2>
        <div className="rules-text-container">
          <textarea className="rules-text" onChange={(e) => handleRulesChange(e)}>
            {rulesText}
          </textarea>
        </div>
        <h2 className="rules-title">Customize Fields</h2>
        <div className="rules-text-container">
          <textarea className="rules-text" onChange={(e) => handleFieldsChange(e)}>
            {fieldsText}
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

export default ConfigModal;
