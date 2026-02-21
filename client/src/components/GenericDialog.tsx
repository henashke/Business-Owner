import {ReactNode} from 'react';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';

interface GenericDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  children: ReactNode;
  confirmText?: string;
  cancelText?: string;
  confirmDisabled?: boolean;
  loading?: boolean;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

export const GenericDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  children,
  confirmText = 'שמור',
  cancelText = 'בטל',
  confirmDisabled = false,
  loading = false,
  maxWidth = 'sm',
}: GenericDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth={maxWidth} fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions sx={{p: 2, gap: 1}}>
        <Button onClick={onClose} disabled={loading} sx={{color: '#7f8c8d'}}>
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={loading || confirmDisabled}
          sx={{
            backgroundColor: '#6c5ce7',
            '&:hover': {
              backgroundColor: '#5f4dd3',
            },
          }}
        >
          {loading ? 'שומר...' : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GenericDialog;
