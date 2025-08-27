import api from "../axios";

export const reqRegisterCrewMember = (data) => api.post(`/api/members`, data);

export const reqGetCrewMembers = ({ page, size, crewId, searchText }) => {
  return api.get(`/api/members`, {
    params: { page, size, crewId, searchText },
  });
};

export const reqGetMemberCount = (crewId) => api.get(`/api/members/${crewId}/count`);

export const reqCrewMember = (data) => api.post('/api/members/exists', data);

export const reqGetMemberDetail = (memberId) => api.get(`/api/members/${memberId}`);

export const reqUpdateMemberRole = ({ memberId, roleId }) => api.put(`/api/members/${memberId}/role`, { memberId, roleId });

export const reqExpelMember = ({ memberId }) => api.delete(`/api/members/${memberId}`);

export const reqGetRoleId = ({ crewId, userId }) => {
  const cId = Number(
    typeof crewId === "object" ? (crewId?.crewId ?? crewId?.id) : crewId
  );
  const uId = Number(userId);
  if (!Number.isFinite(cId) || !Number.isFinite(uId)) {
    throw new Error(`invalid ids: crewId=${crewId}, userId=${userId}`);
  }
  return api.get(`/api/members/${cId}/${uId}`);
};