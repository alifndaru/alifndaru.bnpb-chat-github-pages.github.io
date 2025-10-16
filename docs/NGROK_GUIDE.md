# NGROK_GUIDE.md

# Ngrok Guide for BNPB Chat Widget Integration

This guide provides instructions on how to use ngrok to expose your local server to the internet, allowing for testing of the BNPB chat widget integration on GitHub Pages.

## Prerequisites

- Ensure you have a local server running your project (e.g., using a simple HTTP server).
- Install ngrok if you haven't already. You can download it from [ngrok.com](https://ngrok.com/download).

## Steps to Use Ngrok

1. **Run Your Local Server**:
   - Start your local server. If you are using a simple HTTP server, you can run:
     ```
     npx http-server public -p <port>
     ```
     Replace `<port>` with the port number you want to use (e.g., 8080).

2. **Expose Your Local Server with Ngrok**:
   - Open a new terminal window and navigate to the directory where ngrok is installed.
   - Run the following command to expose your local server:
     ```
     ngrok http <port>
     ```
     Replace `<port>` with the port number your local server is running on.

3. **Copy the Ngrok URL**:
   - After running the ngrok command, you will see output in the terminal that includes a forwarding URL (e.g., `http://<random_subdomain>.ngrok.io`).
   - Copy this URL as you will use it to test the integration.

4. **Update Your Project URLs**:
   - In your project files, update any URLs that point to your local server to use the ngrok URL instead. This includes the chat widget iframe source and any API endpoints.

5. **Test the Integration**:
   - Open your browser and navigate to the ngrok URL you copied.
   - Test the BNPB chat widget integration to ensure it works as expected.

## Notes

- Ngrok provides a temporary URL that changes every time you start it. If you need a persistent URL, consider signing up for a paid ngrok account.
- Make sure to check the ngrok dashboard for any connection logs or errors if you encounter issues during testing.

By following these steps, you can effectively test the BNPB chat widget integration using ngrok and ensure that it works seamlessly when deployed to GitHub Pages.