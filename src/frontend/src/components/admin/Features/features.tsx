import React from "react";
import { ToggleLeft, ToggleRight } from "lucide-react";
import useGetFeatures from "../../../hooks/admin/useFeatures.js";
import axios from "axios";

interface FeaturesContentProps {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}

const FeaturesContent: React.FC<FeaturesContentProps> = ({ darkMode }) => {
  const { panelAdmin, loading, error, setPanelAdmin } = useGetFeatures();
  const adminId = "1"; // Replace with actual admin ID from context or auth

  // Toggle feature function
  const toggleFeature = async (feature: keyof typeof panelAdmin) => {
    // Toggle feature in state
    const updatedPanelAdmin = {
      ...panelAdmin,
      [feature]: !panelAdmin[feature],
    };

    setPanelAdmin(updatedPanelAdmin);

    try {
      // Send PUT request to update feature in the database
      await axios.put(
        `https://49kdgk28-7772.asse.devtunnels.ms/api/admin/${adminId}/feature`,
        {
          feature,
          value: updatedPanelAdmin[feature],
        }
      ).then(() => {
        console.log("Keubah anjay")
      });
    } catch (error: any) {
      console.error('Error updating feature:', error.response ? error.response.data : error.message);
      // Optionally revert the toggle state if the request fails
      setPanelAdmin(panelAdmin);
    }
  };

  // Handle loading state
  if (loading) {
    return <div>Loading features...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <main className="flex-1 p-8">
      <div
        className={`${
          darkMode ? "bg-gray-800" : "bg-white"
        } rounded-lg shadow p-6 ${darkMode ? "text-white" : "text-gray-900"} hidden`}
      >
        <h3 className="text-xl font-semibold mb-4">Feature Toggle Panel</h3>
        <div className="space-y-4">
          {(Object.keys(panelAdmin) as Array<keyof typeof panelAdmin>).map(
            (feature) => (
              <div key={feature} className="flex items-center justify-between">
                <span className="capitalize">
                  {feature.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <button
                  onClick={() => toggleFeature(feature)}
                  className={`p-2 rounded-full ${
                    panelAdmin[feature] ? "bg-green-500" : "bg-gray-300"
                  }`}
                >
                  {panelAdmin[feature] ? <ToggleRight /> : <ToggleLeft />}
                </button>
              </div>
            )
          )}
        </div>
      </div>
      <h1 className="text-red-600">BAYAR UNTUK BUKA FITUR INI!</h1>
    </main>
  );
};

export default FeaturesContent;