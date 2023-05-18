import { Avatar, Box, Typography, Modal } from "@mui/material";
import { useState, useRef } from "react";
import ReactPlayer from "react-player";
const OfficialClips = ({ video }) => {
  const clips = video?.results?.filter((vid) => vid.type !== "Trailer");

  return (
    <main style={{ margin: "40px" }}>
      <Typography className="text-white" variant="h5">
        Official Video Clips
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {clips?.length <= 0 && (
          <Typography className="center color-danger" variant="h5">
            No Video Clips
          </Typography>
        )}
        {clips?.length > 0 &&
          clips?.slice(0, 6).map((clip) => <Clip key={clip?.id} clip={clip} />)}
      </Box>
    </main>
  );
};

export default OfficialClips;

const Clip = ({ clip }) => {
  const [open, setOpen] = useState(false);
  const playerRef = useRef(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // stop the video after closing the modal
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      playerRef.current.pause();
    }
  };

  return (
    <>
      <Box onClick={handleOpen} sx={{ marginBottom: "10px" }}>
        <Avatar
          sx={{ width: "150px", height: "150px", cursor: "pointer" }}
          className="avatar-m"
          alt="C"
          src={`https://img.youtube.com/vi/${clip?.key}/mqdefault.jpg`}
        />
      </Box>

      <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className="modal-style">
          <ReactPlayer
            url={`https://youtube.com/watch?v=${clip?.key}`}
            width="100%"
            height="100%"
            controls
            ref={playerRef}
          />
        </Box>
      </Modal>
    </>
  );
};
