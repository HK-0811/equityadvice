import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/home";
import NotFound from "./pages/not-found/not-found";
import Prediction from "./pages/prediction-tool/prediction";
import Bot from "./pages/trading-bot/bot";
import 'react-loading-skeleton/dist/skeleton.css'
import TikerTapeComp from "./components/TickerTapeComp";

const App = () => {

  return (
    <BrowserRouter>
      <TikerTapeComp/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/pred" element={<Prediction />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
