import styled from "styled-components";

const AppWrapper = styled.div`
  padding: 1rem;
`;

function App() {
  const date = new Date().toISOString();
  return <AppWrapper>{date}</AppWrapper>;
}

export default App;
