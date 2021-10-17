import React from "react";
import styled from "styled-components";
import Text from "../../components/shared/Text";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { BACKEND_URL } from "../../controller";
import { Col, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import parse from "html-react-parser";
import { useParams } from "react-router";

import axios from "axios";

const TugasBox = styled(Row)`
  background-color: #24272c;
  padding: 1.5rem;
  margin: 1rem;
`;

const CTALayout = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: end;
`;

const IframeWrapper = styled.div`
  height: 100%;
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const SpesificTugas = () => {
  const { id } = useParams();
  const [specificTugas, setSpecificTugas] = React.useState();

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BACKEND_URL}/tugas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      setSpecificTugas(res.data.data);
    };
    getData();
  }, []);
  return !specificTugas ? (
    <h1>Loading...</h1>
  ) : (
    <IframeWrapper>{parse(specificTugas.iframeForm)}</IframeWrapper>
  );
};

const Acara = () => {
  const history = useHistory();
  const { id } = useParams();
  const [tugas, setTugas] = React.useState();
  const isMobile = useMediaQuery({
    query: "(min-width: 425px)",
  });
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BACKEND_URL}/tugas/occuring/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      // setTugas(res.data);
      setTugas(res.data.data);
    };
    getData();
  }, []);
  return (
    <>
      {!!id ? (
        <SpesificTugas />
      ) : (
        <>
          {tugas ? (
            tugas?.map((singleTugas, i) => (
              <TugasBox key={i}>
                <Col sm={8}>
                  <Text size={1.4} type="secondary" color="#ffffff">
                    {singleTugas.name}
                  </Text>
                  <br />
                  <Text type="paragraph" color="#fff">
                    Deadline : {new Date(singleTugas.endedAt).toString()}
                  </Text>
                </Col>
                <CTALayout>
                  {!isMobile && (
                    <>
                      {[1, 2, 3, 4].map((_) => (
                        <br />
                      ))}
                    </>
                  )}
                  <Button
                    variant="contained"
                    onClick={() =>
                      history.push(`/faction/tugas/${singleTugas.id}`)
                    }
                  >
                    View Tugas
                  </Button>
                </CTALayout>
              </TugasBox>
            ))
          ) : (
            <h1>Loading...</h1>
          )}
        </>
      )}
    </>
  );
};

export default Acara;
