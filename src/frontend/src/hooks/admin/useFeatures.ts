import { useState, useEffect } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

// interface DecodedToken {
//   id_admin?: string; // Sesuaikan dengan struktur payload token
// }

interface PanelAdmin {
  HiddenScore: boolean;
  AntiResize: boolean;
  AntiSwitchingTab: boolean;
}

const useFeatures = () => {
  const [panelAdmin, setPanelAdmin] = useState<PanelAdmin>({
    HiddenScore: false,
    AntiResize: false,
    AntiSwitchingTab: false,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const token = localStorage.getItem("token");
        const tryJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuaXUiOjEsInNhbmRpIjoiMTExIiwiaWF0IjoxNzI2NDkxMDUzLCJleHAiOjE3MjY1MDE4NTN9.Fa8BDvPUI4Fe6fLnrB15n7MhC5GDMA-M4ihmr8TDJIY"
        console.log(token)
        if (!token) {
          throw new Error("Token not found");
        }

        // Decode token
        const decodedToken = jwt.decode(tryJWT) as {niu?: number};
        const id_admin = decodedToken.niu;
        console.log(id_admin)

        if (!id_admin) {
          throw new Error("ID Admin not found in token");
        }

        const response = await axios.get(
          `https://49kdgk28-7772.asse.devtunnels.ms/api/admin/${id_admin}`
        );

        // Asumsikan panel_admin adalah JSON string
        const panelAdminData: PanelAdmin = response.data.panel_admin
          ? JSON.parse(response.data.panel_admin)
          : { HiddenScore: false, AntiResize: false, AntiSwitchingTab: false };

        setPanelAdmin(panelAdminData);
      } catch (err: any) {
        setError("Failed to load features.");
        console.log(err.message)
      } finally {
        setLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  return { panelAdmin, loading, error, setPanelAdmin };
};

export default useFeatures;
