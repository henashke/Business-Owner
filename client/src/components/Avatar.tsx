import {Avatar as MuiAvatar} from '@mui/material';

interface AvatarProps {
  initials?: string;
  size?: number;
}

export const Avatar = ({ initials = '', size = 48 }: AvatarProps) => {

  return (
    <MuiAvatar
      alt={initials}
      sx={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >{initials}</MuiAvatar>
  );
};

export default Avatar;