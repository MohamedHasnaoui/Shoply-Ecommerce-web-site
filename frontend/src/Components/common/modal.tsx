import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Backdrop, Fade } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export interface BasicModalRef {
    openModal: () => void,
    closeModal: ()=>void
}
interface BasicModalProps {
    body: React.JSX.Element,
    title:string
}
export const  BasicModal = React.forwardRef((props:BasicModalProps, ref:React.ForwardedRef<BasicModalRef>) => {
    React.useImperativeHandle(ref, () => ({
        openModal: () => {
            setOpen(true);
        },
        closeModal: ()=>{
            handleClose()
        }
    }));
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
    <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h4 className='text-center'>
              {props.title}
            </h4>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {props.body}
            </Typography>
          </Box>
        </Fade>
      </Modal>

  );
})
