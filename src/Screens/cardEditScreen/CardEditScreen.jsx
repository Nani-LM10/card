import React, { useCallback, useState, useRef, useEffect } from "react";

import "./CardEditScreen.scss";

import FeatureCardinputComponent from "../../components/featureCardInputComponent/FeatureCardinputComponent";
import ImageComponent from "../../components/imageComponent/ImageComponent";
import Modal from "../../components/modal/Modal";
import ColorPickerModal from "../../components/modal/ColorPickerModal";
import CardDesignModal from "../../components/modal/CardDesignModal";
import FlexDynamicSelectModal from "../../components/modal/FlexDynamicSelectModal";
import DownloadBtnModal from "../../components/modal/DownloadBtnModal";
import AppLoader from "../../components/loader/AppLoader";
import playerApiData from "../../utils/getReadyCardData";
import FeatureCardinputComponentLeft from "../../components/featureCardInputComponent/FeatureCardinputComponentLeft";

import { PLAYER_API_URL } from "../../constants/apiConstants";

import LazyLoad, { forceCheck } from "react-lazyload";
import GIF from "gif.js.optimized";
import { parseGIF, decompressFrames } from "gifuct-js";
import { convertRgbaObjToHex } from "../../utils/commonFunctions";
import IterateMultipleCardGrid from "../../components/modal/IterateMultipleCardGrid";

