import * as styles from "./Chats.style";
import { Title } from "@/components/common/main-content/title/Title";
import { KeywordInput } from "@/components/common/main-content/keyword-input/KeywordInput";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Pagination from "@mui/material/Pagination";

export const Chats = () => {
  const SEARCH_OPTIONS = [
    {
      value: "1",
      name: "구매 요청",
      color: "#225510",
      backgroundColor: "#E3F9DC",
    },
    {
      value: "2",
      name: "구매 수락(입금확인필)",
      color: "#225510",
      backgroundColor: "#E3F9DC",
    },
    {
      value: "3",
      name: "입금 확인 완료",
      color: "#D2A225",
      backgroundColor: "#F9F6DC",
    },
    {
      value: "4",
      name: "사물함 선택 완료",
      color: "#A70D0D",
      backgroundColor: "#F9DCDC",
    },
    {
      value: "5",
      name: "서적 배치완료",
      color: "#A70D0D",
      backgroundColor: "#F9DCDC",
    },
    {
      value: "6",
      name: "거래 완료",
      color: "#A70D0D",
      backgroundColor: "#F9DCDC",
    },
    {
      value: "999",
      name: "거래 거절",
      color: "#A70D0D",
      backgroundColor: "#F9DCDC",
    },
    {
      value: "1000",
      name: "판매자 거래 중지",
      color: "#55584A",
      backgroundColor: "#D1D1CD",
    },
    {
      value: "1001",
      name: "구매자 거래 중지",
      color: "#55584A",
      backgroundColor: "#D1D1CD",
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const [chatList, setChatList] = useState([]);
  const [page, setPage] = useState(1);
  const [pageable, setPageable] = useState({});
  const [totalPages, setTotalPages] = useState(1);
  const [interact, setInteract] = useState();

  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (!router.isReady) return;

    let searchKeyword = router.query.searchKeyword
      ? router.query.searchKeyword
      : "";
    let interact = router.query.interact ? router.query.interact : "1";

    const params = {
      searchKeyword: searchKeyword,
      page: page - 1,
      size: 12,
      sort: "tradeAvailableDatetime, desc",
      interact: interact,
    };

    axios
      .get("/api/v1/admin/chat", { params })
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setPageable(res.data.pageable);
        setChatList(res.data.content);
        console.log(res);
      })
      .then(() => {
        setInteract(interact);
        setSearchKeyword(searchKeyword);
      });
  }, [router.isReady, page]);

  return (
    <>
      <Title titleText={"채팅 목록"} />
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
                  },
                })
                .then(() => window.location.reload());
            }
          }}
        />
        <styles.SearchSelect
          marginSize={2.3}
          onChange={(e) => setInteract(e.target.value)}
        >
          {SEARCH_OPTIONS.map((option) => (
            <styles.SearchOption
              key={option.value}
              value={option.value}
              selected={router.query.interact === option.value}
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
                  interact: interact,
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
              <styles.Th>판매자 ID</styles.Th>
              <styles.Th>상태</styles.Th>
              <styles.Th>상품명</styles.Th>
              <styles.Th>사물함 번호</styles.Th>
              <styles.Th>사물함 비밀번호</styles.Th>
              <styles.Th>구매자 ID</styles.Th>
              <styles.Th>거래 날짜</styles.Th>
              <styles.Th>거래 시간</styles.Th>
              <styles.Th>보기</styles.Th>
              <styles.Th>거래상태 관리</styles.Th>
            </tr>
          </styles.TableHeader>
          <styles.TableBody>
            {chatList.map((value) => (
              <styles.BodyTr>
                <styles.BodyTd
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "/member-info",
                      query: {
                        searchKeyword: value.sellerStudentId,
                      },
                    });
                  }}
                >
                  {value.sellerStudentId}
                </styles.BodyTd>
                <styles.BodyTd>
                  {SEARCH_OPTIONS.find(
                    (searchOption) =>
                      searchOption.value === String(value.interact),
                  ) && (
                    <styles.ChatStatusDiv>
                      {
                        SEARCH_OPTIONS.find(
                          (searchOption) =>
                            searchOption.value === String(value.interact),
                        ).name
                      }
                    </styles.ChatStatusDiv>
                  )}
                </styles.BodyTd>
                <styles.BodyTd>{value.usedBookName}</styles.BodyTd>
                <styles.BodyTd>{value.lockerNumber}</styles.BodyTd>
                <styles.BodyTd>{value.lockerPassword}</styles.BodyTd>
                <styles.BodyTd
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    router.push({
                      pathname: "/member-info",
                      query: {
                        searchKeyword: value.buyerStudentId,
                      },
                    });
                  }}
                >
                  {value.buyerStudentId}
                </styles.BodyTd>
                <styles.BodyTd>{value.tradeAvailableDate}</styles.BodyTd>
                <styles.BodyTd>{value.tradeAvailableTime}</styles.BodyTd>
                <styles.BodyTd>
                  <styles.SearchButton
                    onClick={() => {
                      router.push({
                        pathname: "/chat-room",
                        query: {
                          chatRoomId: value.chatRoomId,
                        },
                      });
                    }}
                  >
                    보기
                  </styles.SearchButton>
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
                      id={`${value.chatRoomId}searchOptions`}
                      style={{
                        width: "18rem",
                        height: "3.2rem",
                        border: "1px solid #CDCBCB",
                        fontSize: "1.6rem",
                      }}
                    >
                      {SEARCH_OPTIONS.map((option) => (
                        <option
                          key={option.value}
                          value={option.value}
                          selected={option.value === value.interact}
                        >
                          {["4", "5"].includes(option.value)
                            ? option.name + ":사물함선택전 사용 X"
                            : option.name}
                        </option>
                      ))}
                    </select>
                    <styles.SearchButton
                      onClick={() => {
                        const selectedInteract = document.getElementById(
                          `${value.chatRoomId}searchOptions`,
                        ).value;
                        axios
                          .patch(
                            `/api/v1/admin/chat/interact`,
                            {},
                            {
                              params: {
                                chatRoomId: value.chatRoomId,
                                interact: selectedInteract,
                              },
                            },
                          )
                          .then((res) => {
                            alert("변경되었습니다.");
                            window.location.reload();
                          })
                          .catch((err) => {
                            alert("에러가 발생하였습니다.");
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
