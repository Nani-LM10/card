import React, { useEffect, useState } from "react";

import "./FeatureCardinputComponent.scss";
import LazyLoad from "react-lazyload";

import Loader from "../loader/Loader";

const FeatureCardinputComponent = React.memo(
  ({
    formData,
    handleFormDataChange,
    handleColorPaletModalVisiblity,
    handleIsCardDesignModalVisiblity,
    handleIsPlayerPickerModalVisiblity,
    handleIsDownloadBtnModalVisiblity,
    handleIsClubCardModalVisiblity,
    handleIsLeagueCardModalVisiblity,
    handleIsNationCardModalVisiblity,
    handleIsRankModalVisiblity,
    isMobile,
    zoomIn,
    zoomOut,
    zoomInCard,
    zoomOutCard,
    appDataLoading,
  }) => {
    // const [featureLoader, setFeatureLoader] = useState(false);
    // const [shouldOpenModal, setShouldOpenModal] = useState(false);

    // useEffect(() => {
    //   if (!appDataLoading && shouldOpenModal) {
    //     handleIsCardDesignModalVisiblity();
    //     setFeatureLoader(false);
    //     setShouldOpenModal(false);
    //   }
    // }, [appDataLoading, shouldOpenModal, handleIsCardDesignModalVisiblity]);

    // const handleLoaderBeforeModalOpenClose = () => {
    //   if (appDataLoading) {
    //     setFeatureLoader(true);
    //     setShouldOpenModal(true);
    //   } else {
    //     handleIsCardDesignModalVisiblity();
    //   }
    // };

    const [featureLoader, setFeatureLoader] = useState(false);
    const [shouldOpenModal, setShouldOpenModal] = useState(null);

    const handleShouldOpneModel = (value) => {
      if (value === "card") {
        handleIsCardDesignModalVisiblity();
      } else if (value === "player") {
        handleIsPlayerPickerModalVisiblity();
      } else if (value === "nation") {
        handleIsNationCardModalVisiblity();
      } else if (value === "league") {
        handleIsLeagueCardModalVisiblity();
      } else if (value === "club") {
        handleIsClubCardModalVisiblity();
      } else if (value === "rank") {
        handleIsRankModalVisiblity();
      }
    };

    useEffect(() => {
      if (!appDataLoading && shouldOpenModal) {
        handleShouldOpneModel(shouldOpenModal);

        setFeatureLoader(false);
        setShouldOpenModal(null);
      }
    }, [
      appDataLoading,
      shouldOpenModal,
      handleIsCardDesignModalVisiblity,
      handleIsPlayerPickerModalVisiblity,
    ]);

    const handleLoaderBeforeModalOpenClose = (modalType) => {
      // console.log(modalType);
      if (appDataLoading) {
        setFeatureLoader(true);
        setShouldOpenModal(modalType);
      } else {
        handleShouldOpneModel(modalType);
      }
    };

    return (
      <>
        {isMobile && (
          <div className="button-div">
            <button
              className="btn-65 btn-txt-n-img"
              // onClick={handleIsCardDesignModalVisiblity}
              onClick={() => handleLoaderBeforeModalOpenClose("card")}
            >
              <p>Card Design</p>
              <LazyLoad height={0} offset={100} once>
                {featureLoader && shouldOpenModal === "card" ? (
                  <Loader />
                ) : (
                  <img src={formData.cardImg} alt="card-img" />
                )}
              </LazyLoad>
            </button>
            <div className="btn-35 zoom-btn">
              <span>Zoom</span>
              <button onClick={zoomInCard}>+</button>
              <button onClick={zoomOutCard}>−</button>
            </div>
          </div>
        )}

        {isMobile && (
          <div className="button-div">
            <button
              className="btn-65 btn-txt-n-img"
              // onClick={handleIsPlayerPickerModalVisiblity}
              onClick={() => handleLoaderBeforeModalOpenClose("player")}
            >
              <p>Player image</p>
              <LazyLoad height={0} offset={100} once>
                {featureLoader && shouldOpenModal === "player" ? (
                  <Loader />
                ) : (
                  <img
                    src={formData.playerImg}
                    alt="player-img"
                    loading="lazy"
                    className="btn-txt-n-img-img"
                  />
                )}
              </LazyLoad>
            </button>
            <div className="btn-35 zoom-btn">
              <span>Zoom</span>
              <button onClick={zoomIn}>+</button>
              <button onClick={zoomOut}>−</button>
            </div>
          </div>
        )}

        <div className="feature-box">
          <p className="heading-p">Name</p>
          <input
            type="text"
            value={formData.name}
            onChange={(e) =>
              handleFormDataChange("name", e.target.value.toUpperCase())
            }
          />
        </div>
        <div className="field-grp">
          <div className="feature-box">
            <p className="heading-p">OVR</p>
            <input
              type="text"
              value={formData.ovr}
              onChange={(e) => handleFormDataChange("ovr", e.target.value)}
              onInput={(e) => {
                let input = e.target.value.replace(/[^0-9]/g, "");

                if (input === "") {
                  e.target.value = "";
                } else {
                  let number = parseInt(input, 10);

                  if (number > 120) {
                    number = parseInt(input.slice(0, 2), 10);
                  }

                  e.target.value = number.toString();
                }
              }}
            />
          </div>
          <div className="feature-box">
            <p className="heading-p">Position</p>
            <input
              type="text"
              onInput={(e) => {
                e.target.value = e.target.value
                  .toUpperCase()
                  .replace(/[^A-Z]/g, "")
                  .slice(0, 4);
              }}
              value={formData.position}
              onChange={(e) => handleFormDataChange("position", e.target.value)}
            />
          </div>
        </div>

        {isMobile ? (
          <div className="field-grp grid-template">
            <div
              className="swatch"
              onClick={() =>
                handleColorPaletModalVisiblity({
                  color: formData?.ovrColor,
                  modalFor: "ovrColor",
                })
              }
            >
              <div
                style={{
                  backgroundColor: `rgba(${formData?.ovrColor?.r}, ${formData?.ovrColor?.g}, ${formData?.ovrColor?.b}, ${formData?.ovrColor?.a})`,
                }}
                className="swatch-color"
              />
            </div>
            <div
              className="swatch"
              onClick={() =>
                handleColorPaletModalVisiblity({
                  color: formData?.nameColor,
                  modalFor: "positionColor",
                })
              }
            >
              <div
                style={{
                  backgroundColor: `rgba(${formData?.positionColor?.r}, ${formData?.positionColor?.g}, ${formData?.positionColor?.b}, ${formData?.positionColor?.a})`,
                }}
                className="swatch-color"
              />
            </div>
            <div
              className="swatch"
              onClick={() =>
                handleColorPaletModalVisiblity({
                  color: formData?.nameColor,
                  modalFor: "nameColor",
                })
              }
            >
              <div
                style={{
                  backgroundColor: `rgba(${formData?.nameColor?.r}, ${formData?.nameColor?.g}, ${formData?.nameColor?.b}, ${formData?.nameColor?.a})`,
                }}
                className="swatch-color"
              />
            </div>
          </div>
        ) : (
          <div className="field-grp grid-template">
            <div className="feature-box">
              <p className="heading-p">OVR</p>

              <div
                className="swatch"
                onClick={() =>
                  handleColorPaletModalVisiblity({
                    color: formData?.ovrColor,
                    modalFor: "ovrColor",
                  })
                }
              >
                <div
                  style={{
                    backgroundColor: `rgba(${formData?.ovrColor?.r}, ${formData?.ovrColor?.g}, ${formData?.ovrColor?.b}, ${formData?.ovrColor?.a})`,
                  }}
                  className="swatch-color"
                />
              </div>
            </div>
            <div className="feature-box">
              <p className="heading-p">Position</p>
              <div
                className="swatch"
                onClick={() =>
                  handleColorPaletModalVisiblity({
                    color: formData?.nameColor,
                    modalFor: "positionColor",
                  })
                }
              >
                <div
                  style={{
                    backgroundColor: `rgba(${formData?.positionColor?.r}, ${formData?.positionColor?.g}, ${formData?.positionColor?.b}, ${formData?.positionColor?.a})`,
                  }}
                  className="swatch-color"
                />
              </div>
            </div>
            <div className="feature-box">
              <p className="heading-p">Name</p>
              <div
                className="swatch"
                onClick={() =>
                  handleColorPaletModalVisiblity({
                    color: formData?.nameColor,
                    modalFor: "nameColor",
                  })
                }
              >
                <div
                  style={{
                    backgroundColor: `rgba(${formData?.nameColor?.r}, ${formData?.nameColor?.g}, ${formData?.nameColor?.b}, ${formData?.nameColor?.a})`,
                  }}
                  className="swatch-color"
                />
              </div>
            </div>
          </div>
        )}

        {isMobile && (
          <div className="responsive-grid-div">
            <div
              className="button-div"
              // onClick={handleIsNationCardModalVisiblity}
              onClick={() => handleLoaderBeforeModalOpenClose("nation")}
            >
              <button className="btn-100 btn-txt-n-img flagbtn">
                <div className="btn-txt-container">
                  <p className="heading-p">Nation</p>
                  <p className="hide-on-mobile">{formData.nationName}</p>
                </div>
                {featureLoader && shouldOpenModal === "nation" ? (
                  <div className="sm-loader-css">
                    <Loader />
                  </div>
                ) : (
                  <img
                    src={formData.nationFlagImg}
                    alt="card-img"
                    className="flagu"
                  />
                )}
              </button>
            </div>

            {!formData?.isConceptCard && (
              <div
                className="button-div"
                // onClick={handleIsLeagueCardModalVisiblity}
                onClick={() => handleLoaderBeforeModalOpenClose("league")}
              >
                <button className="btn-100 btn-txt-n-img flagbtn">
                  <div className="btn-txt-container">
                    <p className="heading-p">League</p>
                    <p className="hide-on-mobile">{formData.leagueName}</p>
                  </div>

                  {formData.leagueLogo &&
                    (featureLoader && shouldOpenModal === "league" ? (
                      <div className="sm-loader-css">
                        <Loader />
                      </div>
                    ) : (
                      <img
                        src={formData.leagueLogo}
                        className="flagu"
                        alt="card-img"
                      />
                    ))}
                </button>
              </div>
            )}

            <div
              className="button-div"
              // onClick={handleIsClubCardModalVisiblity}
              onClick={() => handleLoaderBeforeModalOpenClose("club")}
            >
              <button className="btn-100 btn-txt-n-img flagbtn">
                <div className="btn-txt-container">
                  <p className="heading-p">Club</p>
                  <p className="hide-on-mobile">{formData.clubName}</p>
                </div>
                {featureLoader && shouldOpenModal === "club" ? (
                  <div className="sm-loader-css">
                    <Loader />
                  </div>
                ) : (
                  <img
                    src={formData.clauLogo}
                    alt="card-img"
                    className="flagu"
                  />
                )}
              </button>
            </div>
          </div>
        )}

        <div
          className="button-div"
          // onClick={handleIsRankModalVisiblity}
          onClick={() => handleLoaderBeforeModalOpenClose("rank")}
        >
          <button className="btn-100 btn-txt-n-img">
            <p>Rank</p>
            <LazyLoad height={0} offset={100} once>
              {featureLoader && shouldOpenModal === "rank" ? (
                <Loader />
              ) : (
                <img
                  src={"rank_img/" + formData.rank}
                  alt="card-img"
                  loading="lazy"
                />
              )}
            </LazyLoad>
          </button>
        </div>

        <div className="feature-box">
          <p className="heading-p">Training Level</p>
          <input
            type="text"
            value={formData.rank === "d1.png" ? "0" : formData.trainingLevel}
            onChange={(e) =>
              handleFormDataChange("trainingLevel", e.target.value)
            }
            onInput={(e) => {
              let input = e.target.value.replace(/[^0-9]/g, "");

              if (input === "") {
                e.target.value = "";
              } else {
                let number = parseInt(input, 10);

                if (number > 30) {
                  number = parseInt(input.slice(0, 2), 10);
                }

                e.target.value = number.toString();
              }
            }}
            disabled={formData.rank === "d1.png"}
          />
        </div>

        {isMobile && (
          <div className="download-btn-div">
            <button
              className="download-btn"
              onClick={handleIsDownloadBtnModalVisiblity}
            >
              Download
            </button>
          </div>
        )}
      </>
    );
  }
);

export default FeatureCardinputComponent;
