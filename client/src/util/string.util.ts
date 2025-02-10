export const stringArrayToString = (stringArray: Array<string>): string => {
  let outputString = "";

  stringArray.forEach((stringLine) => {
    outputString = outputString.concat(`- ${stringLine}\n`);
  });

  return outputString;
};
