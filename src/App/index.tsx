import styled from "styled-components";

const AppWrapper = styled.div`
  padding: 1rem;
`;

function App() {
  return (
    <AppWrapper>
      <div className="flex justify-center">
        <h1 className="font-bold text-2xl text-blue-900">
          React and Tailwind with Vitejs!
        </h1>
      </div>
    </AppWrapper>
  );
}

export default App;
