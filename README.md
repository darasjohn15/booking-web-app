## Book A Gig – Angular Frontend

---

## Project Overview

Book A Gig Web is the Angular frontend for Book A Gig, a full-stack performer booking platform that connects performers with event hosts to simplify event discovery, applications, and booking management.

This application provides separate user experiences for performers and hosts through role-based routing, responsive dashboards, and secure integration with the Book A Gig Flask REST API.

The project was built to strengthen my frontend engineering skills with Angular while demonstrating component-based architecture, client-side routing, REST API integration, and responsive user interface design.

---

## Architecture Diagrams / Screenshots

---

## Tech Stack

| Category         | Technology            |
| ---------------- | --------------------- |
| Framework        | Angular               |
| Language         | TypeScript            |
| Styling          | CSS                   |
| Routing          | Angular Router        |
| HTTP             | HttpClient            |
| Authentication   | JWT                   |
| State Management | Local Component State |

---

## Why This Teck Stack

| Technology     | Why I Chose It                                                        |
| -------------- | --------------------------------------------------------------------- |
| Angular        | Opinionated framework with a strong structure for large applications. |
| TypeScript     | Static typing improves maintainability and reduces runtime errors.    |
| Angular Router | Enables client-side navigation and role-based route protection.       |
| HttpClient     | Simplifies communication with the backend REST API.                   |
| CSS            | Lightweight styling with full control over the user interface.        |

---

## Engineering Decisions

### Feature-Based Organization

Application code is organized by business domain (authentication, host, performer) rather than by file type, making features easier to maintain and extend.

### Role-Based Routing

Separate routing logic ensures performers and hosts only access features relevant to their responsibilities.

### Reusable Components

Common UI elements are designed as reusable Angular components to reduce duplication and improve consistency.

### Service Layer

All API communication is centralized within Angular services, separating networking logic from presentation components.

### Responsive Design

Layouts were designed to provide a consistent experience across desktop and mobile devices.

---

## Features

### Authentication
- Login
- Session management
- Protected routes

### Performer Experience
- Browse available events
- Submit performer applications
- Track application status

### Host Experience
- Create and manage events
- Review performer applications
- Approve or reject applicants

### User Experience
- Responsive layouts
- Component-based interface
- REST API integration

---

## Project Structure

```text
src/
├── app/
│   ├── core/              → Global singleton services for shared UX behavior (e.g., notifications via snackbar)
│   ├── guards/
│   │   ├── auth/          → Route guards for authentication (login protection)
│   │   ├── role/          → Role-based access control (Performer vs Host)
│   ├── helpers/           → Utility functions and shared helper logic
│   ├── models/            → TypeScript interfaces and data models
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── components/ → Reusable UI pieces (forms, inputs, etc.)
│   │   │   ├── pages/      → Login, registration, and auth-related views
│   │   ├── host/
│   │   │   ├── components/ → Host-specific UI (event cards, application lists)
│   │   │   ├── pages/      → Dashboard, event management, application review
│   │   ├── performer/
│   │   │   ├── components/ → Performer UI (event listings, application UI)
│   │   │   ├── pages/      → Browse events, apply, track applications
│   └── services/          → API communication and business logic layer
├── assets/                → Static assets (images, icons, styles)
└── environments/          → Environment configuration (dev, prod)
```

---

## Getting Started

For local development instructions, go to the [Local Dev Setup](docs/local_dev_setup.md) guide.

---

## Roadmap

No upcoming features are planned right now.

---
