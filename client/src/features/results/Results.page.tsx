import Logo from "../../components/logo/Logo.component";
import "../upload/page/Upload.page.css";

const ResultsPage = () => {
  return (
    <div className="layout">
      <div className="header">
        <Logo />
        <div className="title">Tax Form Validator</div>
        <div className="empty-space"></div>
      </div>
      <main className="main-content">Results!</main>
    </div>
  );
};

export default ResultsPage;
