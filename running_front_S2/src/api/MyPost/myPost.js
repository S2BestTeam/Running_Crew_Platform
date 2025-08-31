import  api  from "../axios";

export const reqGetMyPosts = ({ page = 1, size = 10, searchText = "", src = "", crewId = "" }) => 
    api.get(`/api/mypage/posts`, {params: {page, size, searchText, src, crewId },});
