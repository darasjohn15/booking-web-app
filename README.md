## Book A Gig – Angular Frontend

The Angular frontend for **Book A Gig**, a performer booking platform that connects artists with event hosts. This application provides a responsive, role-based user interface for managing events, applications, and bookings.

Built with a focus on clean UI/UX, component-driven architecture, and scalability.

---

## Features

### Authentication & User Experience
- Login and session handling
- Role-based UI (Performer vs Host)
- Conditional routing and protected views

### Performer Experience
- Browse available events
- Submit applications to perform
- Track application status

### Host Dashboard
- Create and manage events
- View incoming applications
- Approve or reject performers

### UI/UX Design
- Responsive layout for desktop and mobile
- Clean, modern dashboard interface
- Component-based design for reusability

---

## Project Structure (Angular)

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

## Tech Stack

- **Framework**: Angular  
- **Language**: TypeScript  
- **Styling**: CSS  
- **State Management**: Local component state (expandable)  
- **API Communication**: HTTPClient (REST)

---

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- Angular CLI

### Installation

```bash
# Clone the repo
git clone https://github.com/darasjohn15/booking-web-app.git

# Navigate to project
cd booking-web-app

# Install dependencies
npm install

# Run the App
ng serve
```
Visit ```http://localhost:4200```
