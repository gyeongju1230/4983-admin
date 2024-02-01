import Image from "next/image";
import dayjs from "dayjs";
import * as styles from "@/components/pages/event/register-modal/register-modal-styles";
import { useRef, useState } from "react";
import { BASE_API } from "@/pages/api/baseApi";
export const RegisterModal = ({
  isModalOpened,
  setIsModalOpened,
  mainBannerImage,
  eventBannerImage,
  eventWindowImage,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  title,
  setTitle,
}) => {
  const [mainBannerText, setMainBannerText] = useState("");
  const [eventBannerText, setEventBannerText] = useState("");
  const [eventWindowText, setEventWindowText] = useState("");

  return (
    <styles.CustomModal open={isModalOpened}>
      <styles.ModalInBox>
        <styles.CloseModalBox
          onClick={() => {
            setTitle("");
            setIsModalOpened(false);
          }}
        >
          <Image
            src={require("@/images/close-modal.png")}
            alt={"x"}
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
                console.log(eventWindowInput.files.length);
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
            console.log(mainBannerImage.current.files[0]);

            const formData = new FormData();
            await formData.append("mainFile", mainBannerImage.current.files[0]);
            await formData.append(
              "noticeFile",
              eventBannerImage.current.files[0],
            );
            await formData.append(
              "noticeWindowFile",
              eventWindowImage.current.files[0],
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

            const response = await BASE_API.post(
              "/api/v1/admin/notice",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              },
            ).then((res) => {
              // if (res.status === 204) {
              //   alert("등록되었습니다.");
              //   setIsModalOpened(false);
              //   window.location.reload();
              // }
            });

            console.log(response);
          }}
        >
          <styles.RegisterButtonText>팝업등록</styles.RegisterButtonText>
        </styles.RegisterButtonBox>
      </styles.ModalInBox>
    </styles.CustomModal>
  );
};
