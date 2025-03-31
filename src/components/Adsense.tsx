import { useEffect } from "react";

const AdSense = () => {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("Falha ao carregar o AdSense", e);
    }
  }, []);

  return (
    <div className="flex justify-center my-4">
      <ins 
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2677031729277257" 
        data-ad-slot="4416323937"
        data-ad-format="rspv"
      ></ins>
    </div>
  );
};

export default AdSense;
