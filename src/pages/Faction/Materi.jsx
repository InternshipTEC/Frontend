import Button from "@material-ui/core/Button";
import axios from "axios";
import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Text from "../../components/shared/Text";
import CircularProgress from '@material-ui/core/CircularProgress';
import { BACKEND_URL } from "../../controller";
import { useParams } from "react-router";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

const TugasBox = styled(Row)`
  background-color: #24272c;
  padding: 1rem;
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

const SpesificMateri = () => {
  const { id } = useParams();
  const [spesificMateri, setSpecificMateri] = React.useState();
  const [pdf, setPDF] = React.useState();

  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BACKEND_URL}/materi/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });

      setSpecificMateri(res.data);
    };
    getData();
  }, []);
  return !spesificMateri ? (
      <CircularProgress/>
  ) : (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
      <div
        style={{
          border: "1px solid rgba(0, 0, 0, 0.3)",
          height: "750px",
        }}
      >
        <Viewer
          fileUrl={
            "https://firebasestorage.googleapis.com/v0/b/testinginterntec.appspot.com/o/37-73-1-SM.pdf?alt=media&token=eb597a69-c21c-4974-9c3b-62c43c255377"
          }
        />
      </div>
    </Worker>
  );
};

const Materi = () => {
  const history = useHistory();
  const { id } = useParams();
  const [materi, setMateri] = React.useState();
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery({
    query: "(min-width: 425px)",
  });
  React.useEffect(() => {
    const getData = async () => {
      const res = await axios.get(`${BACKEND_URL}/materi`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth")}`,
        },
      });
      setMateri(res.data);
    };
    getData();
  }, []);
  return (
    <>
      {/* {id ? (
        <>
          <SpesificMateri />
        </>
      ) : ( */}
      <>
        {materi ? (
          <>
            {materi?.map((singleMateri, i) => (
              <TugasBox key={i}>
                <Col sm={8}>
                  <Text size={1.4} type="secondary" color="#ffffff">
                    {singleMateri.judul}
                  </Text>
                  <br />
                  <Text type="paragraph" color="#ffffff">
                    {singleMateri.deskripsi}
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
                    href={singleMateri.link}
                    target="_blank"
                  >
                    Show File
                  </Button>
                </CTALayout>
              </TugasBox>
            ))}
          </>
        ) : (
      <CircularProgress/>
        )}
      </>
      {/* )} */}
    </>
  );
};

export default Materi;
