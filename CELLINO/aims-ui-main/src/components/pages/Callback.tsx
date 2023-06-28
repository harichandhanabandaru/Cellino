import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  let navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("code") !== null) {
      navigate("/image-viewer");
    }
  }, [navigate]);

  return <></>;
}
