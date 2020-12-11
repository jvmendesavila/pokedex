import React, { useState, useEffect } from "react";

// Material UI
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";

// Icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";

const useStyle = makeStyles(() => ({
  label: {
    color: "black",
    "&$focusedLabel": {
      color: "black",
    },
    "&$erroredLabel": {
      color: "red",
    },
  },
  underline: {
    "&$error:after": {
      // borderBottom: '10px solid',
      borderBottomColor: "red",
    },
    "&:after": {
      // borderBottom: '10px solid',
      borderBottomColor: "black",
    },
  },
  focusedLabel: {},
  erroredLabel: {},

  erroSpan: {
    color: "red",
    fontSize: "11px",
  },
  iconButtonStyle: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  vIcon: {
    fontSize: 24,
    display: "flex",
  },
  helper: {
    fontSize: 12,
  },
}));

export default function CustomTextField({
  name,
  label,
  placeholder,
  field,
  form,
  ...props
}) {
  const classes = useStyle();
  const {
    type,
    inputClassName,
    onChangeValue,
    maxLength,
    underlineClass,
    startAdornment,
    endAdornment,
    onClick,
    className,
    InputProps,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onChange = (e) => {
    form.setFieldValue(field.name, e.target.value);
  };

  const handleBlur = () => {
    setOnBlur(true);
    if (props.onBlur) props.onBlur(form);
  };

  useEffect(() => {
    if (onChangeValue) {
      onChangeValue(form);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form && form.values[`${field.name}`]]);

  return (
    <>
      <TextField
        {...field}
        fullWidth
        autoComplete={props.autoComplete}
        autoFocus={props.autoFocus}
        label={label}
        onClick={onClick}
        error={onBlur && props.error}
        onChange={onChange}
        disabled={props.disabled}
        placeholder={placeholder}
        className={className ? className : undefined}
        onBlur={handleBlur}
        onFocus={() => setOnBlur(false)}
        type={type === "password" && showPassword ? "text" : type}
        InputLabelProps={{
          classes: {
            root: classes.label,
            focused: classes.focusedLabel,
            error: classes.erroredLabel,
          },
          shrink: props.shrink,
        }}
        InputProps={
          InputProps
            ? InputProps
            : {
                classes: {
                  root: underlineClass || classes.underline,
                },
                inputProps: {
                  className: inputClassName && inputClassName,
                  maxLength: maxLength,
                },
                startAdornment: startAdornment,
                endAdornment:
                  (endAdornment && endAdornment) ||
                  (type === "password" && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        className={classes.iconButtonStyle}
                        onClick={handleClickShowPassword}
                      >
                        {showPassword && (
                          <VisibilityIcon className={classes.vIcon} />
                        )}
                        {!showPassword && (
                          <VisibilityOffIcon className={classes.vIcon} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  )),
              }
        }
      />

      {/* Erro do Campo */}
      {Boolean(props.error && onBlur) && (
        <span className={classes.erroSpan}>{props.error}</span>
      )}
    </>
  );
}
