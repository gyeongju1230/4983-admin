import * as styles from "@/components/pages/locker/locker-status-box/LockerStatusBox.style";

export const LockerStatusBox = ({ lockerStatus }) => {
  switch (lockerStatus) {
    case true:
      return <styles.BookStatusBoxSOLD>사용중</styles.BookStatusBoxSOLD>;
    case false:
      return <styles.BookStatusBoxDELETE>사용가능</styles.BookStatusBoxDELETE>;
  }
};
