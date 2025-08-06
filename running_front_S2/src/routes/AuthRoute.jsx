import { useQueryClient } from '@tanstack/react-query';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function AuthRoute(props) {
    return (
          <Routes>

            <Route path="/oauth2/login" element={<OAuth2Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

function OAuth2Login() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        const accessToken = searchParams.get("accessToken");
        if (!!accessToken) {
            localStorage.setItem("AccessToken", `Bearer ${accessToken}`);
            queryClient
                .invalidateQueries({
                    queryKey: ["principal"],
                })
                .then(() => {
                    navigate("/");
                });
        } else{
            navigate("/");
        }
    }, []);
    return <></>;
}

export default AuthRoute;