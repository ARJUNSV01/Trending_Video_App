import axios from "axios";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { serverURL } from "../../serverUrl";
import {  Player } from "video-react";
import { Button, Spinner } from "@chakra-ui/react";
import VideoPlayerModal from "./VideoPlayerModal";

const VideosSection = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState("");
  const [videoPlayers, setVideoPlayers] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [videoUrl,setVideoUrl]= useState('')

  const updateViews = async (id) => {
    await axios.put(`${serverURL}/api/videos/updateViews/${id}`);
  };
  const handleVideo = (url) => {
    setModalShow(true)
    setVideoUrl(url)
  };

  useEffect(() => {
    setLoading(true)
    const fetchVideos = () =>{
      axios.get(`${serverURL}/api/videos/fetchVideos`).then(({ data }) => {
        setLoading(false)
        setVideos(data);
      }).catch((err)=>{
        console.log(err)
      })
    }
    fetchVideos()
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
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      
      <div className="row position-relative">
       {/* {loading?<div style={{position: 'absolute',top: '50%',left: '50%', transform: 'translate(-50%, -50%)'}}>jkgkjg</div>:''}  */}
      
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
                    console.log('clicked');
                    handleVideo(video.url);
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
