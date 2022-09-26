import axios from "axios";
import React from "react";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import { DropzoneArea } from "material-ui-dropzone";
import VideosUploadModal from "./VideoUploadModal";
import { Alert, AlertIcon, Button } from "@chakra-ui/react";
import { serverURL } from "../../serverUrl";
import { useSelector } from "react-redux";

const VideosUploadSection = () => {
  const [video, setVideo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  let { userId } = useSelector((state) => state.auth);

  const uploadVideo = async () => {
    setSuccess(false);
    setError(false);
    if (!video) {
      setError("Please select a video to upload");
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", video);
      formData.append("upload_preset", "b9bd2n87");

      try {
        const { data } = await axios.post(
          "https://api.cloudinary.com/v1_1/groovy-planet/video/upload",
          formData
        );
        console.log(data);
        const url = data.secure_url;
        const accessToken = localStorage.getItem("access_token");
        const videoData = {
          url,
          userId
        };

        const config = {
          headers: { accessToken: accessToken },
        };

        const res = await axios.post(
          `${serverURL}/api/users/uploadVideo`,
          videoData,
          config
        );
        console.log(res);

        setLoading(false);
        setSuccess("Video uploaded successfully");
      } catch (err) {
        setError("Video not uploaded");
        setLoading(false);
        console.log(err);
      }
    }
  };
  return (
    <div>
      {error ? (
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      ) : (
        ""
      )}
      {success ? (
        <Alert status="success">
          <AlertIcon />
          {success}
        </Alert>
      ) : (
        ""
      )}
      <input
        disabled={loading}
        className="mt-3"
        type="file"
        onChange={(e) => {
          setError("");
          setVideo(e.target.files[0]);
        }}
      />

      <Button isLoading={loading} onClick={uploadVideo}>
        Upload
      </Button>
    </div>
  );
};

export default VideosUploadSection;
