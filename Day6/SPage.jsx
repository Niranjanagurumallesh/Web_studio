import React from "react";
import { Box, ChakraProvider, extendTheme, CSSReset } from "@chakra-ui/react";
import Stocks from "./Stocks";

const theme = extendTheme({
  styles: {
    global: {
      body: {},
    },
  },
});

function SPage() {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box>
        <Stocks />
      </Box>
    </ChakraProvider>
  );
}

export default SPage;
