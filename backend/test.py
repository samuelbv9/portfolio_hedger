#Testing function to see what Alpaca API returns for historical options data
from alpaca.data import OptionHistoricalDataClient
from alpaca.data.requests import (
    OptionLatestQuoteRequest,
    OptionChainRequest,
)

def main():
    print("Starting Alpaca API test...")

    try:
        option_client = OptionHistoricalDataClient("PKVN3Z3LO82GRQXB3GZ5",  "bnT1oOgufNXimZegURwQ7lhyprbOx7xnKiNyrCVl")

        req = OptionChainRequest(
            underlying_symbol ="SPY",
        )
        # The option chain endpoint for underlying symbol provides the latest trade, 
        # latest quote, implied volatility, and greeks for each contract symbol of the underlying symbol.
        # Returns Union[Dict[str, OptionsSnapshot], RawData]
        option_chain = option_client.get_option_chain(req)
        print(option_chain)
        # print(option_chain.keys())
        # print(option_chain['SPY'])
        # print(option_chain['SPY'].keys())
        # print(option_chain['SPY'].values())
        # print(option_chain['SPY'].values()[0])
        # print(option_chain['SPY'].values()[0].keys())
        # print(option_chain['SPY'].values()[0].values())
        # print(option_chain['SPY'].values()[0].values()[0])
        # print(option_chain['SPY'].values()[0].values()[0].keys())
        
    except Exception as e:
        print(f"Error: {e}")
    finally:
        print("Alpaca API test completed.")

if __name__ == "__main__":
    main()