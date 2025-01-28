import Hamburger from "../components/hamburger/Hamburger.component";
import Logo from "../components/logo/Logo.component";
import "./Upload.page.css";

const UploadPage = () => {
  const renderSelect = () => {
    return (
      <div className="select-area">
        <div className="select-container">
          <select className="select-input">
            <option value="w9">W9</option>
            <option value="w2">W2</option>
          </select>
        </div>
        <div className="rules-button">
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
    </div>
  );
};

export default UploadPage;
