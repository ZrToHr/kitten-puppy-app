import React, { useCallback, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Logout from '@mui/icons-material/Logout';
import ListItemText from '@mui/material/ListItemText';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { InvokeSignOut } from '../../features/auth/auth-slice';
import { UploadToAlbum } from '../../features/highlights/album-slice';
import { AlbumFile } from '../../models/Album';

export default function AvatarMenu() {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useAppDispatch();

  const { userId } = useAppSelector((state) => state.album);

  const handleLogout = useCallback(() => {
    dispatch(InvokeSignOut());
  }, []);

  const handleUploadOnClick = useCallback(() => {
    uploadRef.current?.click();
  }, []);

  const handleUploadOnChange = useCallback((e: any) => {
    const file: File = e.target.files[0];
    const albumFile: AlbumFile = {
      UserId: userId,
      PhotoFile: file,
    };
    console.log('upload DTO: ', albumFile);

    // dispatch(UploadToAlbum(albumFile));
  }, []);

  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2, position: 'absolute', top: '20px', right: '20px' }}
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleUploadOnClick}>
          <ListItemIcon>
            <CloudUploadIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'rgba(0, 0, 0, 0.65)' }}>Upload</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ color: 'rgba(0, 0, 0, 0.65)' }}>Logout</ListItemText>
        </MenuItem>
      </Menu>
      <input ref={uploadRef} hidden accept="image/*" type="file" onChange={handleUploadOnChange} />
    </>
  );
}
