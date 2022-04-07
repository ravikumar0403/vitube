import { usePlaylist } from "context";
import { useTheme } from "context/theme-context";
import React from "react";
import reactDom from "react-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deletePlaylist } from "services";

export const ConfirmDeleteModal = ({ playlist, setShowDeleteConfirmation }) => {
  const navigate = useNavigate();
  const { dispatch } = usePlaylist();
  const { theme } = useTheme();
  const closeModal = () => setShowDeleteConfirmation(false);
  const handleDelete = async () => {
    const playlists = await deletePlaylist(playlist._id);
    navigate("/playlist");
    dispatch({
      type: "SET_PLAYLISTS",
      payload: playlists,
    });
    toast.info(`${playlist.title} playlist deleted successfully`);
  };

  return reactDom.createPortal(
    <div className="modal open" id="exampleModal">
      <div className="modal-dialog centered">
        <div className="modal-header">
          <h3>Are you sure? </h3>
          <button
            className={`btn icon-only ${theme === "dark" ? "text-light" : ""}`}
            onClick={closeModal}
          >
            <i className="fa fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <p className="card-text pr-3 py-4">
            This will clear all the videos from {playlist.title}. You won't be
            able to <br /> retrieve it again.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn primary outlined" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
