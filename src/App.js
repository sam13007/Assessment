import React, { useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import defaultSrc from "./testplan.png";
import "./App.css";

export default function App() {
  const [image, setImage] = useState(defaultSrc);
  const [cropData, setCropData] = useState("");
  const [cropper, setCropper] = useState(null);
  const [coords, setCoords] = useState({});

  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropper !== "undefined") {
      setCoords(cropper.getCropBoxData());
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const useDefaultImage = () => {
    setImage(defaultSrc);
  };

  return (
    <div className="App">
      <div className="navbar">
        <h1 className="main-h1">React Assessment</h1>
      </div>
      <div className="images">
        <div id="leftdivcard">
          <h2>Selected image to Crop</h2>
          <br />
          <Cropper
            className="cropper"
            zoomTo={0}
            initialAspectRatio={1}
            src={image}
            viewMode={1}
            minCropBoxHeight={8}
            minCropBoxWidth={6}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false}
            onInitialized={(instance) => {
              setCropper(instance);
            }}
            guides={true}
          />
        </div>

        <div className="splitdiv" id="rightdiv">
          <div id="itemdivcard">
            <h2>
              Cropped Image Coords: {coords.left.toFixed(2)} and{" "}
              {coords.top.toFixed(2)}
            </h2>
            <h2>
              Cropped Image Dimensions: {coords.height.toFixed(2)} and{" "}
              {coords.width.toFixed(2)}
            </h2>

            <br />
            {cropData ? (
              <img
                style={{ height: "30%", width: "70%" }}
                src={cropData}
                alt="cropped"
              />
            ) : (
              <h1>Cropped image will apear here!</h1>
            )}
          </div>
        </div>
      </div>

      <div className="nav-buttons">
        <input type="file" className="btn-file" onChange={onChange} />
        <button type="button" className="btn" onClick={useDefaultImage}>
          Use Default Image
        </button>
        &nbsp; &nbsp;
        <button type="button" className="btn" onClick={getCropData}>
          Crop Image
        </button>
      </div>
    </div>
  );
}
