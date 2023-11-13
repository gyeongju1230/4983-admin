import styled from "styled-components";
import Link from "next/link";

export const SideTabContainer = styled.div`
  position: absolute;
  width: 34.2rem;
  height: 100%;
`;

export const SectionBox = styled.div`
  position: relative;
  height: 13.6rem;
  margin-bottom: 1rem;
  background-color: #fff;

  display: flex;
  flex-direction: column;

  gap: 0.8rem;
  justify-content: center;

  padding-left: 2.2rem;
`;

export const SectionTitle = styled.p`
  color: #000;
  font-size: 2.4rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const SectionLink = styled(Link)`
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
`;
