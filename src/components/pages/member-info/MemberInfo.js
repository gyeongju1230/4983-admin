import * as styles from "./MemberInfo.style";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import { BlockButton } from "@/components/pages/member-info/block-button/BlockButton";
import { Title } from "@/components/common/main-content/title/Title";
import { KeywordInput } from "@/components/common/main-content/keyword-input/KeywordInput";
import { useRouter } from "next/router";
import { BASE_API } from "@/pages/api/baseApi";

export const MemberInfo = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(1);
  const [memberList, setMemberList] = useState([]);
  const [pageable, setPageable] = useState({});
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (!router.isReady) return;

    let searchKeyword = router.query.searchKeyword
      ? router.query.searchKeyword
      : "";

    const params = {
      searchKeyword: searchKeyword,
      page: page - 1,
      size: 12,
      sort: "id,desc",
    };
    BASE_API.get("/api/v1/admin/member", { params })
      .then((res) => {
        setTotalPages(res.data.totalPages);
        setPageable(res.data.pageable);
        setMemberList(res.data.content);
      })
      .then(() => {
        setSearchKeyword(searchKeyword);
      });
  }, [router.isReady, page]);

  return (
    <>
      <Title titleText={"회원 정보 관리"} />
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
      </styles.FlexBox>

      {/*FIXME 테이블 상하 가운데 정렬 안됨*/}
      <styles.TableBox>
        <styles.Table>
          <styles.TableHeader>
            <tr>
              <styles.Th>ID</styles.Th>
              <styles.Th>학번</styles.Th>
              <styles.Th>학과</styles.Th>
              <styles.Th>닉네임</styles.Th>
              <styles.Th>휴대전화</styles.Th>
              <styles.Th>계좌은행</styles.Th>
              <styles.Th>계좌번호</styles.Th>
              <styles.Th>계좌주</styles.Th>
              <styles.Th>차단</styles.Th>
            </tr>
          </styles.TableHeader>
          <styles.TableBody>
            {memberList.map((value) => {
              return (
                <styles.BodyTr>
                  <styles.BodyTd>{value.id}</styles.BodyTd>
                  <styles.BodyTd>{value.studentId}</styles.BodyTd>
                  <styles.BodyTd>{value.department}</styles.BodyTd>
                  <styles.BodyTd>{value.nickname}</styles.BodyTd>
                  <styles.BodyTd>{value.phoneNumber}</styles.BodyTd>
                  <styles.BodyTd>{value.accountBank}</styles.BodyTd>
                  <styles.BodyTd>{value.accountNumber}</styles.BodyTd>
                  <styles.BodyTd>{value.accountHolder}</styles.BodyTd>
                  <styles.BodyTd>
                    <BlockButton id={value.id} isBlocked={value.isWithdraw} />
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
    </>
  );
};
