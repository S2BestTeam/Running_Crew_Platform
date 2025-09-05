import { css } from "@emotion/react";

export const container = css`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 3rem;
  box-sizing: border-box;
  font-size: 3rem;
`;

export const searchBox = css`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

export const searchInput = css`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1.6rem;
`;

export const searchButton = css`
  padding: 0.8rem 2rem;
  background: #000000ff;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 1.6rem;
  &:hover {
    background: gray;
  }
`;

export const tableWrapper = css`
  flex: 1;
  overflow-y: auto;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
`;

export const table = css`
  width: 100%;
  border-collapse: collapse;
  min-width: 800px;
  font-size: 1.6rem;

  thead {
    position: sticky;
    top: 0;
    background: #f8f9fa;
    z-index: 1;
  }

  th {
    padding: 1rem;
    font-weight: 600;
    color: #333;
    border-bottom: 2px solid #dee2e6;
    text-align: center;
    font-size: 1.6rem;
  }

  td {
    padding: 1rem;
    color: #555;
    border-bottom: 1px solid #f1f3f5;
    text-align: center;
    line-height: 1.5; /* 행 간격 여유 */
  }

  tr:hover td {
    background: #b9b9b9ff;
  }
`;

export const thumbnail = css`
  width: 70px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
  background: #f0f0f0;
`;

export const detailButton = css`
  padding: 0.6rem 1.6rem;
  cursor: pointer;
  font-weight: 500;
  border: none;
  border-radius: 6px;
  background-color: black;
  color: white;
`;

export const paginationWrapper = css`
  margin-top: 1rem;
  text-align: center;
  flex-shrink: 0;
  font-size: 1.1rem;
`;

export const overlay = css`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  z-index: 9999;
`;

export const modal = css`
  background: #fff;
  border-radius: 0.8rem;
  width: 80%;
  max-width: 1200px;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 1.6rem; /* SearchCrew와 비슷한 크기 */
`;

export const header = css`
  padding: 2rem;
  border-bottom: 1px solid #eee;
`;

export const headerTop = css`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

export const crewThumbnail = css`
  width: 6rem;
  height: 6rem;
  object-fit: cover;
  border-radius: 0.8rem;
  background-color: #f5f5f5;
`;

export const crewTitleBox = css`
  h3 {
    margin: 0;
    font-size: 1.8rem;
    color: #333;
  }
  p {
    margin: 0.5rem 0 0 0;
    font-size: 1.4rem;
    color: #666;
  }
`;

export const crewMeta = css`
  font-size: 1.4rem;
  color: #555;
  line-height: 1.4;
  span + span::before {
    content: " | ";
  }
`;

export const tabs = css`
  display: flex;
  border-bottom: 1px solid #ddd;
  background-color: #f8f9fa;
`;

export const tab = (active) => css`
  flex: 1;
  text-align: center;
  padding: 1.2rem 0.8rem;
  cursor: pointer;
  font-size: 1.4rem;
  font-weight: ${active ? 600 : "normal"};
  color: ${active ? "#007bff" : "#666"};
  border-bottom: ${active ? "0.2rem solid #007bff" : "none"};
  background-color: ${active ? "#fff" : "transparent"};
`;

export const content = css`
  padding: 2rem;
  overflow-y: auto;
  flex: 1;
`;

export const footer = css`
  padding: 1.5rem 2rem;
  border-top: 1px solid #eee;
  text-align: right;
`;

export const closeBtn = css`
  padding: 0.8rem 2rem;
  border-radius: 0.4rem;
  border: none;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 1.4rem;
  &:hover {
    background: #0056b3;
  }
`;
