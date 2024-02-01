import { Title } from "@/components/common/main-content/title/Title";
import * as styles from "@/components/pages/event/layout/event-layout.styles";
import { KeywordInput } from "@/components/common/main-content/keyword-input/KeywordInput";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { RegisterModal } from "@/components/pages/event/register-modal/register-modal";
import { ModifyModal } from "@/components/pages/event/modify-modal/modify-modal";
import { BASE_API } from "@/pages/api/baseApi";
import Pagination from "@mui/material/Pagination";
import dayjs from "dayjs";

export const EventLayout = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [pageable, setPageable] = useState({});

  const [totalPages, setTotalPages] = useState(1);

  const [eventList, setEventList] = useState([]);

  const [isRegisterModalOpened, setIsRegisterModalOpened] = useState(false);
  const [isModifyModalOpened, setIsModifyModalOpened] = useState(false);
  const [modifyEventNumber, setModifyEventNumber] = useState(0);

  const router = useRouter();
  const pathname = router.pathname;

  const mainBannerImage = useRef(null);
  const eventBannerImage = useRef(null);
  const eventWindowImage = useRef(null);

  const [startDate, setStartDate] = useState(dayjs("2024-01-01"));
  const [endDate, setEndDate] = useState(dayjs("2024-01-01"));
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!router.isReady) return;

    let searchKeyword = router.query.searchKeyword
      ? router.query.searchKeyword
      : "";

    const params = {
      searchKeyword: searchKeyword,
      page: page - 1,
      size: 12,
    };
    BASE_API.get("/api/v1/admin/notice", { params }).then((res) => {
      console.log(res);
      setEventList(res.data.content);
      setSearchKeyword(searchKeyword);
      setTotalPages(res.data.totalPages);
    });
  }, [router.isReady, page]);

  return (
    <styles.Container>
      <Title titleText="이벤트 페이지 목록" />
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
        <styles.SearchButton
          onClick={() => {
            router
              .push({
                pathname: pathname,
                query: {
                  searchKeyword: searchKeyword,
                },
              })
              .then(() => window.location.reload());
          }}
        >
          조회
        </styles.SearchButton>
        <styles.WriteButton
          onClick={() => {
            setIsRegisterModalOpened(true);
          }}
        >
          팝업 작성
        </styles.WriteButton>
      </styles.FlexBox>

      <styles.TableBox>
        <styles.Table>
          <styles.TableHeader>
            <tr>
              <styles.Th></styles.Th>
              <styles.Th>이벤트 페이지 제목</styles.Th>
              <styles.Th>시작날짜</styles.Th>
              <styles.Th>종료날짜</styles.Th>
              <styles.Th></styles.Th>
            </tr>
          </styles.TableHeader>
          <styles.TableBody>
            {eventList.map((event, _) => {
              return (
                <styles.BodyTr>
                  <styles.BodyTd>{event.id}</styles.BodyTd>
                  <styles.BodyTd>{event.title}</styles.BodyTd>
                  <styles.BodyTd>{event.startDate}</styles.BodyTd>
                  <styles.BodyTd>{event.endDate}</styles.BodyTd>
                  <styles.BodyTd>
                    <styles.SearchButton
                      onClick={() => {
                        setIsModifyModalOpened(true);
                        setModifyEventNumber(event.id);
                      }}
                    >
                      수정
                    </styles.SearchButton>
                  </styles.BodyTd>
                </styles.BodyTr>
              );
            })}
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

      <RegisterModal
        isModalOpened={isRegisterModalOpened}
        setIsModalOpened={setIsRegisterModalOpened}
        mainBannerImage={mainBannerImage}
        eventBannerImage={eventBannerImage}
        eventWindowImage={eventWindowImage}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        title={title}
        setTitle={setTitle}
      />
      <ModifyModal
        isModalOpened={isModifyModalOpened}
        setIsModalOpened={setIsModifyModalOpened}
        mainBannerImage={mainBannerImage}
        eventBannerImage={eventBannerImage}
        eventWindowImage={eventWindowImage}
        eventId={modifyEventNumber}
      />
    </styles.Container>
  );
};
