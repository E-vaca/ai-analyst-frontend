import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface SearchStockProps {
    ticker: string;
    setTicker: (ticker: string) => void;
    onSearch: () => void;
}

const SearchStock: React.FC<SearchStockProps> = ({ticker, setTicker, onSearch}) => {
    return (
        <div className="mb-6 mx-96 items-center justify-center text-center">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
            AI Stock Analyst
            </h2>
            <h3 className="text-center text-gray-600 mb-4">
            Get comprehensive stock analysis from four AI analysts, each specializing in different aspects of market analysis.
            </h3>
            <div className="flex flex-row mb-6 items-center text-center justify-center">
                <input
                    type="text"
                    autoComplete="off"
                    placeholder="Enter stock ticker (e.g., AAPL)"
                    value={ticker}
                    onChange={(e) => setTicker(e.target.value.toUpperCase())}
                    className="w-full p-3 mb-4 text-black placeholder:text-gray-500 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    onClick={onSearch}
                    className="h-12 bg-black p-2 rounded-xl border mx-2 w-12 text-white mb-4"
                >
                    <MagnifyingGlassIcon />
                </button>å
            </div>
        </div>
      );
    };
    
    export default SearchStock;