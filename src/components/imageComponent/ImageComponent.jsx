import React, { useEffect, useRef, useState } from "react";
import "./ImageComponent.scss";

import Loader from "../loader/Loader";
import AppLoader from "../loader/AppLoader";

const ImageComponent = React.memo(
  React.forwardRef(
    (
      {
        formData,
        handleIsSearchModalVisiblity,
        SearchedPlayerName,
        position,
        setPosition,
        zoomLevel,
        zoomCardLevel,
        isMobile,
        appDataLoading,
      },
      ref
    ) => {
      const containerRef = useRef(null);
      const imageRef = useRef(null);

      const isDragging = useRef(false);
      const offset = useRef({ x: 0, y: 0 });

      const onMouseDown = (e) => {
        e.preventDefault(); // prevent text selection while dragging
        isDragging.current = true;
        const imgRect = imageRef.current.getBoundingClientRect();
        offset.current = {
          x: e.clientX - imgRect.left,
          y: e.clientY - imgRect.top,
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      const onMouseMove = (e) => {
        if (!isDragging.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();

        let newX = e.clientX - containerRect.left - offset.current.x;
        let newY = e.clientY - containerRect.top - offset.current.y;

        // Removed clamping to let image move freely
        setPosition({ x: newX, y: newY });
      };

      const onMouseUp = () => {
        isDragging.current = false;
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      useEffect(() => {
        console.log("Updated position state:", position);
      }, [position]);

      const [loadedImages, setLoadedImages] = useState({
        img1: false,
        img2: false,
      });

      const [allImagesLoaded, setAllImagesLoaded] = useState(false);

      useEffect(() => {
        if (loadedImages.img1 && loadedImages.img2) {
          setAllImagesLoaded(true);
        }
      }, [loadedImages]);

      const handleImageLoad = (imgKey) => {
        setLoadedImages((prev) => ({ ...prev, [imgKey]: true }));
      };

      return (
        <div className="main-img-div-scss">
          {!loadedImages.img1 && (
            <img
              src={formData.cardImg}
              alt=""
              style={{ display: "none" }}
              onLoad={() => handleImageLoad("img1")}
            />
          )}
          {!loadedImages.img2 && (
            <img
              src={formData.playerImg}
              alt=""
              style={{ display: "none" }}
              onLoad={() => handleImageLoad("img2")}
            />
          )}

          {!allImagesLoaded ? (
            <div className="main-img-div-scss">
              <AppLoader />
            </div>
          ) : (
            <>
              <div id="main-img-div" ref={ref}>
                {/* main images */}

                {appDataLoading && isMobile ? (
                  <>
                    <div
                      id="card-player-img-container"
                      ref={containerRef}
                      style={{ position: "relative" }}
                    >
                      <div className="loder-div-css">
                        <Loader />
                      </div>
                    </div>
                  </>
                ) : (
                  <div
                    id="card-player-img-container"
                    ref={containerRef}
                    style={{ position: "relative" }}
                  >
                    <img
                      src={formData.cardImg}
                      alt="Card"
                      id="card-comp"
                      loading="lazy"
                      style={{
                        transform: `scale(${zoomCardLevel})`,
                        transition: "transform 0.1s ease-in-out",
                      }}
                    />
                    <img
                      ref={imageRef}
                      onMouseDown={onMouseDown}
                      onTouchStart={(e) => {
                        isDragging.current = true;
                        const touch = e.touches[0];
                        const imgRect =
                          imageRef.current.getBoundingClientRect();
                        offset.current = {
                          x: touch.clientX - imgRect.left,
                          y: touch.clientY - imgRect.top,
                        };

                        const onTouchMove = (moveEvent) => {
                          if (!isDragging.current) return;
                          const containerRect =
                            containerRef.current.getBoundingClientRect();
                          const touchMove = moveEvent.touches[0];

                          let newX =
                            touchMove.clientX -
                            containerRect.left -
                            offset.current.x;
                          let newY =
                            touchMove.clientY -
                            containerRect.top -
                            offset.current.y;

                          // Remove clamping, allow image to move outside container freely
                          setPosition({ x: newX, y: newY });
                        };

                        const onTouchEnd = () => {
                          isDragging.current = false;
                          document.removeEventListener(
                            "touchmove",
                            onTouchMove
                          );
                          document.removeEventListener("touchend", onTouchEnd);
                        };

                        document.addEventListener("touchmove", onTouchMove, {
                          passive: false,
                        });
                        document.addEventListener("touchend", onTouchEnd);
                      }}
                      draggable={false}
                      src={formData.playerImg}
                      alt="Player"
                      id="player-comp-img"
                      loading="lazy"
                      style={{
                        position: "absolute",
                        left: `${position.x}px`,
                        top: `${position.y}px`,
                        cursor: "grab",
                        userSelect: "none",
                        touchAction: "none",
                        transform: `scale(${zoomLevel})`,
                        transition: "transform 0.1s ease-in-out",
                      }}
                    />

                    {/* name, numbers */}
                    <div id="ovr-position-container">
                      <p
                        id="ovr-text-in-card"
                        style={{
                          color: `rgba(${formData?.ovrColor?.r}, ${formData?.ovrColor?.g}, ${formData?.ovrColor?.b}, ${formData?.ovrColor?.a})`,
                        }}
                      >
                        {formData?.ovr}
                      </p>
                      <p
                        id="position-text-in-card"
                        style={{
                          color: `rgba(${formData?.positionColor?.r}, ${formData?.positionColor?.g}, ${formData?.positionColor?.b}, ${formData?.positionColor?.a})`,
                        }}
                      >
                        {formData?.position}
                      </p>
                    </div>

                    <p
                      id="player-name-in-card"
                      style={{
                        color: `rgba(${formData?.nameColor?.r}, ${formData?.nameColor?.g}, ${formData?.nameColor?.b}, ${formData?.nameColor?.a})`,
                      }}
                    >
                      {formData?.name?.split(" ")[0]}
                    </p>

                    <p
                      id="trainingLevel-in-card"
                      style={{
                        display:
                          formData?.trainingLevel == 0 ||
                          formData.rank === "d1.png"
                            ? "none"
                            : "block",
                      }}
                    >
                      {formData?.trainingLevel}
                    </p>

                    {/* flags */}
                    <div
                      className={`flag-main-container ${
                        !formData?.isConceptCard && formData.leagueLogo
                          ? ""
                          : "gap-responsive"
                      }`}
                    >
                      <img
                        src={formData.nationFlagImg}
                        alt="flag1"
                        className="flag-common-css"
                      />

                      {!formData?.isConceptCard && formData.leagueLogo && (
                        <img
                          src={formData.leagueLogo}
                          alt="flag2"
                          className="flag-common-css"
                        />
                      )}

                      <img
                        src={formData.clauLogo}
                        alt="flag3"
                        className="flag-common-css"
                      />
                    </div>

                    {/* Rank */}
                    {formData.rank !== "d1.png" && (
                      <img
                        src={"rank_img/" + formData.rank}
                        alt="rank"
                        className="rank-img"
                      />
                    )}
                  </div>
                )}
              </div>

              <div id="search-n-clear">
                <div id="search-btn" onClick={handleIsSearchModalVisiblity}>
                  {SearchedPlayerName}
                </div>
              </div>

              {isMobile && (
                <div className="line-with-text">
                  <span>Scroll</span>
                </div>
              )}
            </>
          )}
        </div>
      );
    }
  )
);

export default ImageComponent;
