import React from 'react'
import Button from "@material-ui/core/Button";
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackButton = ({ to }) => {
  return <>
    <Button
        color="primary"
        component={Link}
        startIcon={<ArrowBackIcon/>}
        to={to}
      >
        Back
      </Button>
  </>
}

export default BackButton
