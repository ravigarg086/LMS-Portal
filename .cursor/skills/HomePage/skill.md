---
description: Technical skills and stack guidelines for React and Bootstrap development
globs: client/src/**/*
alwaysApply: true
---

# React & Bootstrap Development Standards

## Project Initialization
- When initializing a new React application, **always use `npx create-react-app`**.

## Module Structure
- Place feature code under `client/src/modules/<feature>/` with co-located components, data, hooks, and styles.
- Export module entry points from each module's `index.js`.
