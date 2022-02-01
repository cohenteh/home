export default function Response({ responses }) {
  return (
    <ol>
      {responses.map(([input, respone], index) => (
        <li key={index}>{getResponseData({ respone, query: input })}</li>
      ))}
    </ol>
  );
}

function getResponseData({ respone, query }) {
  if (respone.type === "email") {
    return `${query} is  ${
      respone.moreInformation.isFreeEmail ? " a free email" : "not a free email"
    }`;
  } else {
    return `the phone number ${query}  is from ${respone.moreInformation.phoneCountry}`;
  }
}
