import React from "react";

import cx from "classnames";

function Button({
  buttonText = "Click Me",
  onClick = () => {},
  type = "button",
  disabled = false,
  buttonType = "BUTTON_PRIMARY",
  isButtonSmall = false,
  className = "",
}) {
  const btn_class = cx({
    "btn-primary": buttonType === "BUTTON_PRIMARY",
    "btn-danger": buttonType === "BUTTON_DANGER",
    "btn-outline-danger": buttonType === "BUTTON_OUTLINE_DANGER",
    "btn-sm": isButtonSmall,
  });

  return (
    <button
      className={cx("btn", btn_class, className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
}

export default Button;
