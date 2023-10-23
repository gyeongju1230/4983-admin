import * as styles from "@/components/common/side-tab/SideTab.style";

export const SideTab = () => {
  return (
    <styles.SideTabContainer>
      <styles.SectionBox>
        <styles.SectionTitle>회원 관리</styles.SectionTitle>
        <styles.SectionLink href="/member-info">
          회원 정보 관리
        </styles.SectionLink>
        <styles.SectionLink href="/block-member-info">
          차단 회원 목록
        </styles.SectionLink>
      </styles.SectionBox>
      <styles.SectionBox>
        <styles.SectionTitle>판매 관리</styles.SectionTitle>
        <styles.SectionLink href="/sales-post">
          전체 판매글 목록
        </styles.SectionLink>
      </styles.SectionBox>
      <styles.SectionBox>
        <styles.SectionTitle>거래 관리</styles.SectionTitle>
        <styles.SectionLink href="/chats">전체 채팅 목록</styles.SectionLink>
        <styles.SectionLink href="/locker">사물함 사용 현황</styles.SectionLink>
      </styles.SectionBox>
      <styles.SectionBox>
        <styles.SectionTitle>수수료 관리</styles.SectionTitle>
        <styles.SectionLink href="/test">수수료 지표</styles.SectionLink>
      </styles.SectionBox>
      <styles.SectionBox>
        <styles.SectionTitle>알람 기능</styles.SectionTitle>
        <styles.SectionLink href="/test">이벤트 페이지 목록</styles.SectionLink>
        <styles.SectionLink href="/test">
          회원 푸쉬 알람 목록
        </styles.SectionLink>
      </styles.SectionBox>
      <styles.SectionBox>
        <styles.SectionTitle>이슈 관리</styles.SectionTitle>
        <styles.SectionLink href="/test">
          문의 및 신고사항 목록
        </styles.SectionLink>
        <styles.SectionLink href="/test">
          자주 문는 질문 목록
        </styles.SectionLink>
      </styles.SectionBox>
    </styles.SideTabContainer>
  );
};
