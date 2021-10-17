import React from "react";

const Main = () => {
  const { id } = useParams();
  const isMobile = useMediaQuery({
    query: "(min-width: 425px)",
  });
  return <></>;
};

export default Main;
