## Overview

This is an AI-powered platform that helps students discover fully funded graduate opportunities and generate high-quality academic application documents such as CVs, Statements of Purpose (SOPs), and research proposals.

The system also supports opportunity tracking, application management, and personalized recommendations based on structured user profiles.

---

## Key Features

- User authentication and profile management
- AI-powered document generation (CVs, SOPs, research proposals)
- Opportunity discovery and filtering
- Personalized opportunity recommendations
- Application tracking system
- Saved opportunities/bookmarking
- Structured academic profile building

---

## System Architecture

The system follows a **client-server architecture** with a modular backend design.

### Backend

- Modular monolithic architecture
- Layered internal structure (controllers, services, repositories)
- RESTful API design
- PostgreSQL for structured data storage
- External LLM integration for AI features

### Frontend

- Component-based React/Next.js application
- Communicates with backend via REST APIs

---

## Core Modules

- Authentication Module
- Profile Management Module
- Opportunity Module
- Application Tracking Module
- AI Document Generation Module
- Recommendation Engine Module

---

## Architecture Decisions

- Modular monolith chosen for simplicity and scalability
- PostgreSQL chosen for structured relational data
- REST APIs for simplicity and broad compatibility
- External LLM APIs used for AI-powered features
- Layered architecture used for maintainability

---

## Tech Stack

### Frontend

- Next.js / React
- Tailwind CSS

### Backend

- Node.js (Express)
- REST APIs

### Database

- PostgreSQL

### AI

- External LLM APIs (prompt-engineered workflows)

---

## Project Goals

- Simplify access to global graduate opportunities
- Improve quality of student application materials
- Reduce friction in scholarship discovery and application processes
- Provide AI-assisted academic guidance

---

## Roadmap (High-Level)

- MVP: Authentication, profiles, opportunity browsing, AI document generation
- V1: Application tracking + saved opportunities
- V2: Recommendation engine + personalization
- V3: Analytics + optimization layer

---

## Status

Active development (MVP stage)

---

## Future Improvements

- Advanced recommendation engine
- Event-driven architecture for scaling AI workflows
- Asynchronous processing for document generation
- Improved personalization using behavioral data

<!-- TODO -->
[] - monitor user counts before signup
[] - Limit AI usage per user per day and per month
[] - Queue based notification system (emails)
[] - Message Broker (RabbitMQ)
[] - AI Chatbot to guide users, 
[] - Event based processing (Message broker - redis/rabitmq) on search of a particular kind of masters (use the event for notification/analytics/recommendation updates for the user)