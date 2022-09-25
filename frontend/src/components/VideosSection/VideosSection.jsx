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
  const [play,setPlay] = useState(false)
  const [player,setPlayer]= useState()
 

  const updateViews = async (id) => {
    await axios.put(`${serverURL}/api/videos/updateViews/${id}`);
    console.log(player.getState(),'lookkk')
  };
  const handleVideo = (id) => {
    
    console.log("vid", id);
    updateViews(id);
  };

  useEffect(() => {
    axios.get(`${serverURL}/api/videos/fetchVideos`).then(({ data }) => {
      setVideos(data);
    });
  }, [refresh]);


  return (
    <Container fluid>
      <div className="row">
        {videos
          ? videos.map((video) => {
              return (
                <div
                  key={video._id}
                  className="col-12 col-md-3 col-sm-6 mt-5"
                  onMouseEnter={() => {
                      console.log('mouse enter');
                      player.play()}}

                  onMouseLeave={() => {
                    player.load()}}
                  onClick={() => {
                    handleVideo(video._id);
                  }}
                >
                  {/* <p>{video.url}</p> */}
                  {/* <ReactPlayer  width='100%' height='300px' controls url='http://res.cloudinary.com/groovy-planet/video/upload/v1664127501/gmiofbjctunhxdwoj972.mp4' /> */}
                  <Player
                    poster
                    ref={(player)=>{setPlayer(player)}}
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
