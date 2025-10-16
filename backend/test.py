#Testing function to see what Alpaca API returns for historical options data
import os
from dotenv import load_dotenv
from alpaca.data import OptionHistoricalDataClient
from alpaca.data.requests import (
    OptionLatestQuoteRequest,
    OptionChainRequest,
)

# Load environment variables from .env file
load_dotenv()

def main():
    print("Starting Alpaca API test...")

    try:
        # Load API keys from environment variables
        api_key = os.getenv("ALPACA_API_KEY")
        secret_key = os.getenv("ALPACA_SECRET_KEY")
        
        if not api_key or not secret_key:
            raise ValueError("API keys not found. Please set ALPACA_API_KEY and ALPACA_SECRET_KEY in .env file")
        
        option_client = OptionHistoricalDataClient(api_key, secret_key)

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