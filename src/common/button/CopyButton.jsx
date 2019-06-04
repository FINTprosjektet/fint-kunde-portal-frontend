import { IconButton } from "@material-ui/core";
import  ContentCopy  from "@material-ui/icons/FileCopy";
import React from "react";

class CopyButton extends React.Component {
  render() {
    return (
      <IconButton>
        <ContentCopy />
      </IconButton>
    );
  }
}

export default CopyButton;
