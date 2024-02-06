import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10rem;
`;

export const ChatListBox = styled.div`
  position: relative;
  top: -3rem;
  width: 37.5rem;
  height: 70rem;
  border: 0.4rem solid #d9d9d9;
  overflow-y: scroll;
`;

export const ChatInputContainer = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 37.5rem;
  height: 6.2rem;
  bottom: -6.2rem;
  background: var(--b-10, #f6f6f6);
  overflow-y: hidden;
  z-index: 1000;
`;

export const ChatInputBox = styled.div`
  width: 36rem;
  height: 4rem;
`;
export const ChatInput = styled.input`
  width: 29.1rem;
  height: 4rem;
  border: none;
  display: inline-flex;
  padding: 0.8rem 10rem 0.8rem 1.2rem;
  align-items: center;
  border-radius: 0.8rem;
  background: var(--b-00, #fff);
  color: var(--b-80, #414141);
  font-size: 1.6rem;
  font-weight: 400;
  line-height: 2.4rem;

  &::placeholder {
    color: var(--b-50, #d1d1d1);
    font-size: 1.6rem;
    font-weight: 400;
    line-height: 2.4rem;
  }
`;

export const ChatButton = styled.button`
  width: 6.2rem;
  height: 4rem;
  border-radius: 0.5rem;
  margin-left: 0.7rem;
  background: #02b878;

  color: #fff;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 400;
`;

export const ChatListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const MessageBox = styled.div`
  width: 27rem;
  height: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  top: 3rem;
  margin-top: -2rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
  padding: 1.2rem 1.7rem;
  border-radius: 0.8rem;
  background: #f6f6f6;

  color: var(--b-80, #414141);
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: 2rem;
`;

export const TimeSpan = styled.span`
  position: relative;
  top: -1rem;
  width: 2rem;
  z-index: 1000;
  left: 29rem;
  color: var(--b-60, #8f8f8f);
  font-size: 1.2rem;
  font-weight: 400;
  line-height: 1.6rem;
`;
export const TitleDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 5.2rem;
  top: 0;
  background: var(--b-00, #fff);
  background-color: #fff;

  z-index: 10000;
`;

export const Title = styled.a`
  position: absolute;
  width: 11rem;
  height: 3.4rem;
  color: #000;
  font-size: 2rem;
  font-weight: 700;
`;
