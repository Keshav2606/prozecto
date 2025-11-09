# Email Setup Instructions

## Gmail Configuration

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update .env file**:
   ```
   EMAIL_USER=your_gmail@gmail.com
   EMAIL_PASS=your_16_digit_app_password
   ```

## Current Setup
- Emails will be sent TO: `prozecto90@gmail.com`
- Emails will be sent FROM: user's email address
- Subject: "New Contact Form Message - Prozecto"

## Test the Setup
1. Update EMAIL_USER and EMAIL_PASS in .env
2. Restart the server
3. Submit contact form from frontend
4. Check prozecto90@gmail.com inbox