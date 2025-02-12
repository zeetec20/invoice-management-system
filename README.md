# Invoice Hub

<div align="center">
<img src="https://invoiceshub.vercel.app/mockup.jpeg" style="border-radius: 10px;">
</div>

## Description

A invoice hub, platform for manage invoices

## Features

- **Next.js 15**: Utilizing the latest features including App Router and Server Components
- **TypeScript**: Full type safety across the entire application
- **Material UI**: Modern react component for building ui
- **React Hook Form**: Library for form handling in react using hooks
- **Zod**: Library for validating data structures with strong type

## Prerequisites

Before you begin, ensure you have the following installed:
- node.js (v20.10.0 or higher)
- npm (v10.2.3 or higher)
- git

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/zeetec20/invoice-management-system.git
cd invoice-management-system
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── public
└── src
    ├── app
    │   └── invoices
    │       ├── add
    │       └── list
    ├── components
    ├── constants
    ├── hooks
    ├── lib
    │   ├── schema
    │   └── types
    └── utils
```

## Available Scripts

- `npm run dev` - Run development server
- `npm run build` - Build production bundle
- `npm start` - Start production server

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request
