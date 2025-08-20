import api from "../axios";

// Member 승인
export const reqRegisterCrewMember = (data) => api.post(`/api/members`, data);

export const reqGetCrewMembers = ({ page, size, crewId, searchText }) => {
  return api.get(`/api/members`, {
    params: { page, size, crewId, searchText },
  });
};

export const reqCrewMember = (userId) => api.get(`/api/members/${userId}/find`);

export const reqGetMemberDetail = (memberId) => api.get(`/api/members/${memberId}`);

export const reqUpdateMemberRole = ({ memberId, roleId }) => api.put(`/api/members/${memberId}/role`, {memberId, roleId});

export const reqExpelMember = (memberId) => api.delete(`/api/members/${memberId}`);