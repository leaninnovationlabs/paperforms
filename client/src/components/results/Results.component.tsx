import { IValidationRequirements } from "../../features/upload/store/upload.types";
import BadgeCheck from "../badge-check/BadgeCheck.component";
import "./Results.component.css";

export interface IResultsProps {
  results: IValidationRequirements;
  errorMessage: string | null;
  handleReturnToTop: () => void;
}

const Results = (props: IResultsProps) => {
  const { results, errorMessage, handleReturnToTop } = props;
  const numberOfErrors = results.length;

  const isSuccess = numberOfErrors === 0 && !errorMessage;

  const renderError = () => {
    return (
      <>
        <div className="results-header">
          <div className="results-title">Validation Results</div>
        </div>
        <div className="results-description">
          <div className="success-section">
            <div className="success-section-text">
              There was an error running the validation pipeline: {errorMessage}
            </div>
          </div>
        </div>
      </>
    );
  };

  const renderContent = () => {
    return (
      <>
        <div className="results-header">
          <div className="results-title">Validation Results</div>
          <div className="results-summary">
            <div className={`results-button ${isSuccess && "success-button"}`}>
              {numberOfErrors}
            </div>
            <div> Errors</div>
          </div>
        </div>
        <div className="results-description">
          {!isSuccess && (
            <>
              The following errors were found in your form, based on the
              validation rules you provided. Please resolve the issues and
              re-submit.
            </>
          )}
        </div>
        <div className="results-section-main-content">
          {results.map((result, i) => {
            if (Object.keys(result).length !== 1) return;

            const label = Object.keys(result)[0];
            const value = Object.values(result)[0];

            return (
              <div key={i} className="result-item">
                <div className="result-error-spot" />
                <div className="result-item-label">{label}</div>
                <div className="result-item-value">{value}</div>
              </div>
            );
          })}
          {isSuccess && (
            <div className="success-section">
              <div className="success-icon">
                <BadgeCheck />
              </div>
              <div className="success-section-text">
                No issues were found with your form. Congratulations!
              </div>
            </div>
          )}
          <div className="return-to-top" onClick={handleReturnToTop}>
            Return to top
          </div>
        </div>
      </>
    );
  };

  if (errorMessage) {
    return <>{renderError()}</>;
  } else {
    return <>{renderContent()}</>;
  }
};

export default Results;
