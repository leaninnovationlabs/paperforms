import { IValidationRequirements } from "../../features/upload/store/upload.types";
import "./Results.component.css";

export interface IResultsProps {
  results: IValidationRequirements;
}

const Results = (props: IResultsProps) => {
  const { results } = props;

  return (
    <div>
      <div className="results-title">Validation Results</div>
      <div>
        {results.map((result, i) => {
          if (Object.keys(result).length !== 1) return;

          const label = Object.keys(result)[0];
          const value = Object.values(result)[0];

          return (
            <div key={i}>
              <div>{label}</div>
              <div>{value}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Results;
