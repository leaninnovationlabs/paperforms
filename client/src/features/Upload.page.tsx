import { useState } from "react";
import Hamburger from "../components/hamburger/Hamburger.component";
import Logo from "../components/logo/Logo.component";
import "./Upload.page.css";
import RulesModal from "../components/rules/RulesModal.component";
import { rulesTextW9 } from "../data/rules/Rules.data";

const UploadPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [rulesText, setRulesText] = useState(rulesTextW9);

  const toggleModal = () => {
    setShowModal(!showModal);
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

  return (
    <div className="layout">
      <div className="header">
        <Logo />
        <div className="title">Tax Form Validator</div>
        <div className="empty-space"></div>
      </div>
      <main className="main-content">
        {renderSelect()}
        <input type="file" id="file" hidden name="file" accept=".pdf" />
        <label htmlFor="file" className="file-input">
          Upload Here
        </label>
        <div className="validate-button">Validate!</div>
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
