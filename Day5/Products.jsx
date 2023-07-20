import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  Wrap,
  WrapItem,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Spinner,
  Container,
  useColorMode,
  background,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import NavBar from "./NavBar";
import Footer from "./Footer";

const ServiceBox = ({ title, description, image, onDelete }) => (
  <Box
    role={"group"}
    p={6}
    maxW={"330px"}
    w={"full"}
    boxShadow={"2xl"}
    rounded={"lg"}
    pos={"relative"}
    zIndex={1}
  >
    <Box rounded={"lg"} mt={-12} pos={"relative"} height={"230px"}>
      <Image
        rounded={"lg"}
        height={230}
        width={282}
        objectFit={"cover"}
        src={image}
      />
    </Box>
    <Button
      onClick={onDelete}
      position="absolute"
      top={2}
      right={2}
      variant="solid"
      colorScheme="red"
      size="sm"
    >
      <DeleteIcon />
    </Button>
    <Stack pt={10} align={"center"}>
      <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
        {title}
      </Text>
      <Heading
        fontSize={"2xl"}
        fontFamily={"body"}
        fontWeight={500}
        color={"gray.500"}
      >
        {description}
      </Heading>
    </Stack>
  </Box>
);

const Products = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newProductTitle, setNewProductTitle] = useState("");
  const [newProductDescription, setNewProductDescription] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { colorMode } = useColorMode();

  useEffect(() => {
    // Simulating data loading delay
    setTimeout(() => {
      setProducts([
        {
          title: "Pinky Chair",
          description: "$23.45",
          image:
            "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
        },
        {
          title: "Umbrella",
          description: "$26.78",
          image:
            "https://res.cloudinary.com/dyizhabab/image/upload/f_auto,q_auto/v1/Inventory/lykyactfgwpc2onrqex1",
        },
      ]);
      setIsLoading(false);
    }, 1500);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setIsLoading(true);
    };

    window.onbeforeunload = handleBeforeUnload;

    return () => {
      window.onbeforeunload = null;
    };
  }, []);

  const handleAddProduct = () => {
    const newProduct = {
      title: newProductTitle,
      description: newProductDescription,
      image: "https://placehold.it/200", // Replace with the desired image URL
    };

    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setNewProductTitle("");
    setNewProductDescription("");
    setIsModalOpen(false);
  };

  const handleDeleteProduct = (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      updatedProducts.splice(index, 1);
      return updatedProducts;
    });
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "700px",
  };

  // const lightGradient = "linear(to-r, teal.500, cyan.500)";
  // const darkGradient = "linear(to-r, purple.500, pink.500)";
  // const gradient = useColorModeValue(lightGradient, darkGradient);
  const lightModeGradient = "linear-gradient(to right, #44A08D, #093637)";
  const darkModeGradient =
    "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
  const gradient = colorMode === "light" ? lightModeGradient : darkModeGradient;

  // Define the box color for light and dark mode
  const lightModeBoxColor = "white";
  const darkModeBoxColor = "gray.800";
  const boxColor = useColorModeValue(lightModeBoxColor, darkModeBoxColor);

  return (
    <div>
      {isLoading ? (
        <Center h="100vh">
          <Spinner size="lg" color="teal.500" />
        </Center>
      ) : (
        <>
          <NavBar />
          <div
            className="content"
            style={{ ...containerStyles}}
            className="bg"
            // style={{ ...containerStyles, background: gradient }}
          >
            <WrapItem style={{ position: "absolute", top: 100, right: 10 }}>
              <Button colorScheme="blue" onClick={() => setIsModalOpen(true)}>
                Add Product
              </Button>
            </WrapItem>

            <Center py={12}>
              <Wrap spacing={12} justify="center">
                {products.map((product, index) => (
                  <WrapItem key={index} bg={boxColor}>
                    <ServiceBox
                      title={product.title}
                      description={product.description}
                      image={product.image}
                      onDelete={() => handleDeleteProduct(index)}
                    />
                  </WrapItem>
                ))}
              </Wrap>
            </Center>
          </div>
          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <Stack spacing={3}>
                    <FormLabel>Title</FormLabel>
                    <Input
                      value={newProductTitle}
                      onChange={(e) => setNewProductTitle(e.target.value)}
                    />
                    <FormLabel>Description</FormLabel>
                    <Input
                      value={newProductDescription}
                      onChange={(e) => setNewProductDescription(e.target.value)}
                    />
                  </Stack>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleAddProduct}>
                  Add
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          <Footer />
        </>
      )}
      <style jsx>{``}</style>
    </div>
  );
};

export default Products;
