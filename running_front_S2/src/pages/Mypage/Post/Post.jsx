import React from 'react';

function Post(props) {
    const principal = usePrincipalQuery();
  const userId = principal?.data?.data?.body?.user?.userId;
    return (
        <div>
            hi
        </div>
    );
}

export default Post;