import React from "react";
import styled from "styled-components";
import Swiper from "react-id-swiper";
import "swiper/css/swiper.min.css";
import Text from "../../components/shared/Text";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { BACKEND_URL } from "../../controller";
import { ReactComponent as BlockedAbsen } from "../../blob/svg/blocked_absen.svg";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const Box = styled.div`
  background-color: #24272c;
  color: white;
  padding: 1.5rem;
  width: 22.5rem;
`;

const Line = styled.div`
  width: 100%;
  height: 1rem;
`;

const Absen = () => {
  const [events, setEvents] = React.useState([]);
  const [user, setUser] = React.useState(
    JSON.parse(localStorage.getItem("user"))
  );
  const [SSHadir, setSSHadir] = React.useState();
  React.useEffect(() => {
    const getEvents = async () => {
      const response = await axios.get(
        `${BACKEND_URL}/event/?user_id=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      setEvents(response.data);
    };
    getEvents();
  }, []);

  const absen = (event_id) => () => {
    const callAbsen = async () => {
      if (!SSHadir) {
        alert("Isi bukti hadir!");
        return;
      }
      const response = await axios.post(
        `${BACKEND_URL}/absen`,
        {
          userId: user.id,
          eventId: event_id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth")}`,
          },
        }
      );
      if (response.status === 200) {
        alert("Absen Successfull");
        const absens = await axios.get(
          `${BACKEND_URL}/event/?user_id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("auth")}`,
            },
          }
        );
        setEvents(absens.data);
        console.log(events);
      } else {
        alert("Absen Failed");
      }
    };
    callAbsen();
  };
  const params = {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    mousewheel: true,
    spaceBetween: 50,
    observer: true,
    coverflowEffect: {
      rotate: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
  };
  return (
    <div style={{ marginLeft: "8rem" }}>
      <div style={{ height: "3rem" }} />
      <Swiper {...params}>
        {events.map((event) =>
          !event.absen ? (
            <Box>
              <hr
                style={{
                  backgroundColor: "white",
                  height: "0.25rem",
                  width: "90%",
                  margin: "1rem auto",
                  borderRadius: "25px",
                }}
              />
              <Text type="secondary" color="white" size={1.5}>
                {event.event_name}
              </Text>
              <br />
              <Text type="paraghraph" color="white" align="justify">
                {event.event_description}
              </Text>
              <br />
              <br />
              <input
                accept="image/*"
                id="contained-button-file"
                style={{ display: "none" }}
                multiple
                type="file"
                onChange={(e) => setSSHadir(e.target.files[0])}
              />
              <label htmlFor="contained-button-file">
                <Button
                  variant="contained"
                  color="default"
                  component="span"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                </Button>
                {SSHadir && (
                  <>
                    <br />
                    <br />
                    <Text color="green">
                      Bukti SS telah terunggah: {SSHadir.name}
                    </Text>
                    <br />
                    <br />
                  </>
                )}
              </label>
              <Button
                style={{ position: "absolute", right: "1rem", bottom: "1rem" }}
                variant="contained"
                color="light"
                onClick={absen(event.event_id)}
              >
                Tandai Hadir
              </Button>
            </Box>
          ) : (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <hr
                style={{
                  backgroundColor: "white",
                  height: "0.25rem",
                  width: "90%",
                  margin: "1rem auto",
                  borderRadius: "25px",
                }}
              />
              <div style={{ width: "100%", paddingLeft: "1rem" }}>
                <Text type="secondary" color="white" size={1.5}>
                  {event.event_name}
                </Text>
              </div>
              <br />
              <BlockedAbsen style={{ margin: "4rem 6rem 6rem 6rem" }} />
            </Box>
          )
        )}
      </Swiper>
    </div>
  );
};

export default Absen;
