import api from "../axios"

// user
export const reqSearchUsers = ({page, size, searchText}) => api.get("/api/admin/users", {
  params: { page, size, searchText }
});


// crew
export const reqSearchCrews = ({page, size, searchText}) => api.get("/api/admin/crews", {
  params: { page, size, searchText }
});

