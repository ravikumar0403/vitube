import { useAuth, useModal, usePlaylist } from "context";
import { useOutsideClick } from "hooks";
import { useState, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdMoreTime } from "react-icons/md";
import { RiPlayListLine } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToWatchLater, removeFromWatchlater } from "services/watchlater";
import { findItemById } from "utils";

export const VideoDropdownMenu = ({ video }) => {
  const { showModal } = useModal();
  const { watchlater, dispatch } = usePlaylist();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleWatchlaterClick = async () => {
    if (!user) {
      navigate("/login", { state: { from: pathname } });
      return;
    }
    setIsOpen(false);
    let updatedList = watchlater;
    if (findItemById(video._id, watchlater)) {
      updatedList = await removeFromWatchlater(video._id);
      toast.info("Video removed from watch later");
    } else {
      updatedList = await addToWatchLater(video);
      toast.success("Video added to watch later");
    }
    if (updatedList) {
      dispatch({
        type: "UPDATE_WATCHLATER",
        payload: updatedList,
      });
    }
  };

  const handleAddToPlaylistClick = () => {
    showModal(video);
    setIsOpen(false);
  };

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button className="btn" onClick={() => setIsOpen((prev) => !prev)}>
        <BsThreeDotsVertical className="fs-1" />
      </button>
      <ul className={`dropdown-menu ${isOpen && "expanded"}`}>
        <li className="dropdown-item" onClick={handleWatchlaterClick}>
          <MdMoreTime />
          Watch Later
        </li>
        <li className="dropdown-item" onClick={handleAddToPlaylistClick}>
          <RiPlayListLine />
          Add to playlist
        </li>
      </ul>
    </div>
  );
};
