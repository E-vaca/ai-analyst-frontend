import React, { useState, useEffect } from "react";
import { AxiosError } from "axios";
import apiClient from "../api/apiClient";
import ValuationSettings, { ValuationSettingsInputs } from "./ValuationSettings";
import SearchStock from "./SearchStock";
{/* import { Button } from "@headlessui/react"; */}

interface Recommendation {
  action: string;
  confidence: number;
  agent_signals: {
    agent: string;
    signal: string;
    confidence: number;
  }[];
  reasoning: Record<string, unknown>;
}

interface AgentMessage {
  agent_name: string;
  content: Recommendation;  // Updated: content is now a Recommendation object
}

interface AllAgentStates {
  messages: AgentMessage[];
  data: {
    ticker?: string;
    start_date?: string;
    end_date?: string;
    // ...other fields
  };
  metadata: {
    stock_id?: number;
    ticker?: string;
    // ...other fields
  };
}

interface ValuationQueryParams {
  ticker: string;
  threeYearFCFCAGR?: number;
  requiredReturn?: number;
  terminalGrowthRate?: number;
}

const AnalystRecommendation: React.FC = () => {
  const [ticker, setTicker] = useState<string>("");
  const [finalRecommendation, setFinalRecommendation] = useState<Recommendation | null>(null);
  const [agentStates, setAgentStates] = useState<AllAgentStates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [valuationInputs, setValuationInputs] = useState<ValuationSettingsInputs | null>(null);
  {/* const [hideValuationSettings, setHideValuationSettings] = useState<boolean>(false); */}

  // useEffect to reset state when the component mounts.
  useEffect(() => {
    setTicker("");
    setFinalRecommendation(null);
    setAgentStates(null);
    setError(null);
    setLoading(false);
  }, []);

  const fetchWorkflowData = async () => {
    if (!ticker) {
      setError("Please enter a valid ticker.");
      return;
    }

    const params: ValuationQueryParams = {
      ticker,
      ...(valuationInputs
        ? {
            threeYearFCFCAGR: valuationInputs.threeYearFCFCAGR,
            requiredReturn: valuationInputs.requiredReturn,
            terminalGrowthRate: valuationInputs.terminalGrowthRate,
          }
        : {}),
    };

    setError(null);
    setFinalRecommendation(null);
    setAgentStates(null);
    setLoading(true);

    try {
      const response = await apiClient.get<AllAgentStates>("/all-agent-states",{params});
      const allStates = response.data;
      setAgentStates(allStates);

      if (allStates.messages && allStates.messages.length > 0) {
        const lastMessage = allStates.messages[allStates.messages.length - 1];
        
        // Check if lastMessage.content is a string; if so, try to parse it
        let recommendation = lastMessage.content;
        if (typeof recommendation === "string") {
          try {
            recommendation = JSON.parse(recommendation);
          } catch (e) {
            console.error("Error parsing final recommendation:", e);
            // Optionally, you could leave it as-is or set an error message.
          }
        }
        setFinalRecommendation(recommendation);
    }
      } catch (err: AxiosError | unknown) {
      console.error("Error fetching workflow data:", err);
      if (err instanceof AxiosError && err.response) {
        setError(
          err.response.data?.detail ||
          "An error occurred while fetching the workflow data."
        );
      } else if (err instanceof Error) {
        setError(err.message || "An unexpected error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    // This resets the component state to its initial state.
    setTicker("");
    setFinalRecommendation(null);
    setAgentStates(null);
    setError(null);
  };

  const handleValuationSettingsSubmit = (settings: ValuationSettingsInputs) => {
    setValuationInputs(settings);
  };

  {/* const handleToggleValuationSettings = () => {
    setHideValuationSettings((prev) => !prev);
  } */}

  return (
    <div className="w-full mx-auto p-6">
      <div className="-mb-4">
        <SearchStock ticker={ticker} setTicker={setTicker} onSearch={fetchWorkflowData} />
      </div>

      {loading && <p className="text-center text-gray-600 mb-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mb-4">{error}</p>}

      <div className="justify-items-center w-full">
        {/* {!hideValuationSettings && ( */}
          <div>
            <ValuationSettings onSubmit={handleValuationSettingsSubmit} />
          </div>
        {/* )} */}
        {/* <Button
            onClick={handleToggleValuationSettings}
            className="px-2 text-black border border-gray-400 rounded bg-white hover:bg-gray-200 transition-colors"
          >
            {hideValuationSettings ? 'Show Valuation Settings' : 'Hide Valuation Settings'}
        </Button> */}
      </div>

      {finalRecommendation && (
        <div className="mt-8 text-left">
          <h3 className="text-2xl font-medium text-gray-900 mb-3">
            Final Recommendation for {ticker}:
          </h3>
          <pre className="bg-gray-200 text-gray-800 p-4 rounded-lg shadow-md whitespace-pre-wrap">
            {typeof finalRecommendation.reasoning === "object"
              ? JSON.stringify(finalRecommendation.reasoning, null, 2)
              : finalRecommendation.reasoning}
          </pre>
        </div>
      )}

      {agentStates && agentStates.messages && (
        <div className="mt-8 text-left">
          <h3 className="text-2xl font-medium text-gray-900 mb-4">
            Agent Responses:
          </h3>
          {agentStates.messages.map((msg, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-200 rounded-lg shadow">
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                {msg.agent_name.replace("_", " ")}
              </h4>
              <p className="text-gray-800">{JSON.stringify(msg.content)}</p>
            </div>
          ))}
        </div>
      )}

      {(finalRecommendation || agentStates || error) && (
        <div className="mt-6 text-center">
          <button
            onClick={handleReset}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default AnalystRecommendation;