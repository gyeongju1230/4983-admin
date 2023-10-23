import styled from "styled-components";
import Link from "next/link";

export const TopBarBox = styled.div`
  position: relative;
  width: 100%;
  height: 10.2rem;

  margin-bottom: 1.1rem;
  background: #fafafa;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TitleLink = styled(Link)`
  margin-left: 2.8rem;
  color: #02b878;
  text-align: center;
  font-size: 4rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;

export const TopBarEmail = styled.p`
  margin-right: 3.2rem;

  color: #ccc;
  text-align: center;
  font-size: 3rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