function CardEditScreen({ appData, isMobile, appDataLoading }) {
  const { readyCarddata, loading } = playerApiData(PLAYER_API_URL);

  const [formData, setFormData] = useState({
    cardImg:
      "https://static.wixstatic.com/media/a7f17b_3fb05da0442d421abf4bb19d312c180a~mv2.png",
    animatedImg:
      "https://static.wixstatic.com/media/a7f17b_11e3fbdaef1c4c8ca2b5f03883c18f64~mv2.gif",
    playerImg:
      "https://static.wixstatic.com/media/54a672_2bc87c86f424443d999ac81b5875d6c2~mv2.png",
    name: "MESSI",
    ovr: 107,
    position: "ST",
    nameColor: { r: 245, g: 207, b: 243, a: 1 },
    ovrColor: { r: 237, g: 217, b: 212, a: 1 },
    positionColor: { r: 237, g: 217, b: 212, a: 1 },
    nationName: "Argentina",
    nationFlagImg:
      "https://static.wixstatic.com/media/a7f17b_2de7eb8cb53a426fbe02af8713de65c0~mv2.png",
    leagueName: "Major Soccer League",
    leagueLogo:
      "https://static.wixstatic.com/media/a7f17b_abf5597d40a44ca9b0478676346f2e8f~mv2.png",
    clubName: "Inter Miami CF",
    clauLogo:
      "https://static.wixstatic.com/media/54a672_43f78d2d6be14670a8bd066055930ff5~mv2.png",
    trainingLevel: 0,
    rank: "d1.png",
    isConceptCard: false,
    hasAnimated: true,
  });

  const handleFormDataChange = useCallback((field, value) => {
    console.log("handleFormDataChange");
    console.log(field, value);
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const [isColorPaletModalVisible, setIsColorPaletModalVisible] =
    useState(false);

  const [isCardDesignModalVisible, setIsCardDesignModalVisible] =
    useState(false);

  const [isPlayerPickerModalVisible, setIsPlayerPickerModalVisible] =
    useState(false);

  const [isClubModalVisible, setIsClubModalVisible] = useState(false);

  const [isLeagueModalVisible, setIsLeagueModalVisible] = useState(false);

  const [isNationModalVisible, setIsNationModalVisible] = useState(false);

  const [isRankModalVisible, setIsRankModalVisible] = useState(false);

  const [isDownloadBtnModalVisible, setIsDownloadBtnModalVisible] =
    useState(false);

  const [isSearchModalVisible, setIsSearchModalVisible] = useState(false);

  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition(
      isMobile
        ? { x: 27.399948120117188, y: 5.1999664306640625 }
        : { x: 25, y: 1 }
    );
  }, [isMobile]);

  const [SearchedPlayerName, setSearchedPlayerName] = useState(formData.name);

  const [commonColor, setcommonColor] = useState({
    modalFor: "ovrColor",
    color: { r: 255, g: 235, b: 255, a: 1 },
  });

  const handleIsDownloadBtnModalVisiblity = useCallback(() => {
    setIsDownloadBtnModalVisible((prev) => !prev), [];
    setTimeout(() => {
      forceCheck();
    }, 0);
  });

  const handleIsSearchModalVisiblity = useCallback(
    () => setIsSearchModalVisible((prev) => !prev),
    []
  );

  const handleIsCardDesignModalVisiblity = useCallback(() => {
    setIsCardDesignModalVisible((prev) => !prev), [];
    setTimeout(() => {
      forceCheck();
    }, 0);
  });

  const handleIsPlayerPickerModalVisiblity = useCallback(
    () => setIsPlayerPickerModalVisible((prev) => !prev),
    []
  );

  const handleIsClubCardModalVisiblity = useCallback(
    () => setIsClubModalVisible((prev) => !prev),
    []
  );

  const handleIsLeagueCardModalVisiblity = useCallback(
    () => setIsLeagueModalVisible((prev) => !prev),
    []
  );

  const handleIsNationCardModalVisiblity = useCallback(
    () => setIsNationModalVisible((prev) => !prev),
    []
  );

  const handleIsRankModalVisiblity = useCallback(
    () => setIsRankModalVisible((prev) => !prev),
    []
  );

  const handleColorPaletModalVisiblity = useCallback((obj) => {
    setIsColorPaletModalVisible((prev) => !prev);

    if (obj && obj.color && obj.modalFor) {
      setcommonColor(obj);
    }
  }, []);

  const [gifLoading, setGifLoading] = useState(false);
  const canvasRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // 🔍 Zoom in/out handlers
  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 3)); // max zoom 3x
  });

  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 1)); // min zoom 1x
  });

  const [zoomCardLevel, setZoomCardLevel] = useState(1);

  // 🔍 Zoom in/out handlers
  const zoomInCard = useCallback(() => {
    setZoomCardLevel((prev) => Math.min(prev + 0.01, 2)); // max zoom 3x
  });

  const zoomOutCard = useCallback(() => {
    setZoomCardLevel((prev) => Math.max(prev - 0.01, 1)); // min zoom 1x
  });

  // Utility to load an image into a promise
  const loadImage = (src) =>
    new Promise((res, rej) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = src;
    });

  const generateAndDownload = async (type) => {
    setGifLoading(true);

    const cardUrl = type === "STATIC" ? formData.cardImg : formData.animatedImg;

    // 1) fetch + parse the card image/gif
    const res = await fetch(cardUrl);
    const buffer = await res.arrayBuffer();

    // 2) preload all overlay assets
    // Helper to load image or return null if src is empty
    const safeLoadImage = (src) =>
      src ? loadImage(src) : Promise.resolve(null);

    const [headshotImg, flagImg, leagueImg, clubImg, rankImg] =
      await Promise.all([
        safeLoadImage(formData.playerImg),
        safeLoadImage(formData.nationFlagImg),
        safeLoadImage(formData.leagueLogo),
        safeLoadImage(formData.clauLogo),
        safeLoadImage(formData.rank ? "rank_img\\" + formData.rank : null),
      ]);

    if (type === "STATIC") {
      const img = await loadImage(cardUrl);
      // const width = img.width;
      // const height = img.height;
      const width = 768;
      const height = 768;

      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      // Headshot
      const hsSize = width * 0.66;
      const hsX = (width - hsSize) / 2;
      const hsY = height * 0.09;

      const ovrX = width * 0.065 + 115;
      const ovrY = height * 0.115 + 78;

      const posY = ovrY + 78;

      const nameY = hsY + hsSize + 18;

      const iconSize = 50 + 20;
      const gap = 28 + 40 + 20;
      const totalW = iconSize * 3 + gap * 2;
      const iconX0 = (width - totalW) / 2;
      const iconY = nameY + 12 - 40;

      // Draw headshot in circle
      ctx.save();
      let offsetX = position.x;
      let offsetY = position.y;
      if (!isMobile) {
        offsetX = offsetX - 60;
        offsetY = offsetY - 75;
      }
      ctx.beginPath();
      if (isMobile) {
        // adjust arc & drawImage on mobile so player image doesn't get cropped below
        ctx.arc(
          hsX - 50 + hsSize / 2 + offsetX,
          hsY + hsSize / 2 + offsetY, // move circle much further down (+60)
          hsSize / 2 + 80, // bigger radius (+80)
          0,
          Math.PI * 2
        );
        ctx.clip();
        ctx.drawImage(
          headshotImg,
          hsX - 135 + position.x, // move left (-160)
          hsY - 40 + position.y, // move down from -60 → -20
          hsSize + 200, // much wider
          hsSize + 200 // much taller
        );
      } else {
        ctx.arc(
          hsX - 30 + hsSize / 2 + offsetX,
          hsY + hsSize / 2 + offsetY, // move circle a bit lower
          hsSize / 2 + 220, // increase circle radius
          0,
          Math.PI * 2
        );
        ctx.clip();
        ctx.drawImage(
          headshotImg,
          hsX - 125 + position.x,
          hsY - 10 + position.y,
          hsSize + 200,
          hsSize + 200 // extend height to show full body
        );
      }

      ctx.restore();

      // OVR (107)
      ctx.font = "105px 'CruyffFont', sans-serif";
      ctx.fillStyle = convertRgbaObjToHex(formData.ovrColor);
      ctx.fillText(String(formData.ovr), ovrX, ovrY);

      // Position (ST)
      ctx.font = "70px 'CruyffFont', sans-serif";
      ctx.fillStyle = convertRgbaObjToHex(formData.positionColor);
      ctx.fillText(
        formData.position,
        formData.position.length === 2 ? ovrX + 35 : ovrX,
        posY
      );

      // Name (Messi)
      ctx.font = "65px 'CruyffFont', sans-serif";
      ctx.fillStyle = convertRgbaObjToHex(formData.nameColor);
      const nameW = ctx.measureText(formData.name).width;
      ctx.fillText(
        formData.name.toUpperCase(),
        (width - nameW) / 2,
        nameY - 40
      );

      // Draw flag, league, club icons
      if (leagueImg) {
        ctx.drawImage(
          leagueImg,
          iconX0 + iconSize + gap,
          iconY,
          iconSize,
          iconSize
        );
        ctx.drawImage(flagImg, iconX0 + 2, iconY, iconSize, iconSize);
        ctx.drawImage(
          clubImg,
          iconX0 + 2 * (iconSize + gap),
          iconY,
          iconSize,
          iconSize
        );
      }
      if (!leagueImg) {
        ctx.drawImage(flagImg, iconX0 + 60, iconY, iconSize, iconSize);
        ctx.drawImage(
          clubImg,
          iconX0 + 110 + 2 * iconSize,
          iconY,
          iconSize,
          iconSize
        );
      }
      let rankX = null;
      let rankY = null;
      let rankSize = 120;
      if (formData.rank !== "d1.png") {
        // Draw rank image
        rankX = (width - rankSize) / 2;
        rankY = height - rankSize - height * 0.02;
        ctx.drawImage(rankImg, rankX, rankY, rankSize, rankSize);
      }

      // Training level text

      if (!(formData?.trainingLevel == 0 || formData.rank === "d1.png")) {
        ctx.font = "52px 'CruyffFont', sans-serif";
        ctx.fillStyle = "#000000";
        const trainlvlW = ctx.measureText(formData.trainingLevel).width;
        const trainlvlH = 32;
        ctx.fillText(
          formData.trainingLevel,
          rankX + (rankSize - trainlvlW) / 2 - 2,
          rankY + rankSize / 2 + trainlvlH / 3 + 10
        );
      }

      // Download
      const dataURL = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "card-with-all-overlays.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setGifLoading(false);
    } else {
      // For animated GIF
      const parsed = parseGIF(buffer);
      const frames = decompressFrames(parsed, true);
      const { width, height } = parsed.lsd;

      const canvas = canvasRef.current;
      // canvas.width = width;
      // canvas.height = height;
      canvas.width = 768;
      canvas.height = 768;
      const ctx = canvas.getContext("2d");

      const encoder = new GIF({
        workers: 2,
        quality: 10,
        width,
        height,
        workerScript: `gif.worker.js`,
      });
      const hsSize = width * 0.8;
      const hsX = (width - hsSize) / 2;
      const hsY = height * 0.09;

      const ovrX = hsX + 70;
      const ovrY = hsY + 80;
      const posY = ovrY + 60;

      const nameY = hsY + hsSize - 80;

      const iconSize = 45;
      const gap = 30 + 30;
      const totalW = iconSize * 3 + gap * 2;
      const iconX0 = (width - totalW) / 2;
      const iconY = nameY + 5;

      frames.forEach((frame) => {
        ctx.clearRect(0, 0, width, height);

        const imgData = ctx.createImageData(
          frame.dims.width,
          frame.dims.height
        );
        imgData.data.set(frame.patch);
        ctx.putImageData(imgData, frame.dims.left, frame.dims.top);

        ctx.save();
        let offsetX = position.x;
        let offsetY = position.y;

        if (isMobile) {
          offsetX = offsetX - 60;
          offsetY = offsetY - 25;

          ctx.beginPath();
          ctx.arc(
            hsX - 40 + hsSize / 2 + offsetX,
            hsY + 30 + hsSize / 2 + offsetY, // was +40 → now +30
            hsSize / 2 + 40, // was +60 → now +40
            0,
            Math.PI * 2
          );
          ctx.clip();

          // draw image slightly smaller so it’s centered & shows full bottom
          ctx.drawImage(
            headshotImg,
            hsX - 20 + offsetX, // was -120 → now -100
            hsY - 10 + offsetY, // keep same
            hsSize + 100, // was +150 → now +130
            hsSize + 100 // was +150 → now +160
          );
        } else {
          // original desktop logic (keep as is)
          ctx.beginPath();
          ctx.arc(
            hsX - 40 + hsSize / 2 + offsetX,
            hsY + 12 + hsSize / 2 + offsetY,
            hsSize / 2 + 25,
            0,
            Math.PI * 2
          );
          ctx.clip();

          ctx.drawImage(
            headshotImg,
            hsX - 60 + offsetX,
            hsY - 10 + offsetY,
            hsSize + 60,
            hsSize + 60
          );
        }
        ctx.restore();

        ctx.font = "70px 'CruyffFont', sans-serif";
        ctx.fillStyle = convertRgbaObjToHex(formData.ovrColor);
        ctx.fillText(String(formData.ovr), ovrX - 10, ovrY - 10);

        ctx.font = "45px 'CruyffFont', sans-serif";
        ctx.fillStyle = convertRgbaObjToHex(formData.positionColor);
        ctx.fillText(
          formData.position,
          formData.position.length === 3 ? ovrX - 10 : ovrX + 6,
          posY - 20
        );

        ctx.font = "43px 'CruyffFont', sans-serif";
        ctx.fillStyle = convertRgbaObjToHex(formData.nameColor);
        const nameW = ctx.measureText(formData.name).width;
        ctx.fillText(
          formData.name.toUpperCase(),
          (width - nameW) / 2,
          nameY - 5
        );
        if (leagueImg) {
          ctx.drawImage(
            leagueImg,
            iconX0 + iconSize + gap,
            iconY - 3,
            iconSize,
            iconSize
          );
          ctx.drawImage(flagImg, iconX0, iconY - 3, iconSize, iconSize);
          ctx.drawImage(
            clubImg,
            iconX0 + 2 * (iconSize + gap),
            iconY - 3,
            iconSize,
            iconSize
          );
        } else {
          ctx.drawImage(flagImg, iconX0 + 40, iconY - 3, iconSize, iconSize);
          ctx.drawImage(
            clubImg,
            iconX0 + 80 + 2 * iconSize,
            iconY - 3,
            iconSize,
            iconSize
          );
        }
        let rankX = null;
        let rankY = null;
        let rankSize = 85;
        if (formData.rank !== "d1.png") {
          rankX = (width - rankSize) / 2;
          rankY = height - rankSize - height * 0.018;
          ctx.drawImage(rankImg, rankX, rankY, rankSize, rankSize);
        }

        if (!(formData?.trainingLevel == 0 || formData.rank === "d1.png")) {
          ctx.font = "36px 'CruyffFont', sans-serif";
          ctx.fillStyle = "#000000";
          const trainlvlW = ctx.measureText(formData.trainingLevel).width;
          const trainlvlH = 36;
          ctx.fillText(
            formData.trainingLevel,
            rankX + (rankSize - trainlvlW) / 2,
            rankY + rankSize / 2 + trainlvlH / 3
          );
        }

        encoder.addFrame(ctx, { copy: true, delay: frame.delay });
      });

      encoder.on("finished", (blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "card-with-all-overlays.gif";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setGifLoading(false);
      });

      encoder.render();
    }
  };

  const divRef = React.useRef(null);

  const handleDownload = async (imgType = "cardImg") => {
    if (imgType === "cardImg") {
      generateAndDownload("STATIC");
    } else if (imgType === "animatedImg") {
      console.log("Downloaded animated");

      generateAndDownload("ANIMATED");
    }
  };

  const rankImgs = ["d1.png", "d2.png", "d3.png", "d4.png", "d5.png", "d6.png"];

  return (
    <div id="main-container">
      <canvas ref={canvasRef} style={{ display: "none" }} />

      <div className="hiddenImg">
        <img src={formData?.cardImg} alt="img" />
      </div>

      {!isMobile && (
        <FeatureCardinputComponentLeft
          formData={formData}
          handleIsCardDesignModalVisiblity={handleIsCardDesignModalVisiblity}
          handleIsPlayerPickerModalVisiblity={
            handleIsPlayerPickerModalVisiblity
          }
          handleIsNationCardModalVisiblity={handleIsNationCardModalVisiblity}
          handleIsLeagueCardModalVisiblity={handleIsLeagueCardModalVisiblity}
          handleIsClubCardModalVisiblity={handleIsClubCardModalVisiblity}
          handleIsDownloadBtnModalVisiblity={handleIsDownloadBtnModalVisiblity}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          zoomInCard={zoomInCard}
          zoomOutCard={zoomOutCard}
        />
      )}

      {isMobile && <div className="card-creator-txt">Card Creator</div>}

      <LazyLoad
        height={300}
        offset={100}
        className={isMobile ? "ImgComponentCss" : ""}
      >
        <ImageComponent
          formData={formData}
          handleIsSearchModalVisiblity={handleIsSearchModalVisiblity}
          SearchedPlayerName={SearchedPlayerName}
          position={position}
          setPosition={setPosition}
          zoomLevel={zoomLevel}
          zoomCardLevel={zoomCardLevel}
          ref={divRef}
          isMobile={isMobile}
          appDataLoading={appDataLoading}
        />
      </LazyLoad>

      <div className="feature-card-input-div">
        <FeatureCardinputComponent
          formData={formData}
          handleFormDataChange={handleFormDataChange}
          handleColorPaletModalVisiblity={handleColorPaletModalVisiblity}
          handleIsCardDesignModalVisiblity={handleIsCardDesignModalVisiblity}
          handleIsPlayerPickerModalVisiblity={
            handleIsPlayerPickerModalVisiblity
          }
          handleIsDownloadBtnModalVisiblity={handleIsDownloadBtnModalVisiblity}
          handleIsClubCardModalVisiblity={handleIsClubCardModalVisiblity}
          handleIsLeagueCardModalVisiblity={handleIsLeagueCardModalVisiblity}
          handleIsNationCardModalVisiblity={handleIsNationCardModalVisiblity}
          handleIsRankModalVisiblity={handleIsRankModalVisiblity}
          isMobile={isMobile}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          zoomInCard={zoomInCard}
          zoomOutCard={zoomOutCard}
          appDataLoading={appDataLoading}
        />
      </div>

      {/* card selecter modal */}
      <Modal
        isVisible={isCardDesignModalVisible}
        setShowHideFun={handleIsCardDesignModalVisiblity}
      >
        {appDataLoading ? (
          <AppLoader />
        ) : (
          <CardDesignModal
            cardData={appData}
            setFormData={setFormData}
            setShowHideFun={handleIsCardDesignModalVisiblity}
          />
        )}
      </Modal>

      {/* color picker modal */}
      <Modal
        isVisible={isColorPaletModalVisible}
        setShowHideFun={handleColorPaletModalVisiblity}
      >
        <ColorPickerModal
          color={formData[commonColor.modalFor]}
          handleColorChange={handleFormDataChange}
          handleChangeFor={commonColor.modalFor}
          handleColorPaletModalVisiblity={handleColorPaletModalVisiblity}
        />
      </Modal>

      {/* flex column dynamic modal - player*/}
      <Modal
        isVisible={isPlayerPickerModalVisible}
        setShowHideFun={handleIsPlayerPickerModalVisiblity}
      >
        {loading ? (
          <AppLoader />
        ) : (
          <FlexDynamicSelectModal
            cardObjList={appData?.playerRenders}
            cardObjList2={readyCarddata}
            handleFormDataChange={handleFormDataChange}
            setShowHideFun={handleIsPlayerPickerModalVisiblity}
            modaltype={"playerImg"}
            header={"Player image"}
          />
        )}
      </Modal>

      {/* flex column dynamic modal - club*/}
      <Modal
        isVisible={isClubModalVisible}
        setShowHideFun={handleIsClubCardModalVisiblity}
      >
        {appDataLoading ? (
          <AppLoader />
        ) : (
          <FlexDynamicSelectModal
            cardObjList={appData?.clubs}
            handleFormDataChange={handleFormDataChange}
            setShowHideFun={handleIsClubCardModalVisiblity}
            modaltype={"clauLogo"}
            modalTypeName={"clubName"}
            header={"Club"}
          />
        )}
      </Modal>

      {/* flex column dynamic modal - nation*/}
      <Modal
        isVisible={isNationModalVisible}
        setShowHideFun={handleIsNationCardModalVisiblity}
      >
        {appDataLoading ? (
          <AppLoader />
        ) : (
          <FlexDynamicSelectModal
            cardObjList={appData?.nations}
            handleFormDataChange={handleFormDataChange}
            setShowHideFun={handleIsNationCardModalVisiblity}
            modaltype={"nationFlagImg"}
            modalTypeName={"nationName"}
            header={"Nation"}
          />
        )}
      </Modal>

      {/* flex column dynamic modal - league*/}
      <Modal
        isVisible={isLeagueModalVisible}
        setShowHideFun={handleIsLeagueCardModalVisiblity}
      >
        {appDataLoading ? (
          <AppLoader />
        ) : (
          <FlexDynamicSelectModal
            cardObjList={appData?.leagues}
            handleFormDataChange={handleFormDataChange}
            setShowHideFun={handleIsLeagueCardModalVisiblity}
            modaltype={"leagueLogo"}
            modalTypeName={"leagueName"}
            header={"League"}
          />
        )}
      </Modal>

      {/* flex column dynamic modal - search*/}
      <Modal
        isVisible={isSearchModalVisible}
        setShowHideFun={handleIsSearchModalVisiblity}
      >
        {loading ? (
          <AppLoader />
        ) : (
          <FlexDynamicSelectModal
            cardObjList={readyCarddata}
            handleFormDataChange={handleFormDataChange}
            setShowHideFun={handleIsSearchModalVisiblity}
            modaltype={"readyCards"}
            setFormData={setFormData}
            setSearchedPlayerName={setSearchedPlayerName}
            header={"Search Card"}
          />
        )}
      </Modal>

      {/* Rank modal*/}
      <Modal
        isVisible={isRankModalVisible}
        setShowHideFun={handleIsRankModalVisiblity}
      >
        {appDataLoading ? (
          <AppLoader />
        ) : (
          <IterateMultipleCardGrid
            cardsData={rankImgs}
            setFormData={setFormData}
            setShowHideFun={handleIsRankModalVisiblity}
            appDataProp={"rank"}
            gridFor={"rank"}
            header={"Select Rank"}
          />
        )}
      </Modal>

      {/* Download button download */}
      <Modal
        isVisible={isDownloadBtnModalVisible}
        setShowHideFun={handleIsDownloadBtnModalVisiblity}
      >
        <DownloadBtnModal
          handleDownload={handleDownload}
          formData={formData}
          position={position}
          gifLoading={gifLoading}
          zoomLevel={zoomLevel}
          zoomCardLevel={zoomCardLevel}
        />
      </Modal>
    </div>
  );
}

export default CardEditScreen;
