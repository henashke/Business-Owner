import {useTheme} from '@mui/material/styles';
import {ChangeEvent} from "react";

interface TimeInputProps {
  title: string;
  value?: string;
  onChange: (value: string) => void;
}
export default function TimeInput(props: TimeInputProps) {
  const theme = useTheme();

    const handleTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
      props.onChange(e.target.value);
    }

  return (
      <input
          type="time"
          value={props.value || ''}
          title={props.title}
          onChange={handleTimeChange}
          style={{ backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius,
            border: `1px solid ${theme.palette.divider}`,
            fontFamily: theme.typography.fontFamily,
            fontSize: theme.typography.fontSize,
            width: "100%",
            padding: theme.spacing(2, 1.5), }}
      />
  );
}