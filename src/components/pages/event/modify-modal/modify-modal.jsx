import Image from "next/image";
import * as styles from "@/components/pages/event/modify-modal/modify-modal-styles";
import { useEffect, useRef, useState } from "react";
import { BASE_API } from "@/pages/api/baseApi";
import dayjs from "dayjs";

export const ModifyModal = ({ isModalOpened, setIsModalOpened, eventId }) => {
  const [mainBannerText, setMainBannerText] = useState("");
  const [eventBannerText, setEventBannerText] = useState("");
  const [eventWindowText, setEventWindowText] = useState("");

  const mainBannerImage = useRef(null);
  const eventBannerImage = useRef(null);
  const eventWindowImage = useRef(null);

  const [startDate, setStartDate] = useState(dayjs("2024-01-01"));
  const [endDate, setEndDate] = useState(dayjs("2024-01-01"));
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (eventId > 0) {
      BASE_API.get("/api/v1/admin/notice/" + eventId).then((res) => {
        setStartDate(dayjs(res.data.startDate));
        setEndDate(dayjs(res.data.endDate));
        setTitle(res.data.title);
      });
    }
  }, [isModalOpened, eventId]);

  return (
    <styles.CustomModal open={isModalOpened}>
      <styles.ModalInBox>
        <styles.CloseModalBox
          onClick={() => {
            setIsModalOpened(false);
          }}
        >
          <Image
            src={require("@/images/close-modal.png")}
            alt={"asd"}
            width={20}
            height={20}
          />
        </styles.CloseModalBox>
        <styles.StartAndEndDateBox>
          <styles.DateBox>
            <styles.DateTitle>시작날짜</styles.DateTitle>
            <styles.CustomDatePicker
              format={"YYYY-MM-DD"}
              value={startDate}
              onChange={(date) => {
                setStartDate(date);
              }}
            />
          </styles.DateBox>
          <styles.DateBox>
            <styles.DateTitle>종료날짜</styles.DateTitle>
            <styles.CustomDatePicker
              format={"YYYY-MM-DD"}
              value={endDate}
              onChange={(date) => {
                setEndDate(date);
              }}
            />
          </styles.DateBox>
        </styles.StartAndEndDateBox>
        <styles.EventPageTitleBox>
          <styles.EventPageTitle>이벤트 페이지 제목</styles.EventPageTitle>
          <styles.EventPageInput
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </styles.EventPageTitleBox>
        <styles.EachImageBox>
          <styles.EachImageTitle>
            <b style={{ fontWeight: 700 }}> 메인 화면 배너</b>
            이미지 파일 가져오기
          </styles.EachImageTitle>
          <styles.ImageBox>
            <styles.EachImageButton
              onClick={() => {
                mainBannerImage.current.click();
              }}
              type={"file"}
            >
              내 PC
            </styles.EachImageButton>
            <styles.EachImageName>{mainBannerText}</styles.EachImageName>
            <styles.EachImageInput
              type="file"
              accept={"image/*"}
              ref={mainBannerImage}
              onChange={() => {
                const mainBannerInput = mainBannerImage.current;

                if (mainBannerInput.files.length > 0) {
                  setMainBannerText(mainBannerInput.files[0].name);
                } else {
                  setMainBannerText("");
                }
              }}
            />
          </styles.ImageBox>
        </styles.EachImageBox>
        <styles.EachImageBox>
          <styles.EachImageTitle>
            <b style={{ fontWeight: 700 }}>이벤트/공지사항 배너</b> 이미지 파일
            가져오기
          </styles.EachImageTitle>
          <styles.ImageBox>
            <styles.EachImageButton
              onClick={() => {
                eventBannerImage.current.click();
              }}
            >
              내 PC
            </styles.EachImageButton>
            <styles.EachImageName>{eventBannerText}</styles.EachImageName>
            <styles.EachImageInput
              type="file"
              ref={eventBannerImage}
              onChange={(e) => {
                const eventBannerInput = eventBannerImage.current;

                if (eventBannerInput.files.length > 0) {
                  setEventBannerText(eventBannerInput.files[0].name);
                } else {
                  setEventBannerText("");
                }
              }}
            />
          </styles.ImageBox>
        </styles.EachImageBox>
        <styles.EachImageBox>
          <styles.EachImageTitle>
            <b style={{ fontWeight: 700 }}>이벤트/공지사항 창</b> 이미지 파일
            가져오기
          </styles.EachImageTitle>
          <styles.ImageBox>
            <styles.EachImageButton
              onClick={() => {
                eventWindowImage.current.click();
              }}
            >
              내 PC
            </styles.EachImageButton>
            <styles.EachImageName>{eventWindowText}</styles.EachImageName>
            <styles.EachImageInput
              type="file"
              ref={eventWindowImage}
              onChange={() => {
                const eventWindowInput = eventWindowImage.current;

                if (eventWindowInput.files.length > 0) {
                  setEventWindowText(eventWindowInput.files[0].name);
                } else {
                  setEventWindowText("");
                }
              }}
            />
          </styles.ImageBox>
        </styles.EachImageBox>
        <styles.RegisterButtonBox
          onClick={async () => {
            const formData = new FormData();
            await formData.append(
              "mainFile",
              mainBannerImage.current.files[0]
                ? mainBannerImage.current.files[0]
                : null,
            );
            await formData.append(
              "noticeFile",
              eventBannerImage.current.files[0]
                ? eventBannerImage.current.files[0]
                : null,
            );
            await formData.append(
              "noticeWindowFile",
              eventWindowImage.current.files[0]
                ? eventWindowImage.current.files[0]
                : null,
            );
            await formData.append("title", JSON.stringify(title));
            await formData.append(
              "startDate",
              JSON.stringify(startDate.format("YYYY-MM-DD")),
            );
            await formData.append(
              "endDate",
              JSON.stringify(endDate.format("YYYY-MM-DD")),
            );

            await console.log(formData);

            const response = await BASE_API.patch(
              `/api/v1/admin/notice/${eventId}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
            ).then((res) => {
              if (res.status === 204) {
                alert("수정되었습니다.");
                setIsModalOpened(false);
                window.location.reload();
              }
            });
          }}
        >
          <styles.RegisterButtonText>팝업수정</styles.RegisterButtonText>
        </styles.RegisterButtonBox>
      </styles.ModalInBox>
    </styles.CustomModal>
  );
};
