package com.javaguides.springboot;

import jakarta.servlet.*;

import java.io.IOException;

public interface CorsFilter1 {
    void init(FilterConfig filterConfig) throws ServletException;

    void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException;

    void destroy();
}
