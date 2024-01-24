import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Dropdown from 'react-bootstrap/Dropdown';
import Skeleton from 'react-loading-skeleton'
import TikerTapeComp from "../../components/TickerTapeComp";
import moment from "moment";
import { EconomicCalendar } from "react-ts-tradingview-widgets";
import { MarketOverview } from "react-ts-tradingview-widgets";
import { MarketData } from "react-ts-tradingview-widgets";
import { SymbolInfo } from "react-ts-tradingview-widgets";
import { SingleTicker } from "react-ts-tradingview-widgets";
import { ForexCrossRates } from "react-ts-tradingview-widgets";
import { FundamentalData } from "react-ts-tradingview-widgets";
import { CompanyProfile } from "react-ts-tradingview-widgets";
import { Timeline } from "react-ts-tradingview-widgets";
import { ForexHeatMap } from "react-ts-tradingview-widgets";

import '../../style.css';
function Prediction() {
  const [data, setData] = useState({});
  const [symbol, setSymbol] = useState('');
  const [from_date, setFromDate] = useState(moment().format("YYYY-MM-DD"));
  const [to_date, setToDate] = useState(moment().format("YYYY-MM-DD"));
  const [autoComplete, setAutoComplete] = useState([]);
  const [loader, setLoader] = useState(false);
  async function getApiData(url = '') {
    const response = await fetch(url);
    return response.json();
  }
  const calculatePrediction = async (e) => {
    setLoader(true);
    console.log(from_date);
    console.log(to_date);
    var x = await getApiData(`/predict/${symbol}/${from_date}/${to_date}`);
    setData(x);
    setLoader(false);

  }

  const getTickets = async (e) => {
    e.preventDefault(0);
    setSymbol(e.target.value);
    const autoCompleteData = await getApiData(`/tickets/${e.target.value}`);
    setAutoComplete(autoCompleteData.data)

  }

  return (
    <>
      <Container>

        <div className="pred__page">
          <TikerTapeComp />
          <nav className="navbar navbar-dark bg-dark p-2">
            <a className="navbar-brand" href="/">
              <span className="pred__title">EquityAdvice</span>
            </a>
            <span className="navbar-text">Let's Predict !!!</span>
          </nav>
          <Container className="p-form" >
            <Dropdown>
              <Form>
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3 bg-primary p-2 text-white rounded-2">
                      <Form.Label>From</Form.Label>
                      <Form.Control
                        type="date"
                        value={from_date}
                        onChange={(e) => setFromDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3 bg-primary p-2 text-white rounded-2">
                      <Form.Label>To</Form.Label>
                      <Form.Control
                        type="date"
                        value={to_date}
                        onChange={(e) => setToDate(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <div className="mb-3">

                  <Dropdown.Toggle id="dropdown-basic" style={{ width: '100%' }}>
                    <label className="form-label">Stock Name</label>
                    <input type="text"
                      className="form-control"
                      id="inputStockName"
                      name="stockname"
                      placeholder="Enter stock name"
                      value={symbol}
                      onChange={getTickets}
                      required
                    />
                  </Dropdown.Toggle>
                </div>
                <Dropdown.Menu>
                  <Dropdown.Header>Trending Stocks</Dropdown.Header>

                  {
                    autoComplete.map((auto, key) =>
                      <option data-rr-ui-dropdown-item key={key} onClick={getTickets} value={auto.tik} className="dropdown-item">{auto.tik} &nbsp;&nbsp; | &nbsp;{auto.name}</option>
                    )
                  }

                </Dropdown.Menu>
                <button type="button" className="btn btn-primary" onClick={calculatePrediction}>
                  Predict
                </button>
              </Form>
            </Dropdown>
          </Container>
          <Container>
            {
              loader ?
                <>
                  <span>Please wait ...</span>
                  <Skeleton count={5} />
                </>

                : <>
                  Stock today's price is : <strong>{data.today_price}</strong><br></br>
                  Stock predicted price is : <strong>{data.predected_price}</strong>
                </>
            }
          </Container>

          <br />
          <br />
        </div>

      </Container>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={4}>
          <Timeline colorTheme="light" feedMode="market" market="crypto" height={500} width="100%"></Timeline>
          </Col>
          <Col md={8}>
          <ForexHeatMap colorTheme="light" autosize></ForexHeatMap>
          </Col>
        </Row>

      </Container>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={6}>
          <FundamentalData colorTheme="light" height={500} width="100%"></FundamentalData>
          </Col>
          <Col md={6}>
          <CompanyProfile colorTheme="light" height={500} width="100%"></CompanyProfile>
          </Col>
        </Row>

      </Container>
      <Container className="mt-5 mb-5">
        <h1>Forex Cross Rates </h1>

        <ForexCrossRates colorTheme="light" autosize></ForexCrossRates>
      </Container>
      <Container>
        <h1>Economic Calendar</h1>
        <EconomicCalendar colorTheme="light" height="500" width="100%"></EconomicCalendar>
      </Container>
      <Container className="mt-5 mb-5">
        <h1>Market Data</h1>
        <MarketData colorTheme="light" width="100%" height={500}></MarketData>
      </Container>
      <Container className="mt-5 mb-5">
        <Row>
          <Col md={6}>
            <SymbolInfo colorTheme="light" autosize></SymbolInfo>

          </Col>
          <Col md={6}>
            <SingleTicker colorTheme="light" width="100%"></SingleTicker>

          </Col>
        </Row>

      </Container>
      <Container className="mt-5 mb-5">
        <h1>Market Overview</h1>

        <MarketOverview colorTheme="dark" height={500} width="100%" showFloatingTooltip></MarketOverview>
      </Container>


    </>

  );
}

export default Prediction;

