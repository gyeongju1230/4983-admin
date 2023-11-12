import { Title } from "@/components/common/main-content/title/Title";
import { KeywordInput } from "@/components/common/main-content/keyword-input/KeywordInput";
import * as styles from "@/components/pages/locker/LockerList.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { LockerStatusBox } from "@/components/pages/locker/locker-status-box/LockerStatusBox";
import { BASE_API } from "@/pages/api/baseApi";

export const LockerList = () => {
  const SEARCH_OPTIONS = [
    { value: true, name: "사용중" },
    { value: false, name: "사용가능" },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const [lockerList, setLockerList] = useState([]);
  const [isExists, setIsExists] = useState(true);

  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (!router.isReady) return;

    let searchKeyword = router.query.searchKeyword
      ? router.query.searchKeyword
      : "";
    let isExists = router.query.isExists === "true";

    const params = {
      searchKeyword: searchKeyword,
      isExists: isExists,
    };
    setIsExists(isExists);
    setSearchKeyword(searchKeyword);

    BASE_API.get("/api/v1/admin/locker", { params }).then((res) => {
      setLockerList(res.data);
    });
  }, [router.isReady]);

  return (
    <>
      <Title titleText={"사물함 사용 현황"} />
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
                    isExists: isExists,
                  },
                })
                .then(() => window.location.reload());
            }
          }}
        />
        <styles.SearchSelect
          marginSize={2.3}
          onChange={(e) => {
            setIsExists(e.target.value);
          }}
        >
          {SEARCH_OPTIONS.map((option) => (
            <styles.SearchOption
              key={option.value}
              value={option.value}
              selected={isExists === option.value ? "selected" : ""}
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
                  isExists: isExists,
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
              <styles.Th>사물함 번호</styles.Th>
              <styles.Th>판매자 ID</styles.Th>
              <styles.Th>상태</styles.Th>
              <styles.Th style={{ width: "63rem" }}></styles.Th>
              <styles.Th>구매자 ID</styles.Th>
              <styles.Th>사용시작일</styles.Th>
              <styles.Th>사용현황 관리</styles.Th>
            </tr>
          </styles.TableHeader>
          <styles.TableBody>
            {lockerList.map((value) => (
              <styles.BodyTr>
                <styles.BodyTd>{value.lockerNumber}</styles.BodyTd>
                <styles.BodyTd>
                  {value.sellerStudentId ? value.sellerStudentId : "-"}
                </styles.BodyTd>
                <styles.BodyTd>
                  <LockerStatusBox lockerStatus={value.isExists} />
                </styles.BodyTd>
                <styles.BodyTd></styles.BodyTd>
                <styles.BodyTd>
                  {value.buyerStudentId ? value.buyerStudentId : "-"}
                </styles.BodyTd>
                <styles.BodyTd>{value.tradeAvailableDate}</styles.BodyTd>
                <styles.BodyTd>
                  <select
                    id={`${value.lockerNumber}LockerStatus`}
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
                        selected={option.value === value.isExists}
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                  <styles.SearchButton
                    onClick={() => {
                      const selectedLockerStatus = document.getElementById(
                        `${value.lockerNumber}LockerStatus`,
                      ).value;

                      BASE_API.patch(
                        `/api/v1/admin/locker/${value.lockerNumber}/${selectedLockerStatus}`,
                      ).then((res) => {
                        alert("변경되었습니다.");
                        window.location.reload();
                      });
                    }}
                  >
                    변경
                  </styles.SearchButton>
                </styles.BodyTd>
              </styles.BodyTr>
            ))}
          </styles.TableBody>
        </styles.Table>
      </styles.TableBox>
    </>
  );
};
