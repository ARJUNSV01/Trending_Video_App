import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { serverURL } from "../../serverUrl";
import ReactPlayer from "react-player";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import '~video-react/dist/video-react.css';
import { BigPlayButton, Player } from "video-react";
import { Button } from "@chakra-ui/react";
const VideosSection = () => {
  const [videos, setVideos] = useState([]);
  const [refresh, setRefresh] = useState("");
  const [play, setPlay] = useState(false);
  const [videoPlayers, setVideoPlayers] = useState([]);

  const updateViews = async (id) => {
    await axios.put(`${serverURL}/api/videos/updateViews/${id}`);
    console.log(videoPlayers.getState(), "lookkk");
  };
  const handleVideo = (id) => {
    console.log("vid", id);
    updateViews(id);
  };

  useEffect(() => {
    const fetchVideos = () =>{
      axios.get(`${serverURL}/api/videos/fetchVideos`).then(({ data }) => {
        setVideos(data);
      }).catch((err)=>{
        console.log(err)
      })
    }
    fetchVideos()
  }, [refresh]);
  
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
      <div className="row">
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
                    handleVideo(video._id);
                  }}
                >
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
