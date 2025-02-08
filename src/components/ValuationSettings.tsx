// src/components/ValuationSettings.tsx
import React, { useState } from "react";

interface ValuationSettingsProps {
  onSubmit: (settings: ValuationSettingsInputs) => void;
}

export interface ValuationSettingsInputs {
  threeYearFCFCAGR: number;
  threeYearOECAGR: number;
  requiredReturn: number;
  terminalGrowthRate: number;
}

const ValuationSettings: React.FC<ValuationSettingsProps> = ({ onSubmit }) => {
  // Store values as decimals (e.g., 1.20 for 120%)
  const [inputs, setInputs] = useState<ValuationSettingsInputs>({
    threeYearFCFCAGR: 0.10,
    threeYearOECAGR: 0.10,
    requiredReturn: 0.115,
    terminalGrowthRate: 0.03,
  });

  // When the user changes a value, convert the entered percentage to a decimal
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Divide by 100 because the user enters percentage (e.g., 120 => 1.20)
    setInputs((prev) => ({
      ...prev,
      [name]: parseFloat(value) / 100,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-400 rounded-xl mb-6 w-96">
      <h3 className="text-xl text-center text-black font-bold mb-4">
        Valuation Analyst Settings
      </h3>

      <div className="mb-4">
        <label className="block text-black mb-1" htmlFor="threeYearFCFCAGR">
          3-Year FCF CAGR (%):
        </label>
        <div className="flex">
          <input
            type="number"
            step="0.1"
            name="threeYearFCFCAGR"
            id="threeYearFCFCAGR"
            // Multiply by 100 to display as a percentage
            value={(inputs.threeYearFCFCAGR * 100).toString()}
            onChange={handleChange}
            className="border p-2 rounded-xl w-full bg-white text-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-black mb-1" htmlFor="threeYearFCFCAGR">
          3-Year Owners Earnings CAGR (%):
        </label>
        <div className="flex">
          <input
            type="number"
            step="0.1"
            name="threeYearOECAGR"
            id="threeYearOECAGR"
            value={(inputs.threeYearOECAGR * 100).toString()}
            onChange={handleChange}
            className="border p-2 rounded-xl w-full bg-white text-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-black mb-1" htmlFor="requiredReturn">
          WACC (%):
        </label>
        <div className="flex">
          <input
            type="number"
            step="0.1"
            name="requiredReturn"
            id="requiredReturn"
            value={(inputs.requiredReturn * 100).toString()}
            onChange={handleChange}
            className="border p-2 rounded-xl w-full bg-white text-black"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-black mb-1" htmlFor="terminalGrowthRate">
          Terminal Growth Rate (%):
        </label>
        <div className="flex">
          <input
            type="number"
            step="0.1"
            name="terminalGrowthRate"
            id="terminalGrowthRate"
            value={(inputs.terminalGrowthRate * 100).toString()}
            onChange={handleChange}
            className="border p-2 rounded-xl w-full bg-white text-black"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="px-4 py-2 bg-black rounded-xl text-white hover:bg-gray-800"
        >
          Update Settings
        </button>
      </div>
    </form>
  );
};

export default ValuationSettings;