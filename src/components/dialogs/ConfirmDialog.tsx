import React, { ReactNode } from "react";
import { FaTimes } from "react-icons/fa";
import classNames from "classnames"; // Assuming you're using classnames package

// ConfirmDialog Props
type ConfirmDialogProps = {
  visible?: boolean;
  onHide?: () => void;
  message?: string;
  header?: string;
  icon?: ReactNode;
  acceptLabel?: string;
  rejectLabel?: string;
  onAccept?: () => void;
  onReject?: () => void;
  position?: "top" | "bottom" | "left" | "right" | "center";
  content?: ReactNode;
  className?: string; // Custom styling via classNames
  acceptClassName?: string; // Class for accept button
  rejectClassName?: string; // Class for reject button
};

// ConfirmDialog Component
const ConfirmDialog = ({
  visible = false,
  onHide,
  message = "Are you sure?",
  header = "Confirmation",
  icon,
  acceptLabel = "Yes",
  rejectLabel = "No",
  onAccept,
  onReject,
  position = "center",
  content,
  className,
  acceptClassName,
  rejectClassName,
}: ConfirmDialogProps) => {
  if (!visible) return null;

  const getPositionClass = () => {
    switch (position) {
      case "top":
        return "top-0 left-1/2 transform -translate-x-1/2";
      case "bottom":
        return "bottom-0 left-1/2 transform -translate-x-1/2";
      case "left":
        return "left-0 top-1/2 transform -translate-y-1/2";
      case "right":
        return "right-0 top-1/2 transform -translate-y-1/2";
      case "center":
      default:
        return "top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2";
    }
  };

  const dialogClass = classNames(
    "fixed bg-white rounded-md shadow-lg p-4 z-50", // Default styling
    getPositionClass(), // Position styling
    className // Custom className passed via props
  );

  const handleClose = () => {
    if (onHide) onHide();
  };

  const handleAccept = () => {
    if (onAccept) onAccept();
    handleClose();
  };

  const handleReject = () => {
    if (onReject) onReject();
    handleClose();
  };

  return (
    <div  onClick={handleClose} className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className={dialogClass}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">{header}</h3>
          <button type="button" onClick={handleClose}>
            <FaTimes />
          </button>
        </div>

        {content ? (
          // Headless mode - Custom content
          content
        ) : (
          <>
            {icon && <div className="mb-4">{icon}</div>}
            <p className="mb-4">{message}</p>
            <div className="flex justify-end gap-4">
              <button
              type="button"
                className={classNames(
                  "px-4 py-2 rounded-md transition-colors duration-200", // Base button styles
                  rejectClassName // Custom class for reject button
                )}
                onClick={handleReject}
              >
                {rejectLabel}
              </button>
              <button
              type="button"
                className={classNames(
                  "px-4 py-2 rounded-md text-white transition-colors duration-200", // Base button styles
                  acceptClassName // Custom class for accept button
                )}
                onClick={handleAccept}
              >
                {acceptLabel}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmDialog;
