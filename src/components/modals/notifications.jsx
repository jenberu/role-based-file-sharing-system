import { Modal, Button } from "@mui/material";
import PropTypes from "prop-types";

const NotificationModal = ({
  open,
  handleClose,
  notificationList,
  markAsRead,
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="notification-modal-title"
      aria-describedby="notification-modal-description"
    >
      <div
        className="modal-content"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          border: "2px solid #000",
          boxShadow: 24,
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        <h2 id="notification-modal-title">Notifications</h2>
        {notificationList.length > 0 ? (
          notificationList.map((notification, index) => (
            <div key={index} className="notification-item">
              {notification}
            </div>
          ))
        ) : (
          <p id="notification-modal-description">No new notifications</p>
        )}
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          style={{ margin: "10px" }}
        >
          Close
        </Button>
        {notificationList.length > 0 && (
          <Button
            onClick={markAsRead}
            variant="contained"
            color="primary"
            style={{ margin: "10px" }}
          >
            Mark as Read
          </Button>
        )}
      </div>
    </Modal>
  );
};
NotificationModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  notificationList: PropTypes.arrayOf(PropTypes.string).isRequired,
  markAsRead: PropTypes.func.isRequired,
};

export default NotificationModal;
