import * as styles from "@/components/pages/sales-post/book-status-box/BookStatusBox.style";

export const BookStatusBox = ({ bookStatus }) => {
  switch (bookStatus) {
    case "SALE":
      return <styles.BookStatusBoxSALE>판매중</styles.BookStatusBoxSALE>;
    case "TRADE":
      return <styles.BookStatusBoxTRADE>거래중</styles.BookStatusBoxTRADE>;
    case "SOLD":
      return <styles.BookStatusBoxSOLD>거래완료</styles.BookStatusBoxSOLD>;
    case "DELETE":
      return <styles.BookStatusBoxDELETE>판매중</styles.BookStatusBoxDELETE>;
  }
};
