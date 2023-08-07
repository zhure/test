package com.zhure.animals.common;

import com.zhure.animals.entity.Admin;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        HttpSession session = request.getSession();
        String contextPath = session.getServletContext().getContextPath();
        String[] requireAuthPages = new String[]{
                "administration",
        };

        String uri = request.getRequestURI();

        uri = StringUtils.deleteAny(uri,contextPath+"/");
        String page = uri;

        if(beginWith(page, requireAuthPages)) {
            Admin admin = (Admin) session.getAttribute("admin");
            if(admin == null) {
                response.sendRedirect("/administration/login");
//                return false;
            }
        }
        return true;
    }

    private boolean beginWith(String page, String[] requireAuthpages) {
        for (String requiredAuthpage: requireAuthpages) {
            if (StringUtils.startsWithIgnoreCase(page, requiredAuthpage)) {
                return true;
            }
        }
        return false;
    }
}
