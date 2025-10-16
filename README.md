# BNPB Chat Widget Integration Project

## Overview
This project demonstrates the integration of the BNPB chat widget into a website. It includes a main website and an isolated chat widget that can be embedded seamlessly. The project is designed to be deployed on GitHub Pages and can be tested locally using ngrok.

## Features
- Easy integration of the chat widget using iframe isolation.
- Responsive design that adapts to various screen sizes.
- Multi-language support for a broader audience.
- Real-time chat capabilities with the BNPB support team.
- Lightweight and fast performance, ensuring it does not slow down the main website.

## Project Structure
```
bnpb-chat-github-pages
├── public
│   ├── index.html                  # Main entry point of the website
│   ├── external-website-demo.html  # Demo for the external website with chat widget
│   └── assets
│       ├── css
│       │   └── styles.css          # Styles for the main website
│       └── js
│           └── widget-integration.js # JavaScript for chat widget integration
├── widget
│   ├── widget-iframe-isolated.html  # Isolated chat widget HTML
│   ├── css
│   │   └── widget-styles.css        # Styles for the chat widget
│   └── js
│       └── widget-logic.js          # Logic for the chat widget
├── docs
│   ├── SETUP.md                     # Setup instructions for the project
│   └── NGROK_GUIDE.md               # Guide for using ngrok
├── .github
│   └── workflows
│       └── deploy.yml               # GitHub Actions workflow for deployment
├── nginx.conf                       # Nginx server configuration
├── package.json                     # npm configuration and dependencies
└── README.md                        # Project overview and instructions
```

## Getting Started

### 1. Deploy to GitHub Pages
- Push your project to a GitHub repository.
- Ensure that the `.github/workflows/deploy.yml` workflow is set up correctly to deploy the `public` directory to GitHub Pages.

### 2. Use ngrok for Local Testing
- Install ngrok if you haven't already.
- Run your local server (e.g., using a simple HTTP server).
- Use ngrok to expose your local server by running:
  ```
  ngrok http <port>
  ```
  Replace `<port>` with the port your local server is running on.
- Copy the ngrok URL provided and use it to test the integration of the chat widget.

### Important Notes
- Make sure to update any URLs in your project to point to the ngrok URL when testing locally.
- Refer to the `docs/SETUP.md` for detailed setup instructions and `docs/NGROK_GUIDE.md` for using ngrok effectively.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.