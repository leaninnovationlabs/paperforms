import Logo from "../components/logo/Logo.component";
import "./Upload.page.css";

const UploadPage = () => {
  return (
    <div className="layout">
      <div className="header">
        <Logo />
        <div className="title">Tax Form Validator</div>
        <div className="empty-space"></div>
      </div>
      <main className="main-content">
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
