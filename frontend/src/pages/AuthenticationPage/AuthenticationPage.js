import {
  Box,
  Container,
  Tab,
  TabList,
  Tabs,
  Text,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Login from "../../components/Authentication/Login";
import SignUp from "../../components/Authentication/SignUp";
import "./AuthenticationPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../../components/Navbar/Navbar.jsx";
import { useNavigate } from "react-router-dom";

const AuthenticationPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      navigate("/");
    } else {
      navigate("/authenticate");
    }
  }, []);

  return (
    <div className="homePage">
      <Container maxWidth="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
        >
          <Text
            textAlign="center"
            fontSize="4xl"
            fontFamily="Work sans"
            color="black"
          >
            Authenticate
          </Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px">
          <Tabs variant="soft-rounded" colorScheme="green">
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <SignUp />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default AuthenticationPage;
