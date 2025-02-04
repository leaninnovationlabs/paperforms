import { useRef, useState } from "react";
import Hamburger from "../../../components/hamburger/Hamburger.component";
import Logo from "../../../components/logo/Logo.component";
import "./Upload.page.css";
import RulesModal from "../../../components/config/ConfigModal.component";
import { rulesTextW9 } from "../../../data/rules/Rules.data";
import ValidationService from "../../../service/validation.service";
import Results from "../../../components/results/Results.component";
import { IValidationRequirements } from "../store/upload.types";
import { RotatingLines } from "react-loader-spinner";
import { fieldsTextW9 } from "../../../data/fields/fields.data";

const UploadPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [rulesText, setRulesText] = useState(rulesTextW9);
  const [fieldsText, setFieldsText] = useState(fieldsTextW9);

  // const [formResponses, setFormResponses] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IValidationRequirements | null>(null);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles?.length) return;

    const newFile = selectedFiles[0];
    setFile(newFile);
  };

  const handleCleanup = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("fields", fieldsText);
    formData.append("file", file);

    setResults(null);
    setIsLoading(true);

    if (resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView();
      }, 0);
    }

    const validationService = new ValidationService();
    const validationResponse = await validationService.cleanFields(formData);

    setIsLoading(false);

    console.log("Responses: " + validationResponse.response);
    const formResponses = validationResponse.response;
    handleValidate(formResponses);
  };

  const handleValidate = async (formResponses: string) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("rules", rulesText);
    formData.append("form_responses", formResponses || "");

    setResults(null);
    setIsLoading(true);

    if (resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView();
      }, 0);
    }

    const validationService = new ValidationService();
    const validationResponse = await validationService.validateTaxForm(
      formData
    );

    setIsLoading(false);
    if (Array.isArray(validationResponse.response)) {
      setResults(validationResponse.response);
    } else {
      setResults([]);
    }
  };

  const handleReturnToTop = () => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView();
    }
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
      <>
        {!!results || isLoading ? (
          <div id="results-section" ref={resultsRef}>
            {isLoading && (
              <div className="loader-container">
                <RotatingLines
                  visible={true}
                  width="26"
                  strokeColor="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
                <div>
                  Extracting responses and running AI-powered validation
                </div>
              </div>
            )}
            {results && (
              <Results
                results={results}
                handleReturnToTop={handleReturnToTop}
              />
            )}
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  };

  return (
    <div className="layout">
      <div id="header" ref={headerRef}>
        <a href="https://www.leaninnovationlabs.com/">
          <Logo />
        </a>
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
          accept=".pdf,.png"
          onChange={(e) => handleFileChange(e)}
        />
        <label htmlFor="file" className="file-input">
          {file ? <>{file.name}</> : <>Upload Here</>}
        </label>
        <div
          className="validate-button"
          onClick={() => {
            handleCleanup();
          }}
        >
          Validate
        </div>
        {renderResultsSection()}
      </main>
      {showModal && (
        <RulesModal
          rulesText={rulesText}
          fieldsText={fieldsText}
          setRulesText={setRulesText}
          setFieldsText={setFieldsText}
          handleClose={toggleModal}
        />
      )}
    </div>
  );
};

export default UploadPage;
