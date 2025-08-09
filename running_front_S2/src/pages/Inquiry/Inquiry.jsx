import { useNavigate } from 'react-router-dom';
import usePrincipalQuery from '../../queries/usePrincipalQuery';
import AdminInquiry from './Admin/AdminInquiry';
import CrewInquiry from './Crew/CrewInquiry';
import { useEffect } from 'react';

function Inquiry(props) {
  const navigate = useNavigate();
  const principalQuery = usePrincipalQuery();
  const roleCheck = principalQuery?.data?.data?.body?.user.roleId;

  useEffect(() => {
    if (roleCheck === undefined) {
      return <h3>권한이 없습니다</h3>;
    } 
    else if (roleCheck === 1) {
      navigate("/inquiry/admin");
    } else {
      navigate("/inquiry/crew");
    }
  }, [roleCheck]);

}

export default Inquiry;