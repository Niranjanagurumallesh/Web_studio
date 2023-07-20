import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Spinner,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Footer";
import NavBar from "./NavBar";

const Users = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Simulating an asynchronous data fetch
    setTimeout(() => {
      setIsLoading(false); // Set isLoading to false after data is fetched
    }, 3000);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = event.target.email.value;
    const firstName = event.target.firstName.value;
    const country = event.target.country.value;
    const password = event.target.password.value;
    // Check if required fields are filled
    if (!email || !firstName || !country || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    // Password validation using regex
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain a special character."
      );
      return;
    }

    // Start loading
    setIsLoading(true);

    // Simulating an asynchronous request
    setTimeout(() => {
      toast.success("User created successfully.");
      // Stop loading
      setIsLoading(false);
    }, 2000);
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
    marginTop: "72px",
    marginBottom: "72px",
  };

  // Define the gradient colors for light and dark mode
  const lightModeGradient = "linear-gradient(to right, #44A08D, #093637)";
  const darkModeGradient =
    "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
  const gradient = colorMode === "light" ? lightModeGradient : darkModeGradient;

  // Define the box color for light and dark mode
  const lightModeBoxColor = "white";
  const darkModeBoxColor = "gray.800";
  const boxColor = useColorModeValue(lightModeBoxColor, darkModeBoxColor);

  // Render spinner if isLoading is true
  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="lg" color="teal.500" />
      </Center>
    );
  }

  // Render the form if not loading
  return (
    <div>
      <NavBar zIndex={20} />
      <div className="bg">
        <Center>
          <Box
            {...containerStyles}
            role={"group"}
            p={6}
            maxW={"2xl"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"lg"}
            pos={"relative"}
            zIndex={4}
            maxH={"600px"}
            bg={boxColor}
          >
            <Box
              role={"group"}
              p={6}
              maxW={"2xl"}
              w={"full"}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={4}
            >
              <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" name="email" placeholder="Email" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>First name</FormLabel>
                  <Input placeholder="First name" name="firstName" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Role</FormLabel>
                  <Select placeholder="Select role" name="country">
                    <option>Staff</option>
                    <option>Manager</option>
                  </Select>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                  />
                </FormControl>
                <Button colorScheme="teal" mt={4} type="submit">
                  Create User
                </Button>
              </form>
            </Box>
          </Box>
        </Center>
      </div>
      <ToastContainer />
      <Footer style={{ marginTop: "300px" }} />
    </div>
  );
};

export default Users;
