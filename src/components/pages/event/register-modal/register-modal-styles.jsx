import styled from "styled-components";
import { Modal } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export const CustomModal = styled(Modal)`
  position: absolute;

  width: 124.4rem;
  height: 81.3rem;

  margin: auto auto;

  outline: 0;
`;

export const ModalInBox = styled.div`
  width: 100%;
  height: 100%;

  padding-left: 10.9rem;
  padding-right: 10.9rem;
  padding-top: 6.4rem;
  background: #fff;
`;

export const CloseModalBox = styled.div`
  position: absolute;
  top: 1.7rem;
  left: 1.7rem;
`;

export const StartAndEndDateBox = styled.div`
  display: flex;
  gap: 3.4rem;
`;

export const DateBox = styled.div`
  width: 19.3rem;
  height: 8.6rem;
`;

export const DateTitle = styled.div`
  position: relative;
  width: 7.4rem;
  height: 2.4rem;

  color: #000;

  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const CustomDatePicker = styled(DatePicker)`
  & .MuiOutlinedInput-input {
    font-size: 1.5rem;
    padding: 0.5rem 0.5rem;
  }

  width: 100%;
  height: 5.5rem;

  color: #000;
`;

export const EventPageTitleBox = styled.div`
  width: 100%;
  height: 7.3rem;
`;
export const EventPageTitle = styled.div`
  color: #000;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const EventPageInput = styled.input`
  width: 100%;
  height: 4.1rem;

  margin-top: 0.8rem;

  border: 0;

  background: #f0f0f0;
  font-size: 2rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const EachImageBox = styled.div`
  width: 100%;
  height: 10.1rem;

  padding-top: 3.3rem;

  display: flex;
  flex-direction: column;

  gap: 1.2rem;
`;

export const EachImageTitle = styled.div`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const ImageBox = styled.div`
  display: flex;
  align-items: center;
`;

export const EachImageButton = styled.button`
  width: 9.3rem;
  height: 3.2rem;
  border-radius: 1.5rem;
  border: 1px solid #000;

  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const EachImageName = styled.div`
  height: 3.2rem;

  padding-top: 0.6rem;
  padding-left: 1.2rem;
  font-size: 2rem;
`;

export const EachImageInput = styled.input`
  display: none;
`;

export const RegisterButtonBox = styled.button`
  position: absolute;
  bottom: 3.4rem;
  left: 50.8rem;
  width: 25.6rem;
  height: 4.5rem;

  border-radius: 0.5rem;
  background: #02b878;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RegisterButtonText = styled.div`
  color: #fff;
  font-size: 1.8rem;
  font-weight: 400;
`;
