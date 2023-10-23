import * as styles from "./BlockButton.style";
import axios from "axios";

export const BlockButton = ({ id, isBlocked }) => {
  if (isBlocked) {
    return (
      <styles.NotBlockedButtonBox
        onClick={() => {
          let isConfirm = confirm("차단을 헤제하시겠습니까?");
          if (isConfirm) {
            axios
              .patch(`/api/v1/admin/member/block/${id}`)
              .then((res) => {
                alert("차단이 헤제되었습니다.");
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
      >
        차단
      </styles.NotBlockedButtonBox>
    );
  } else {
    return (
      <styles.BlockedButtonBox
        onClick={() => {
          let isConfirm = confirm("차단하시겠습니까?");
          if (isConfirm) {
            axios
              .patch(`/api/v1/admin/member/block/${id}`)
              .then((res) => {
                alert("차단되었습니다.");
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          }
        }}
      >
        차단
      </styles.BlockedButtonBox>
    );
  }
};
