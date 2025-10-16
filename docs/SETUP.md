# SETUP.md

# Setup Instructions for BNPB Chat Widget Integration

This document provides instructions on how to set up the BNPB Chat Widget integration project, including prerequisites and configuration steps.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 12 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [ngrok](https://ngrok.com/) (for exposing local servers)

## Project Setup

1. **Clone the Repository**:
   Clone the project repository to your local machine using the following command:
   ```
   git clone https://github.com/your-username/bnpb-chat-github-pages.git
   ```

2. **Navigate to the Project Directory**:
   Change into the project directory:
   ```
   cd bnpb-chat-github-pages
   ```

3. **Install Dependencies**:
   If there are any dependencies specified in `package.json`, install them using:
   ```
   npm install
   ```

4. **Run the Local Server**:
   You can use a simple HTTP server to serve the `public` directory. If you have `http-server` installed globally, you can run:
   ```
   npx http-server public
   ```
   Alternatively, you can use any other local server of your choice.

5. **Deploy to GitHub Pages**:
   - Push your project to a GitHub repository.
   - Ensure that the `.github/workflows/deploy.yml` workflow is set up correctly to deploy the `public` directory to GitHub Pages.

## Using ngrok

1. **Start Your Local Server**:
   Make sure your local server is running.

2. **Expose Your Local Server**:
   Open a new terminal window and run ngrok to expose your local server:
   ```
   ngrok http <port>
   ```
   Replace `<port>` with the port number your local server is running on (e.g., `8080`).

3. **Copy the ngrok URL**:
   After running the command, ngrok will provide you with a public URL. Copy this URL.

4. **Update URLs in Your Project**:
   Make sure to update any URLs in your project to point to the ngrok URL when testing locally.

5. **Test the Integration**:
   Open your browser and navigate to the ngrok URL to test the integration of the BNPB Chat Widget.

## Conclusion

You are now set up to test the BNPB Chat Widget integration both locally and on GitHub Pages. If you encounter any issues, please refer to the documentation or seek help from the community.