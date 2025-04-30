
# Let's Connect - Tech Events Platform

Let's Connect is a platform for discovering and sharing tech events from universities and organizations worldwide. This application allows users to browse, filter, and submit tech events while providing admins with moderation capabilities.

![Let's Connect Platform](https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)

## 🚀 Features

- **Event Discovery**: Browse and search for tech events based on various criteria
- **Event Submission**: Submit new tech events to be shared with the community
- **User Authentication**: Sign up, log in, and manage your submitted events
- **Admin Dashboard**: Moderation tools for admins to approve or reject submitted events
- **Responsive Design**: Fully functional on both mobile and desktop devices

## 📋 Technologies Used

- React (with TypeScript)
- Vite
- Supabase (Authentication & Database)
- Tailwind CSS
- shadcn/ui Components
- React Router
- Tanstack React Query

## 🔧 Setup and Installation

## 💻 Project Structure

```
src/
├── components/      # Reusable UI components
├── context/         # React context for state management
├── hooks/           # Custom React hooks
├── integrations/    # External service integrations (Supabase)
├── lib/             # Utility functions and helpers
├── pages/           # Main page components
└── types/           # TypeScript type definitions
```

## 🌐 How to Use the Website

### For Visitors

1. **Browse Events**: On the homepage, scroll down to see upcoming events
2. **Filter Events**: Use the filter section to narrow events by type, college, date range or search for specific keywords
3. **View Event Details**: Click on any event card to see full details, including date, location, and description

### For Registered Users

1. **Sign Up/Login**: Click "Sign In" in the top navigation bar, and confirm the mail.
2. **Submit Events**: After logging in, use the "Add Event" button to submit a new tech event
3. **Track Your Submissions**: View your submitted events and their approval status in the "Your Events" section
4. **Sign Out**: Use the "Sign Out" button in the navigation bar when done

### For Admins

1. **Access Admin Panel**: Admins will see an "Admin" link in the navigation bar
2. **Moderate Events**: Review, approve, or reject submitted events
3. **Manage Content**: Update event details or remove inappropriate content

## 📝 Database Structure

The application uses Supabase with the following main tables:

- **profiles**: Stores user profile information
- **events**: Stores event details with approval status

## 🔒 Authentication

Authentication is handled via Supabase Auth with the following features:

- Email/Password authentication
- User role management (admin vs regular users)
- Protected routes for authenticated features

## 🛠️ Environment Variables

For local development or deployment, the following environment variables are required:

- Supabase URL and public anon key (handled by the project integration)

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

