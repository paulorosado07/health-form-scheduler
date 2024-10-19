import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

def send_email(email, name):    
    smtp_server = "smtp.gmail.com"
    smtp_port = 587
    sender_email = "Your Gmail Here"
    receiver_email = email
    password = "Your Passwor Here"

    
    subject = "Thank You for Scheduling the Appointment"
    body = f"""
    Hi {name.title()},

    I hope this message finds you well! I wanted to take a moment to thank you for scheduling the appointment with Dr. John and Mary. I really appreciate your assistance in coordinating this.

    Looking forward to the meeting.

    Best regards,
    John & Mary
    """

    
    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = receiver_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    
    try:
        
        server = smtplib.SMTP(smtp_server, smtp_port)
        server.starttls()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, msg.as_string())
    except Exception as e:
        print(f"Error: {e}")
    finally:
        server.quit()
