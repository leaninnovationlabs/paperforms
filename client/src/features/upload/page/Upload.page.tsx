import { useState } from "react";
import Hamburger from "../../../components/hamburger/Hamburger.component";
import Logo from "../../../components/logo/Logo.component";
import "./Upload.page.css";
import RulesModal from "../../../components/rules/RulesModal.component";
import { rulesTextW9 } from "../../../data/rules/Rules.data";
import ValidationService from "../../../service/validation.service";
import Results from "../../../components/results/Results.component";
import { IValidationRequirements } from "../store/upload.types";

const UploadPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [rulesText, setRulesText] = useState(rulesTextW9);

  // const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IValidationRequirements | null>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles?.length) return;

    const newFile = selectedFiles[0];
    setFile(newFile);
  };

  const handleValidate = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("rules", rulesText);
    formData.append("file", file);

    const validationService = new ValidationService();
    const validationResponse = await validationService.validateTaxForm(
      formData
    );

    setResults(validationResponse.response);
    console.log("Response: " + JSON.stringify(validationResponse));
  };

  const renderSelect = () => {
    return (
      <div className="select-area">
        <div className="select-container">
          <select className="select-input">
            <option value="w9">W9</option>
            <option value="w2">W2</option>
          </select>
        </div>
        <div
          className="rules-button"
          onClick={() => {
            toggleModal();
          }}
        >
          <Hamburger />
        </div>
      </div>
    );
  };

  const renderResultsSection = () => {
    return (
      <div id="results-section">{results && <Results results={results} />}</div>
    );
  };

  return (
    <div className="layout">
      <div className="header">
        <Logo />
        <div className="title">Tax Form Validator</div>
        <div className="empty-space"></div>
      </div>
      <main className="main-content">
        {renderSelect()}
        <input
          type="file"
          id="file"
          hidden
          name="file"
          accept=".pdf"
          onChange={(e) => handleFileChange(e)}
        />
        <label htmlFor="file" className="file-input">
          Upload Here
        </label>
        <div
          className="validate-button"
          onClick={() => {
            handleValidate();
          }}
        >
          Validate!
        </div>
        {renderResultsSection()}
      </main>
      {showModal && (
        <RulesModal
          rulesText={rulesText}
          setRulesText={setRulesText}
          handleClose={toggleModal}
        />
      )}
    </div>
  );
};

export default UploadPage;
