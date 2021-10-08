import React from "react";
import styled from "styled-components";
import Text from "../../components/shared/Text";
import Button from "@material-ui/core/Button";

const TugasBox = styled.div`
  display: flex;
  padding: 1rem;
  width: 100%;
  justify-content: space-between;
`;

const Acara = () => {
  return (
    <>
      <TugasBox>
        <h1>Hello workd</h1>
        <Button>Hello</Button>
      </TugasBox>
    </>
  );
};

export default Acara;
