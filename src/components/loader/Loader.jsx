import React from "react";

function Loader() {
  return (
    <>
      <span className="loader_small"></span>
      <style>{`
        .loader_small {
          width: 100%;
          height: 100%;
          aspect-ratio: 1 / 1;
          border: 4px solid #FFF;
          border-bottom-color: transparent;
          border-radius: 50%;
          display: inline-block;
          box-sizing: border-box;
          animation: rotation 1s linear infinite;
        }

        @keyframes rotation {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}

export default Loader;
