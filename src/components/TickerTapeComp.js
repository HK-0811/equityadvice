import { TickerTape } from "react-ts-tradingview-widgets";


function TikerTapeComp(){
    const symbols = [
        {
          description: "",
          proName: "BSE:BAJFINANCE",
        },
        {
          description: "",
          proName: "BSE:KOTAKBANK",
        },
        {
          description: "",
          proName: "BSE:RELIANCE",
        },
        {
          description: "",
          proName: "BSE:BHARTIARTL",
        },
        {
          description: "",
          proName: "BSE:HDFC",
        },
        {
          description: "",
          proName: "BSE:TCS",
        },
      ];
    return (
        <TickerTape
        colorTheme="light"
        symbols={symbols}
        copyrightStyles={[{ parent: { color: "red" } }]}
        largeChartUrl="https://www.gateway-tt.in/trade?orderConfig=%5B%7B%22quantity%22%3A10%2C%22ticker%22%3A%22RELIANCE%22%7D%5D&cardsize=big&withSearch=false&withTT=false"
      ></TickerTape>
    )
}

export default TikerTapeComp;