import * as React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

// const StyledAlert = styled(Alert)(({ theme }) => ({
//   "& .MuiAlert-standard": {
//     borderRadius: 15,
//   },
// }));

export const CsmAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  (props, ref) => (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="standard"
      {...props}
      sx={{ borderRadius: '15px' }}
    />
  ),
);
