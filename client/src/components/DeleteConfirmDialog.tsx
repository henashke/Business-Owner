import {GenericDialog} from './GenericDialog';

interface DeleteConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deleting: boolean;
}

export const DeleteConfirmDialog = ({
  open,
  onClose,
  onConfirm,
  deleting,
}: DeleteConfirmDialogProps) => {
  return (
    <GenericDialog
      open={open}
      onClose={onClose}
      onConfirm={onConfirm}
      title="אישור מחיקה"
      confirmText="מחק"
      loading={deleting}
      maxWidth="xs"
    >
      האם אתה בטוח שברצונך למחוק לקוח זה? לא ניתן לבטל פעולה זו.
    </GenericDialog>
  );
};

export default DeleteConfirmDialog;
