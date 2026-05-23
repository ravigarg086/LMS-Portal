---
description: Technical skills and code patterns for implementing multi-role JWT authentication and data-view guards
globs: client/src/modules/signin/**/*
alwaysApply: false
---

# Technical Skills: Secure Multi-Role Authentication & Access Control

## 1. Context-Driven Role Distribution
- Save the authenticated user's profile metadata and permissions globally using a secure React Context provider (`AuthContext`).
- The user session object must expose identity details and the designated access tier: 
```ts
  interface UserSession {
    userId: string;
    role: 'student' | 'faculty' | 'admin';
    token: string;
  }