import {
  useEffect,
  useState
} from "react";
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import {
  useWeb3Context
} from "./context/web3Context";

import {
  Box,
  useMediaQuery
} from "@mui/material";
import styled from 'styled-components'
import Home from './pages/Overview'
import Staking from './pages/Staking'
import Farming from './pages/Farming'
import ReStaking from "./pages/Restaking";

import NavBar from "./components/Navbar";
// import LeftSideBar from './components/LeftSideBar/LeftSideBar'
import Footer from './components/Footer'
import './App.css';

import Particles from "react-particles";
// import { Engine } from "tsparticles-engine";
// import { loadFirePreset } from "tsparticles-preset-fire";
// import { Engine } from "tsparticles-engine";
// import { loadSnowPreset } from "tsparticles-preset-snow";
import { loadBubblesPreset } from "tsparticles-preset-bubbles";
import RestakingDetail from "./pages/restaking/RestakingDetail";

import Notification from "./components/Notification";

function App() {
  const {
    connect,
    hasCachedProvider
  } = useWeb3Context();
  const pathname = window.location.pathname;
  const [notification, setNotification] = useState(null);
  const [curpage, setCurPage] = useState(0)
  const sm = useMediaQuery("(max-width : 480px)");
  useEffect(() => {
    if (hasCachedProvider()) {
      // then user DOES have a wallet
      console.log("hasCachedProvider")
      connect().then(msg => {
        if (msg.type === 'error') {
          setNotification(msg)
        }
      });

    } else {
      // then user DOES NOT have a wallet
    }

    // We want to ensure that we are storing the UTM parameters for later, even if the user follows links
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const customInit = (engine) => {
    // this adds the preset to tsParticles, you can safely use the
    // loadFirePreset(engine);
    loadBubblesPreset(engine);
    // loadSnowPreset(engine);

  }

  return (
    <BrowserRouter >
      <Particles
        id="tsparticles"
        init={customInit}
        options={{
          preset: "bubbles",
          background: {
            color: {
              value: "transparent",
            }
          }
        }}
      />
      <StyledContainer >
        <NavBar setNotification={
          setNotification
        }
          curpage={
            curpage
          }
          setCurPage={setCurPage}
        />

        <Box display={!sm || pathname === '/' ? 'flex' : "block"
        }
          width={
            sm ? '100%' : '85%'
          }
          margin={
            "0 auto"
          }
          zIndex={
            10
          }
          position={
            'relative'
          } >
          {/* <LeftSideBar curpage={
          curpage
        }
          setCurPage={
            setCurPage
          }
        /> */}

          <Routes>
            <Route exact path="/"
              element={< Home setNotification={
                setNotification
              }
              />} />

            <Route exact path="/tier-yield"
              element={< Staking setNotification={
                setNotification
              }
              />} />
            <Route exact path="/ai-yield"
              element={< ReStaking setNotification={
                setNotification
              }
              />} />
            <Route exact path="/ai-yield/detail"
              element={< RestakingDetail setNotification={
                setNotification
              }
              />} />

            <Route exact path="/lp-yield" element={<Farming setNotification={setNotification} />} />
          </Routes>
        </Box>

        <Footer curpage={curpage} setCurPage={setCurPage} />
      </StyledContainer>

      <Notification data={
        notification
      }
      />
    </BrowserRouter >
  );

}

const Vector = styled(Box)
  `
            background-image : url('/images/vector.png');
            background-size : 100% 100%;
            width : 244px;
            height : 244px;
            bottom : 65px;
            right : 77px;
            position : absolute;
            @media screen and (max-width : 800px){
                display : none;
  }
            `;


const StyledContainer = styled(Box)
  `
            position : relative;
            min-height : 100vh;
            width : 100vw;
            overflow-x : hidden;

            `;
export default App;
