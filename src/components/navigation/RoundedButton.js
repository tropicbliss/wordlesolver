import React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";

const RoundedButton = ({ text, onClick, isShake, disabled }) => {
  return (
    <Button
      className={isShake ? "jiggle" : ""}
      color="neutral"
      size="large"
      onClick={onClick}
      disabled={disabled}
      variant="contained"
    >
      {text}
    </Button>
  );
};

RoundedButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
};

export default RoundedButton;
