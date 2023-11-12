import { Title } from "@/components/common/main-content/title/Title";
import { KeywordInput } from "@/components/common/main-content/keyword-input/KeywordInput";
import * as styles from "@/components/pages/sales-post/SalesPost.style";
import Pagination from "@mui/material/Pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import { BookStatusBox } from "@/components/pages/sales-post/book-status-box/BookStatusBox";
import { useRouter } from "next/router";
import { BASE_API } from "@/pages/api/baseApi";

export const SalesPost = () => {
  const SEARCH_OPTIONS = [
    { value: "ALL", name: "전체" },
    { value: "SALE", name: "판매중" },
    { value: "TRADE", name: "거래중" },
    { value: "SOLD", name: "거래완료" },
    // { value: "DELETE", name: "판매삭제" },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const [usedBookList, setUsedBookList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageable, setPageable] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [bookStatus, setBookStatus] = useState("ALL");
  const [changeBookStatus, setChangeBookStatus] = useState("");

  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (!router.isReady) return;

    let searchKeyword = router.query.searchKeyword
      ? router.query.searchKeyword
      : "";
    let bookStatus = router.query.bookStatus ? router.query.bookStatus : "ALL";

    const params = {
      searchKeyword: searchKeyword,
      page: page - 1,
      size: 12,
      sort: "id,desc",
      bookStatus: bookStatus,
    };

    BASE_API.get("/api/v1/admin/used-book", { params })
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setPageable(res.data.pageable);
        setUsedBookList(res.data.content);
      })
      .then(() => {
        setBookStatus(bookStatus);
        setSearchKeyword(searchKeyword);
      });
  }, [router.isReady, page]);

  return (
    <>
      <Title titleText={"전체 판매글 목록"} />
      <styles.FlexBox>
        <KeywordInput
          id="searchKeyword"
          placeholder={"키워드 입력"}
          value={searchKeyword}
          onChange={(event) => {
            setSearchKeyword(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              router
                .push({
                  pathname: pathname,
                  query: {
                    searchKeyword: searchKeyword,
                    bookStatus: bookStatus,
                  },
                })
                .then(() => window.location.reload());
            }
          }}
        />
        <styles.SearchSelect
          marginSize={2.3}
          onChange={(e) => setBookStatus(e.target.value)}
        >
          {SEARCH_OPTIONS.map((option) => (
            <styles.SearchOption
              key={option.value}
              value={option.value}
              selected={router.query.bookStatus === option.value}
            >
              {option.name}
            </styles.SearchOption>
          ))}
        </styles.SearchSelect>
        <styles.SearchButton
          onClick={() => {
            router
              .push({
                pathname: pathname,
                query: {
                  searchKeyword: searchKeyword,
                  bookStatus: bookStatus,
                },
              })
              .then(() => window.location.reload());
          }}
        >
          조회
        </styles.SearchButton>
      </styles.FlexBox>

      <styles.TableBox>
        <styles.Table>
          <styles.TableHeader>
            <tr>
              <styles.Th>ID</styles.Th>
              <styles.Th>상태</styles.Th>
              <styles.Th>상품명</styles.Th>
              <styles.Th>출판사</styles.Th>
              <styles.Th>가격</styles.Th>
              <styles.Th>등록일</styles.Th>
              <styles.Th>판매상태 관리</styles.Th>
            </tr>
          </styles.TableHeader>
          <styles.TableBody>
            {usedBookList.map((value) => (
              <styles.BodyTr>
                <styles.BodyTd>{value.id}</styles.BodyTd>
                <styles.BodyTd>
                  <BookStatusBox bookStatus={value.bookStatus} />
                </styles.BodyTd>
                <styles.BodyTd>{value.name}</styles.BodyTd>
                <styles.BodyTd>{value.publisher}</styles.BodyTd>
                <styles.BodyTd>{value.price}원</styles.BodyTd>
                <styles.BodyTd>
                  {value.createdAt
                    .substring(0, value.createdAt.indexOf("."))
                    .replace("T", " ")}
                </styles.BodyTd>
                <styles.BodyTd>
                  <div
                    style={{
                      display: "flex",
                      gap: "1.1rem",
                      margin: "0 auto",
                      justifyContent: "center",
                    }}
                  >
                    <select
                      id={`${value.id}bookStatus`}
                      style={{
                        width: "9.7rem",
                        height: "3.2rem",
                        border: "1px solid #CDCBCB",
                        fontSize: "1.6rem",
                      }}
                    >
                      {SEARCH_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          selected={option.value === value.bookStatus}
                        >
                          {option.name}
                        </option>
                      ))}
                    </select>
                    <styles.SearchButton
                      onClick={() => {
                        const selectedBookStatus = document.getElementById(
                          `${value.id}bookStatus`,
                        ).value;
                        axios
                          .patch(
                            `/api/v1/admin/used-book/${value.id}/${selectedBookStatus}`,
                          )
                          .then((res) => {
                            alert("변경되었습니다.");
                            window.location.reload();
                          });
                      }}
                    >
                      변경
                    </styles.SearchButton>
                  </div>
                </styles.BodyTd>
              </styles.BodyTr>
            ))}
          </styles.TableBody>
        </styles.Table>
        <Pagination
          style={{ marginTop: "3.5rem" }}
          page={page}
          count={totalPages}
          shape="rounded"
          onChange={(event, page) => {
            setPage(page);
          }}
        />
      </styles.TableBox>
    </>
  );
};
