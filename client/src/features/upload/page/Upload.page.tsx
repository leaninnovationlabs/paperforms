import { useEffect, useRef, useState } from "react";
import Hamburger from "../../../components/hamburger/Hamburger.component";
import Logo from "../../../components/logo/Logo.component";
import "./Upload.page.css";
import RulesModal from "../../../components/config/ConfigModal.component";
import ValidationService from "../../../service/validation.service";
import Results from "../../../components/results/Results.component";
import { IDocumentType, IValidationRequirements } from "../store/upload.types";
import { RotatingLines } from "react-loader-spinner";
import { stringArrayToString } from "../../../util/string.util";
import { forms } from "../../../data/forms.json";

const UploadPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [formType, setFormType] = useState<IDocumentType>("W9");
  const [fieldsText, setFieldsText] = useState(
    stringArrayToString(forms.W9.fields)
  );
  const [rulesText, setRulesText] = useState(
    stringArrayToString(forms.W9.rules)
  );

  useEffect(() => {
    console.log("Current form type: " + formType);
  }, [formType]);

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<IValidationRequirements | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const headerRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormType(event.target.value as IDocumentType);
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
    setErrorMessage(null);

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
    try {
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

      if (!Object.keys(validationResponse).includes("response")) {
        throw Error("Internal server error");
      }

      setIsLoading(false);
      if (Array.isArray(validationResponse.response)) {
        setResults(validationResponse.response);
      } else {
        setResults([]);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
      setErrorMessage("Internal server error");
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
          <select
            className="select-input"
            onChange={(e) => handleFormTypeChange(e)}
          >
            <option value="W9">W9</option>
            <option value="W2">W2</option>
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
        {!!results || errorMessage || isLoading ? (
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
            {(results || errorMessage) && (
              <Results
                results={results || []}
                errorMessage={errorMessage}
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
        <div className="title">Paperforms</div>
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
          {file ? <>{file.name}</> : <>Upload Form to Validate Here</>}
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
