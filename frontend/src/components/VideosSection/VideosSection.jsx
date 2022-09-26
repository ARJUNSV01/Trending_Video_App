import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { serverURL } from "../../serverUrl";
import { Player } from "video-react";
import { Button, Spinner } from "@chakra-ui/react";
import VideoPlayerModal from "./VideoPlayerModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../features/videoSlice";

const VideosSection = () => {
  const [videoPlayers, setVideoPlayers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const dispatch = useDispatch();
  const { videos, isLoading } = useSelector((state) => state.video);

  const updateViews = async (id) => {
    let res = await axios.put(`${serverURL}/api/videos/updateViews/${id}`);
    console.log(res);
  };
  const handleVideo = (url, id) => {
    setModalShow(true);
    setVideoUrl(url);
    setVideoId(id);
    updateViews(id);
  };

  useEffect(() => {
    dispatch(fetchVideos());
  }, []);

  const playVideo = (index) => {
    // const {player} = videoPlayers[index].getState()
    videoPlayers[index].playbackRate = 3;
    videoPlayers[index].actions.play();
  };
  const reloadVideo = (index) => {
    videoPlayers[index].load();
  };

  return (
    <Container fluid>
      <VideoPlayerModal
        backdrop="static"
        keyboard
        url={videoUrl}
        id={videoId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {isLoading ? (
        <div
          className="mt-5"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </div>
      ) : (
        ""
      )}
      <div className="row ">
        {videos
          ? videos.map((video, index) => {
              return (
                <div
                  key={video._id}
                  className="col-12 col-md-3 col-sm-6 mt-5"
                  onMouseEnter={() => {
                    playVideo(index);
                  }}
                  onMouseLeave={() => {
                    reloadVideo(index);
                  }}
                  onClick={() => {
                    console.log("clicked");
                    handleVideo(video.url, video._id);
                  }}
                >
                  {/* <VideoPlayerModal/> */}
                  <Player
                    ref={(player) => {
                      videoPlayers.push(player);
                    }}
                    muted="true"
                    fluid={false}
                    width="100%"
                    height={300}
                  >
                    {/* <BigPlayButton position="center" /> */}
                    <source src={video.url} />
                  </Player>
                </div>
              );
            })
          : ""}
      </div>
    </Container>
  );
};

export default VideosSection;
