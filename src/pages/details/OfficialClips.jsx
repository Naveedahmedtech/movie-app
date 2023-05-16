import { Avatar, Box, Typography, Modal } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  outline: "none",
};

const OfficialClips = ({ video }) => {
  const clips = video?.results?.filter((vid) => vid.type !== "Trailer");

  return (
    <main style={{ margin: "40px" }}>
      <Typography className="text-white" variant="h5">
        Official Video Clips
      </Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>
        {clips?.length <= 0 && (
          <Typography className="text-white" variant="h5">
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

  const handleOpen = () => {
      setOpen(true);
      console.log(clip?.key)
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleOpen} sx={{marginBottom: '10px'}}>
        <Avatar
                  sx={{ width: "150px", height: "150px" }}
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
        <Box sx={style} style={{ backgroundColor: "transparent" }}>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
            Trailer
          </Typography>
          <video
            src={`https://youtube.com/watch?v=${clip?.key}`}
            width="100%"
            height="auto"
            controls
          ></video>
        </Box>
      </Modal>
    </>
  );
};
