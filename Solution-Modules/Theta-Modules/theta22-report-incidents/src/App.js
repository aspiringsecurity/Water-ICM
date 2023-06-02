import { Layout, Menu } from "antd";
import { ACTIVE_NETWORK, APP_NAME } from "./util/constants";

import { Routes, Route, Link, Router } from "react-router-dom";
import UploadPage from "./components/UploadPage";

import logo from "./assets/logo.png";
import "antd/dist/antd.min.css";
import "./App.css";
import About from "./components/About";
import Discover from "./components/Discover";
import ConnectButton from "./components/ConnectButton";

const { Header, Footer, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
      <Layout>
        <Header className="header">
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Link to="/">
              <Menu.Item key="0">
                <img src={logo} className="header-image" />
              </Menu.Item>
            </Link>
            <Link to="/">
              <Menu.Item key="1">Home</Menu.Item>
            </Link>
            <Link to="/sell">
              <Menu.Item key="2">Sell Content</Menu.Item>
            </Link>
            <Link to="/about">
              <Menu.Item key="3">About</Menu.Item>
            </Link>
            <ConnectButton />
          </Menu>
        </Header>
        <Content>
          <div className="container">
            <Routes>
            <Route exact path="/" element={<About/>}/>
              <Route exact path="/sell" element={<UploadPage />} />
              <Route exact path="/about" element={<About />} />
              <Route path="/:address" element={<Discover />} />
            </Routes>
          </div>
        </Content>
        <Footer>
          {APP_NAME} &copy;2022 - Built for the{" "}
          <a href="https://theta-2022-hackathon.devpost.com/" target="_blank">
            Theta Q1 hackathon 2022
          </a>
          . Active Network: {ACTIVE_NETWORK.name}
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
