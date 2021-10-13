import PropTypes from "prop-types";
// material
import { alpha, styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useEffect } from "react";

// ----------------------------------------------------------------------

const RootStyle = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
});

const IconStyle = styled("div")(({ theme }) => ({
  marginLeft: -4,
  borderRadius: "50%",
  width: theme.spacing(2),
  height: theme.spacing(2),
  border: `solid 2px ${theme.palette.background.paper}`,
  boxShadow: `inset -1px 1px 2px ${alpha(theme.palette.common.black, 0.24)}`,
}));

// ----------------------------------------------------------------------

export default function ColorPreview(props) {
  useEffect(() => {
    console.log(props.colors);
  }, []);

  return (
    <RootStyle component="span">
      {props.colors.map((color, index) => (
        <IconStyle key={color + index} sx={{ bgcolor: color }} />
      ))}

      {props.colors.length > 3 && (
        <Typography variant="subtitle2">{`+${
          props.colors.length - 3
        }`}</Typography>
      )}
    </RootStyle>
  );
}
