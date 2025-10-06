import React from "react";
import "./DownloadBtnModal.scss";
import DownloadImgTypeComponent from "../imageComponent/DownloadImgTypeComponent";

const DownloadBtnModal = React.memo(
  ({
    handleDownload,
    formData,
    position,
    gifLoading,
    zoomLevel,
    zoomCardLevel,
  }) => {
    const [selectedType, setSelectedType] = React.useState("cardImg");

    const handleSelect = (type) => {
      setSelectedType(type);
    };

    return (
      <>
        <h2>Download Card</h2>
        <div className="card-type-selection">
          <div
            className={`card-type-option ${
              selectedType === "cardImg" ? " selected" : ""
            }`}
            onClick={() => handleSelect("cardImg")}
            style={{ cursor: "pointer" }}
          >
            <DownloadImgTypeComponent
              formData={formData}
              ImgType={"cardImg"}
              position={position}
              zoomLevel={zoomLevel}
              zoomCardLevel={zoomCardLevel}
            />
          </div>

          {formData?.hasAnimated && (
            <div
              className={`card-type-option ${
                selectedType === "animatedImg" ? " selected" : ""
              }`}
              onClick={() => handleSelect("animatedImg")}
              style={{ cursor: "pointer" }}
            >
              <DownloadImgTypeComponent
                formData={formData}
                ImgType={"animatedImg"}
                position={position}
                zoomLevel={zoomLevel}
                zoomCardLevel={zoomCardLevel}
              />
            </div>
          )}
        </div>
        <button
          className="download-btn"
          onClick={() => handleDownload(selectedType)}
        >
          {gifLoading ? "Processing…" : "Download"}
        </button>
      </>
    );
  }
);

export default DownloadBtnModal;
