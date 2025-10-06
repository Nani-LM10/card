import React from "react";

const DownloadImgTypeComponent = React.memo(
  ({ formData, ImgType, position, zoomLevel, zoomCardLevel }) => {
    const imgSrc = formData?.[ImgType];

    return (
      <div className="Card-type-select">
        <div className="card-player-img-container">
          {/* main images */}
          <img
            src={imgSrc}
            alt="Card"
            className="card-comp"
            loading="lazy"
            style={{
              transform: `scale(${zoomCardLevel})`,
              transition: "transform 0.1s ease-in-out",
            }}
          />
          <img
            src={formData.playerImg}
            alt="Player"
            style={{
              left: `${position.x - (window.innerWidth <= 796 ? 27 : 22)}px`,
              top: `${position.y - (window.innerWidth <= 796 ? 5 : -5)}px`,
              transform: `scale(${zoomLevel})`,
              transition: "transform 0.1s ease-in-out",
            }}
            className="player-comp-img"
            loading="lazy"
          />

          {/* name, numbers */}
          <div className="ovr-position-container">
            <p
              className="ovr-text-in-card"
              style={{
                color: `rgba(${formData?.ovrColor?.r}, ${formData?.ovrColor?.g}, ${formData?.ovrColor?.b}, ${formData?.ovrColor?.a})`,
              }}
            >
              {formData?.ovr}
            </p>
            <p
              className="position-text-in-card"
              style={{
                color: `rgba(${formData?.positionColor?.r}, ${formData?.positionColor?.g}, ${formData?.positionColor?.b}, ${formData?.positionColor?.a})`,
              }}
            >
              {formData?.position}
            </p>
          </div>

          <p
            className="trainingLevel-in-card-sm"
            style={{
              display:
                formData?.trainingLevel == 0 || formData.rank === "d1.png"
                  ? "none"
                  : "block",
            }}
          >
            {formData?.trainingLevel}
          </p>

          <p
            className="player-name-in-card"
            style={{
              color: `rgba(${formData?.nameColor?.r}, ${formData?.nameColor?.g}, ${formData?.nameColor?.b}, ${formData?.nameColor?.a})`,
            }}
          >
            {formData?.name?.split(" ")[0]}
          </p>

          <div className="flag-main-container-sm-scr">
            <img
              src={formData.nationFlagImg}
              alt="flag1"
              className="flag-common-css-sm-scr"
              loading="lazy"
            />
            {!formData?.isConceptCard && formData.leagueLogo && (
              <img
                src={formData.leagueLogo}
                alt="flag2"
                className="flag-common-css-sm-scr"
                loading="lazy"
              />
            )}

            <img
              src={formData.clauLogo}
              alt="flag3"
              className="flag-common-css-sm-scr"
              loading="lazy"
            />
          </div>

          {/* Rank */}
          {formData.rank !== "d1.png" && (
            <img
              src={"rank_img/" + formData.rank}
              alt="rank"
              className="rank-img-sm"
              loading="lazy"
            />
          )}
        </div>
      </div>
    );
  }
);

export default DownloadImgTypeComponent;
