package com.korit.running_back_s2.security.model;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class PrincipalUtil {

    public PrincipalUser getPrincipalUser() {
        return (PrincipalUser) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/14-마이페이지-수정-기능-및-css-작업
