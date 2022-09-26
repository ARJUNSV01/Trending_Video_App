import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Player } from "video-react";
import { useDispatch, useSelector } from "react-redux";
import { setVideo, setWatchTime } from "../../features/videoSlice";
import axios from "axios";
import { serverURL } from "../../serverUrl";

function VideoPlayerModal(props) {
  const [videoPlayer, setVideoPlayer] = useState("");
  const dispatch = useDispatch();

  const updateWatchTime = async (id, duration) => {
    try {
      const res = await axios.put(
        `${serverURL}/api/videos/updateWatchTime/${id}`,
        { duration }
      );
      console.log("hi", res);
    } catch (err) {
      console.log(err, "err");
    }
  };

  useEffect(() => {
    return () => {
      if (videoPlayer) {
        const { player } = videoPlayer.getState();
        console.log(player);
        dispatch(setVideo(player));
      }
    };


  }, [videoPlayer]);
 
  const { selectedPlayer } = useSelector((state) => state.video);
 const {currentTime} = selectedPlayer
//   updateWatchTime(props.id, selectedPlayer.currentTime);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header  >
        {/* <Modal.Title id="contained-modal-title-vcenter">
         
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <Player
          ref={(player) => setVideoPlayer(player)}
          autoPlay
          fluid={false}
          width="100%"
          height={500}
        >
          <source src={props.url} />
        </Player>
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn btn-dark" onClick={()=>{
            updateWatchTime(props.id,currentTime)
            props.onHide()
        }}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default VideoPlayerModal;
