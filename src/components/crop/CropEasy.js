

import { Box, Dialog, DialogActions, DialogContent, Slide, Slider, Typography } from '@mui/material'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from "./utils/cropImage"
import { useAppDispatch } from '../../app/hook'
import Button from '../Button'
import { uploadImage } from '../../slices/StoreSlice'
import styled from 'styled-components'

const CropEasy = ({ photoUrl, setOpenCrop, openCrop, setPhotoUrl, setFile, multipleUpload, setMultipleUpload, setImageUrl, multiple, dummyUploadImage, setDummyUploadImage }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [rotation, setRotation] = useState(0)
    const [croppedAreaPixels, setCropAreaPixels] = useState(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCropAreaPixels(croppedAreaPixels)
    }

    function dataURLtoFile(dataurl, filename) {
        var arr = dataurl.split(","),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }

    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onloadend = () => resolve(reader.result)
            reader.onerror = reject
            reader.readAsDataURL(blob)
        }))


    const cropImage = async () => {
        setLoading(true)
        try {
            const { file, url } = await getCroppedImg(photoUrl, croppedAreaPixels, rotation)
            const newFile = await toDataURL(url)
                .then(dataUrl => {
                   const newName = Math.floor(Math.random() * 1000)
                   const bName = Math.floor(Math.random() * 1000)
                    var fileData = dataURLtoFile(dataUrl, `image${newName + bName}Name.jpg`);
                    return fileData
                })


            const data = new FormData();
            await data.append("image", newFile);
            const resultAction = await dispatch(uploadImage(data))
            if (uploadImage.fulfilled.match(resultAction)) {
                setLoading(false)
                if(multiple) {
                    setMultipleUpload([...multipleUpload, resultAction?.payload])
                    setDummyUploadImage([...dummyUploadImage, ""])
                    setOpenCrop(false)
                    return;
                }

                setImageUrl(resultAction?.payload)


            } else {
                if (resultAction.payload) {
                    setLoadering(false)
                    console.log('error1', `Update failed: ${resultAction?.payload}`)
                } else {
                    setLoader(false)
                    console.log('error', `Updated failed: ${resultAction?.payload}`)
                }
            }
            setOpenCrop(false)
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    return (
        <Dialog
            open={openCrop}
            onClose={() => setOpenCrop(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent dividers
                sx={{
                    background: "#333",
                    position: 'relative',
                    height: 400,
                    width: 'auto',
                    minWidth: { sm: 500 }
                }}
            >
                <Cropper
                    image={photoUrl}
                    crop={crop}
                    zoom={zoom}
                    rotation={rotation}
                    aspect={1}
                    onZoomChange={setZoom}
                    onRotationChange={setRotation}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </DialogContent>
            <DialogActions sx={{ flexDirection: 'column', mx: 3, my: 2 }}>
                <Box sx={{ width: '100%', mb: 1 }}>
                    <Box>
                        <Typography>Zoom</Typography>
                        <PrettoSlider
                            valueLabelDisplay='auto'
                            valueLabelFormat={zoomPercent}
                            aria-label="pretto slider"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            color="secondary"
                            onChange={(e, zoom) => setZoom(zoom)}
                        />
                    </Box>
                    <Box>
                        <Typography>Rotation</Typography>
                        <PrettoSlider
                            valueLabelDisplay='auto'
                            aria-label="pretto slider"
                            min={0}
                            max={360}
                            color="secondary"
                            value={rotation}
                            onChange={(e, rotation) => setRotation(rotation)}
                        />
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: 10,
                        width: '100%'
                        // flexWrap: 'wrap'
                    }}
                >
                    {/* <Button type='cancel' children='Cancel' handlePress={() => setOpenCrop(false)} /> */}
                    <Div>
                         <Button isLoading={loading} children='Crop' handlePress={cropImage} />
                    </Div>
                   
                </Box>
            </DialogActions>
        </Dialog>
    )

}

export default CropEasy


const zoomPercent = (value) => {
    return `${Math.round(value * 100)}%`
}


const PrettoSlider = styled(Slider)({
    color: '#F80595',
    height: 8,
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#F80595',
      border: '2px solid #F80595',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&:before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      lineHeight: 1.2,
      fontSize: 12,
      background: 'unset',
      padding: 0,
      width: 32,
      height: 32,
      borderRadius: '50% 50% 50% 0',
      backgroundColor: '#F80595',
      transformOrigin: 'bottom left',
      transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
      '&:before': { display: 'none' },
      '&.MuiSlider-valueLabelOpen': {
        transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
      },
      '& > *': {
        transform: 'rotate(45deg)',
      },
    },
  });

  const Div = styled.div`
  width: 100%;
  `