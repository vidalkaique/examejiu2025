# NA GUARDA JJ - Jiu-Jitsu Academy Registration System

## Overview

This is a web application for NA GUARDA JJ, a Jiu-Jitsu academy located in Xique-xique/BA, Brazil. The application serves as a promotional website and registration system for the academy's 2025 belt examination. It features a mobile-first design showcasing the academy, instructor profiles, student galleries, and provides a registration form for new students. The site includes WhatsApp integration for direct communication and payment processing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript running on Vite
- **UI Library**: Shadcn/ui components with Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design tokens and responsive mobile-first approach
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Hook Form for form handling with Zod validation, TanStack Query for server state management
- **Build Tool**: Vite with React plugin and custom aliases for clean imports

### Backend Architecture  
- **Runtime**: Node.js with Express.js server
- **API Design**: RESTful API with endpoints for registration management
- **Request Handling**: Express middleware for JSON parsing, URL encoding, and request logging
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Development**: Hot module replacement via Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL configured via Drizzle ORM with type-safe schema definitions
- **Schema Management**: Drizzle Kit for database migrations and schema synchronization
- **Fallback Storage**: In-memory storage implementation for development/testing scenarios
- **Data Validation**: Zod schemas for runtime type checking and validation

### Authentication and Authorization
- **Current State**: No authentication system implemented
- **Session Management**: Connect-pg-simple package available for PostgreSQL session storage if needed
- **Security**: Basic request validation and error handling in place

### External Dependencies
- **Database Provider**: Neon Database (PostgreSQL-compatible serverless database)
- **Hosting Platform**: Replit with integrated development environment
- **Communication**: WhatsApp integration for customer contact and payment processing
- **Assets**: External image hosting via Unsplash for placeholder content
- **Typography**: Google Fonts (Inter) for consistent typography
- **Icons**: Font Awesome and Lucide React for iconography