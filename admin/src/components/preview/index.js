import React, { useState } from "react";
import PropTypes from "prop-types";
import Eye from '@strapi/icons/Eye';

import {
  Box,
  Flex,
  Button,
  Typography,
  ModalLayout,
  ModalBody,
  ModalHeader,
} from "@strapi/design-system";
const preview = ({
  //All these parameters are passed from admin\src\index.js

  attribute,
}) => {
  const imageUrl = attribute.options.url;
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Box>
      <Box>
        <Flex direction="column" alignItems="start">
          <Typography variant="alpha">Preview</Typography>
          <Box paddingTop={2}>
            <Button startIcon={<Eye />} onClick={() => setIsVisible((prev) => !prev)}>
              {/* <Typography>Preview</Typography> */}
              Preview
            </Button>
          </Box>
        </Flex>
      </Box>
      {isVisible && (
        <ModalLayout
          onClose={() => setIsVisible((prev) => !prev)}
          labelledBy="title"
          style={{ height: "auto", maxHeight: "50%" }}
        >
          <ModalHeader>
            <Typography
              fontWeight="bold"
              textColor="neutral800"
              as="h2"
              id="title"
            >
              Preview
            </Typography>
          </ModalHeader>
          <ModalBody style={{ height: "auto", maxHeight: "65vh" }}>
            <img style={{ width: "100%" }} src={imageUrl} />
          </ModalBody>
        </ModalLayout>
      )}
    </Box>
  );
};

//default value if no value is given

preview.defaultProps = {};

// validation
preview.propTypes = {
  attribute: PropTypes.object.isRequired,
};

export default preview;
