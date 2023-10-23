import styled from "styled-components";

export const FlexBox = styled.div`
  display: flex;
  margin-top: 2.6rem;
`;

export const SearchSelect = styled.select`
  width: 9.7rem;
  height: 3.2rem;
  flex-shrink: 0;

  margin-left: 2.3rem;

  font-size: 1.6rem;

  border: 1px solid #cdcbcb;
`;

export const SearchOption = styled.option``;

export const SearchButton = styled.button`
  position: relative;
  margin-left: 1.2rem;

  width: 7rem;
  height: 3.2rem;
  flex-shrink: 0;

  border-radius: 0.5rem;
  background: #02b878;

  color: #fff;
  text-align: center;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TableBox = styled.div`
  margin-top: 2.2rem;
  width: 150.1rem;
  height: 100%;

  display: flex;
  flex-direction: column;

  text-align: center;
  align-items: center;
`;

export const Table = styled.table`
  width: 100%;
`;

export const TableHeader = styled.thead`
  height: 4.6rem;

  background: #f3f3f3;
`;

export const Th = styled.th`
  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

export const TableBody = styled.tbody`
  width: 100%;
  //height: 100.5rem;
  color: #000;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  overflow-y: scroll;
`;

export const BodyTr = styled.tr`
  height: 5.5rem;

  border: 1px solid #cdcbcb;
  background: #fff;
`;

export const BodyTd = styled.td``;
