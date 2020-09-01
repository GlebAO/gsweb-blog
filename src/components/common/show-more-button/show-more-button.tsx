import React, { useMemo, useEffect, useState } from "react";

interface ShowMoreButtonInterface {
  loading: boolean;
  page: number;
  perPage: number;
  total: number;
  onClick: () => void;
}

const ShowMoreButton: React.FC<ShowMoreButtonInterface> = ({
  page,
  perPage,
  total,
  onClick,
  loading,
}) => {
  const pageAmount = useMemo(() => Math.ceil(total / perPage), [
    total,
    perPage,
  ]);

  const [pageHeight, setPageHeight] = useState(document.documentElement.scrollHeight);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  //set page height after data loads from api
  useEffect(() => {
    setPageHeight(document.documentElement.scrollHeight);
  }, [loading])

  // handle resize of window
  useEffect(() => {

    const handleWindowResize = () => {
      setPageHeight(document.documentElement.scrollHeight);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  //load data on scroll down
  useEffect(() => {
    let lastKnownScrollPosition = 0;
    let ticking = false;

    const handleWindowScroll = () => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(function () {
          //  console.log(lastKnownScrollPosition, pageHeight - windowHeight)
          if (lastKnownScrollPosition > pageHeight - windowHeight - 42) {
                if(!loading && page < pageAmount){
                    onClick()
                }
          }
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [pageHeight, windowHeight, loading, onClick, page, pageAmount]);

  if (page < pageAmount) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="btn btn-secondary"
        disabled={loading}
      >
        Показать ещё... (Страница {page} из {pageAmount})
      </button>
    );
  }

  return null;
};

export default ShowMoreButton;
