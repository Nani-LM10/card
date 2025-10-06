import React, { useState, useCallback } from "react";

import debounce from "lodash.debounce";

import SearchCardSmCard from "../imageComponent/SearchCardSmCard";
import {
  convertHexToRbgaObj,
  normalizeCharacters,
} from "../../utils/commonFunctions";

const FlexDynamicSelectModal = React.memo(
  ({
    cardObjList,
    cardObjList2,
    handleFormDataChange,
    setShowHideFun,
    modaltype,
    setFormData,
    setSearchedPlayerName,
    header,
  }) => {
    const [searchTerms, setSearchTerms] = useState(() => {
      return modaltype === "nationFlagImg" ||
        modaltype === "leagueLogo" ||
        modaltype === "clauLogo"
        ? cardObjList || []
        : [];
    });

    const fileInputRef = React.useRef(null);

    const handleCardCLick = useCallback(
      (imgUrl) => {
        handleFormDataChange(modaltype, imgUrl);
        setShowHideFun();
      },
      [handleFormDataChange, modaltype, setShowHideFun]
    );

    const handleCardCLickPlayer = useCallback(
      (imgUrl, type) => {
        handleFormDataChange(modaltype, imgUrl);
        if (type && type === "") {
          handleFormDataChange("isConceptCard", true);
        } else {
          handleFormDataChange("isConceptCard", false);
        }
        setShowHideFun();
      },
      [handleFormDataChange, modaltype, setShowHideFun]
    );

    const handleCardCLickNLC = useCallback(
      (imgUrl, imgName) => {
        handleFormDataChange(modaltype, imgUrl);

        if (modaltype === "nationFlagImg") {
          handleFormDataChange("nationName", imgName);
        } else if (modaltype === "leagueLogo") {
          handleFormDataChange("leagueName", imgName);
        } else if (modaltype === "clauLogo") {
          handleFormDataChange("clubName", imgName);
        }

        setShowHideFun();
      },
      [handleFormDataChange, modaltype, setShowHideFun]
    );

    const debouncedChangeHandler = useCallback(
      debounce((val) => {
        setSearchTerms(val);
      }, 400),
      []
    );

    const searchedCardHandler = useCallback(
      (e) => {
        const val = e.target.value;
        let filteredCards = [];

        const normalizedVal = normalizeCharacters(val.toLowerCase());

        console.log("normalizedVal ", normalizedVal);

        if (modaltype === "playerImg") {
          let filteredCards1 = cardObjList?.filter((card) =>
            normalizeCharacters(card.renders.toLowerCase()).includes(
              normalizedVal
            )
          );

          let filteredCards2 = cardObjList2?.filter((card) =>
            normalizeCharacters(card.name.toLowerCase()).includes(normalizedVal)
          );

          filteredCards = [...filteredCards1, ...filteredCards2];
        } else if (modaltype === "nationFlagImg") {
          filteredCards = cardObjList?.filter((card) =>
            normalizeCharacters(card.nation.toLowerCase()).includes(
              normalizedVal
            )
          );
        } else if (modaltype === "leagueLogo") {
          filteredCards = cardObjList?.filter((card) =>
            normalizeCharacters(card.leagueName.toLowerCase()).includes(
              normalizedVal
            )
          );
        } else if (modaltype === "clauLogo") {
          filteredCards = cardObjList?.filter((card) =>
            normalizeCharacters(card.club.toLowerCase()).includes(normalizedVal)
          );
        } else if (modaltype === "readyCards") {
          filteredCards = cardObjList?.filter((card) =>
            normalizeCharacters(card.name.toLowerCase()).includes(normalizedVal)
          );
        }

        debouncedChangeHandler(filteredCards);
      },
      [cardObjList, modaltype, debouncedChangeHandler]
    );

    const handleUploadClick = useCallback(() => {
      if (fileInputRef.current) fileInputRef.current.click();
    }, []);

    const handleSelectCardCLick = useCallback(
      (card) => {
        setFormData((prev) => ({
          ...prev,
          nationName: "",
          leagueName: "",
          clubName: "",
          cardImg: card?.cardImageUrl,
          playerImg: card?.headshotUrl,
          name: card?.name,
          clauLogo: card?.clubLogoUrl,
          nationFlagImg: card?.nationFlagUrl,
          leagueLogo: card?.leagueCrestUrl,
          ovr: card?.ovr,
          position: card?.position,
          nameColor: card?.nameFontHex
            ? convertHexToRbgaObj(card?.nameFontHex)
            : { r: 255, g: 255, b: 255, a: 1 },
          ovrColor: card?.ovrFontHex
            ? convertHexToRbgaObj(card?.ovrFontHex)
            : { r: 255, g: 255, b: 255, a: 1 },
          positionColor: card?.posFontHex
            ? convertHexToRbgaObj(card?.posFontHex)
            : { r: 255, g: 255, b: 255, a: 1 },
          isConceptCard: card?.cardType === "ICON" ? true : false,
          hasAnimated: false,
        }));
        setSearchedPlayerName(card?.name ? card?.name : "Search");
        setShowHideFun();
      },
      [setFormData, setShowHideFun]
    );

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const allowedTypes = [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/gif",
      ];
      if (!allowedTypes.includes(file.type)) {
        alert("Only PNG, JPG, JPEG, and GIF files are allowed.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        handleFormDataChange(modaltype, event.target.result);
        setShowHideFun();
      };
      reader.readAsDataURL(file);
      e.target.value = "";
    };

    return (
      <>
        <h2>{header}</h2>
        <div className="modal-feature-box">
          <input
            type="text"
            placeholder="search..."
            onChange={searchedCardHandler}
          />
        </div>

        {modaltype !== "readyCards" && (
          <div className="modal-feature-box">
            <button onClick={handleUploadClick} className="upload-btn">
              <p>Upload image (PNG)</p>
              <img src={"static_img\\upload_icon.png"} alt="upload btn" />
            </button>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg, image/gif"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleFileChange}
            />
          </div>
        )}

        {modaltype === "playerImg" && (
          <div className="multiple-cards-div-2">
            {searchTerms?.map((card) => (
              <div
                className="wrapped-cardObj-card"
                key={card?._id || card?.id}
                onClick={() =>
                  handleCardCLickPlayer(
                    card.image || card.headshotUrl,
                    card.type
                  )
                }
              >
                <img
                  src={card.image || card.headshotUrl}
                  alt="card"
                  className="wrapped-cardObj-card-img"
                />
                <p>{card.name || card.render}</p>
              </div>
            ))}
          </div>
        )}

        {modaltype === "nationFlagImg" && (
          <div className="multiple-cards-div-2">
            {searchTerms.map((card) => (
              <div
                className="wrapped-cardObj-card "
                key={card?._id}
                onClick={() =>
                  handleCardCLickNLC(card.nationImage, card.nation)
                }
              >
                <img
                  src={card.nationImage}
                  alt="card"
                  className="wrapped-cardObj-card-img"
                />
                <p>{card.nation}</p>
              </div>
            ))}
          </div>
        )}

        {modaltype === "leagueLogo" && (
          <div className="multiple-cards-div-2">
            {searchTerms.map((card) => (
              <div
                className="wrapped-cardObj-card "
                key={card?._id}
                onClick={() =>
                  handleCardCLickNLC(card.leagueImage, card.leagueName)
                }
              >
                <img
                  src={card.leagueImage}
                  alt="card"
                  className="wrapped-cardObj-card-img"
                />
                <p>{card.leagueName}</p>
              </div>
            ))}
          </div>
        )}

        {modaltype === "clauLogo" && (
          <div className="multiple-cards-div-2">
            {searchTerms.map((card) => (
              <div
                className="wrapped-cardObj-card "
                key={card?._id}
                onClick={() => handleCardCLickNLC(card.clubImage, card.club)}
              >
                <img
                  src={card.clubImage}
                  alt="card"
                  className="wrapped-cardObj-card-img"
                />
                <p>{card.club}</p>
              </div>
            ))}
          </div>
        )}

        {modaltype === "rank" && (
          <div className="multiple-cards-div-2">
            {cardObjList.map((card, index) => (
              <div
                className="wrapped-cardObj-card "
                key={index}
                onClick={() => handleCardCLick(card)}
              >
                <img
                  src={"rank_img\\" + card}
                  alt="card"
                  className="wrapped-cardObj-card-img"
                />
              </div>
            ))}
          </div>
        )}

        {modaltype === "readyCards" && (
          <div className="multiple-cards-div-2">
            {searchTerms?.map((card) => (
              <div
                className="wrapped-cardObj-card"
                key={card?.id}
                onClick={() => handleSelectCardCLick(card)}
              >
                <SearchCardSmCard cardObj={card} />
                <p className="wrapped-cardObj-card-p">{card.name}</p>
              </div>
            ))}
          </div>
        )}
      </>
    );
  }
);

export default FlexDynamicSelectModal;
