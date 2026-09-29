export default function welcomeEmail(fullName) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Welcome to MyChat</title>
<style>
* {
    box-sizing: border-box;
}
body {
    margin: 0;
    padding: 0;
    background: #e2e8f0;
    font-family: Arial, Helvetica, sans-serif;
    color: #0f172a;
}
.wrapper {
    width: 100%;
    padding: 50px 15px;
}
.container {
    max-width: 620px;
    margin: auto;
    background: #ffffff;
    border: 1px solid #cbd5e1;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
}
.header {
    padding: 45px 35px;
    text-align: center;
    background: linear-gradient(135deg, #4f46e5, #7c3aed);
    color: #ffffff;
}
.logo {
    width: 65px;
    height: 65px;
    margin: auto;
    border-radius: 18px;
    background: rgba(255, 255, 255, 0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: bold;
}
.header h1 {
    margin: 22px 0 8px;
    font-size: 30px;
}
.header p {
    margin: 0;
    font-size: 15px;
    opacity: 0.9;
}
.content {
    padding: 45px 40px;
}
.greeting {
    font-size: 26px;
    margin: 0 0 15px;
}
.text {
    color: #64748b;
    font-size: 16px;
    line-height: 1.8;
    margin: 0 0 25px;
}
.highlight {
    padding: 20px;
    margin: 30px 0;
    border-radius: 16px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
}
.highlight-title {
    margin: 0 0 8px;
    font-size: 16px;
    font-weight: bold;
}
.highlight-text {
    margin: 0;
    color: #64748b;
    font-size: 14px;
    line-height: 1.6;
}
.button-wrapper {
    text-align: center;
    margin: 35px 0;
}
.button {
    display: inline-block;
    padding: 16px 32px;
    border-radius: 12px;
    background: #4f46e5;
    color: #ffffff !important;
    text-decoration: none;
    font-size: 15px;
    font-weight: bold;
}
.features {
    margin-top: 35px;
}
.feature {
    padding: 18px 0;
    border-bottom: 1px solid #e2e8f0;
}
.feature:last-child {
    border-bottom: none;
}
.feature-icon {
    display: inline-block;
    width: 42px;
    height: 42px;
    line-height: 42px;
    text-align: center;
    border-radius: 12px;
    background: #eef2ff;
    font-size: 20px;
    vertical-align: middle;
}
.feature-content {
    display: inline-block;
    margin-left: 12px;
    vertical-align: middle;
}
.feature-title {
    margin: 0 0 4px;
    font-size: 15px;
    font-weight: bold;
}
.feature-text {
    margin: 0;
    color: #64748b;
    font-size: 13px;
}
.divider {
    height: 1px;
    background: #e2e8f0;
    margin: 35px 0;
}
.footer {
    padding: 30px 40px;
    text-align: center;
    background: #f8fafc;
    border-top: 1px solid #e2e8f0;
}
.footer-logo {
    font-size: 18px;
    font-weight: bold;
    color: #4f46e5;
    margin-bottom: 10px;
}
.footer p {
    margin: 5px 0;
    color: #94a3b8;
    font-size: 12px;
    line-height: 1.6;
}
.social {
    margin: 20px 0;
}
.flex {
    display:flex;
}
.center {
    justify-content:center;
    align-items:center;
}
.social a {
    display: inline-block;
    margin: 0 5px;
    color: #64748b;
    text-decoration: none;
    font-size: 13px;
}
@media only screen and (max-width: 600px) {
    .wrapper {
        padding: 20px 10px;
    }
    .header {
        padding: 35px 20px;
    }
    .header h1 {
        font-size: 25px;
    }
    .content {
        padding: 35px 22px;
    }
    .greeting {
        font-size: 23px;
    }
    .footer {
        padding: 25px 20px;
    }
}
</style>
</head>
<body>
<div class="wrapper">
<div class="container">
<div class="header">
<div class="logo flex center">💬</div>
<h1>Welcome to MyChat</h1>
<p>Your conversations, your connections.</p>
</div>
<div class="content">
<h2 class="greeting">Hey ${fullName}! 👋</h2>
<p class="text">We're really happy to have you here. Your MyChat account has been successfully created and you're officially part of our community.</p>
<div class="highlight">
<p class="highlight-title">🎉 Your account is ready</p>
<p class="highlight-text">Everything is set up and ready for you. Start conversations, connect with people, and enjoy your experience with MyChat.</p>
</div>
<div class="button-wrapper">
<a href="#" class="button">Start Chatting →</a>
</div>
<div class="features">
<div class="feature">
<span class="feature-icon">💬</span>
<div class="feature-content">
<p class="feature-title">Real-time conversations</p>
<p class="feature-text">Stay connected and chat with others instantly.</p>
</div>
</div>
<div class="feature">
<span class="feature-icon">🔒</span>
<div class="feature-content">
<p class="feature-title">Your privacy matters</p>
<p class="feature-text">Your account and conversations are protected.</p>
</div>
</div>
<div class="feature">
<span class="feature-icon">⚡</span>
<div class="feature-content">
<p class="feature-title">Fast and simple</p>
<p class="feature-text">A clean experience designed to keep things simple.</p>
</div>
</div>
</div>
<div class="divider"></div>
<p class="text">Thanks for joining us, ${fullName}. We hope you enjoy using MyChat as much as we enjoyed building it.</p>
<p class="text">See you inside! 🚀</p>
</div>
<div class="footer">
<div class="footer-logo">MyChat</div>
<div class="social">
<a href="#">Website</a>
<a href="#">Support</a>
<a href="#">Privacy</a>
</div>
<p>© 2026 MyChat. All rights reserved.</p>
<p>You received this email because an account was created using this email address.</p>
</div>
</div>
</div>
</body>
</html>
`;
}