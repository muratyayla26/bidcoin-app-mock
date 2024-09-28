import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const useScrollToTop = (elementId: string): void => {
  const searchParams = useSearchParams();
  // TODO dynamic for other filters
  const page = searchParams.get("page");

  useEffect(() => {
    const handleRouteChange = () => {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    handleRouteChange();
  }, [page]);
};

export default useScrollToTop;
