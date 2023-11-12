import * as styles from "./ChatRoom.style";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_API } from "@/pages/api/baseApi";

export const ChatRoom = () => {
  const [buyerMessageList, setBuyerMessageList] = useState([]);
  const [sellerMessageList, setSellerMessageList] = useState([]);

  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    if (!router.isReady) return;
    let chatRoomId = router.query.chatRoomId ? router.query.chatRoomId : 0;

    BASE_API.get(`/api/v1/admin/chat/${chatRoomId}/buyer`).then((res) => {
      console.log(res.data);
      setBuyerMessageList(res.data);
    });

    BASE_API.get(`/api/v1/admin/chat/${chatRoomId}/seller`).then((res) => {
      console.log(res.data);
      setSellerMessageList(res.data);
    });
  }, [router.isReady]);

  return (
    <styles.Container>
      <styles.ChatListContainer>
        <styles.TitleDiv>
          <styles.Title>판매자 채팅창</styles.Title>
        </styles.TitleDiv>
        <styles.ChatListBox>
          {buyerMessageList.map((buyerMessage) => (
            <>
              <styles.MessageBox>
                {buyerMessage.message.split("\n").map((line) => (
                  <>
                    {line}
                    <br />
                  </>
                ))}
              </styles.MessageBox>
              <styles.TimeSpan>{buyerMessage.time.slice(0, 5)}</styles.TimeSpan>
            </>
          ))}
        </styles.ChatListBox>
        <styles.ChatInputContainer>
          <styles.ChatInputBox>
            <styles.ChatInput
              type="text"
              placeholder="메세지를 입력해주세요."
            />
            <styles.ChatButton>전송</styles.ChatButton>
          </styles.ChatInputBox>
        </styles.ChatInputContainer>
      </styles.ChatListContainer>
      <styles.ChatListContainer>
        <styles.TitleDiv>
          <styles.Title>구매자 채팅창</styles.Title>
        </styles.TitleDiv>
        <styles.ChatListBox>
          {sellerMessageList.map((sellerMessage) => (
            <>
              <styles.MessageBox>
                {sellerMessage.message.split("\n").map((line) => (
                  <>
                    {line}
                    <br />
                  </>
                ))}
              </styles.MessageBox>
              <styles.TimeSpan>
                {sellerMessage.time.slice(0, 5)}
              </styles.TimeSpan>
            </>
          ))}
        </styles.ChatListBox>
        <styles.ChatInputContainer>
          <styles.ChatInputBox>
            <styles.ChatInput
              type="text"
              placeholder="메세지를 입력해주세요."
            />
            <styles.ChatButton>전송</styles.ChatButton>
          </styles.ChatInputBox>
        </styles.ChatInputContainer>
      </styles.ChatListContainer>
    </styles.Container>
  );
};
