/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Email configuration - replace with your Gmail
const emailConfig = {
    service: 'gmail',
    auth: {
        user: 'vanderweertt@gmail.com', // Replace with your actual Gmail addressil
        pass: 'zmcn idec pjlq eezn' // Paste your app password here
    }
};

const transporter = nodemailer.createTransport(emailConfig);

exports.sendChatNotification = functions.database.ref('/messages/{messageId}')
    .onCreate(async (snapshot, context) => {
        const message = snapshot.val();
        const db = admin.database();

        try {
            console.log('Processing new message:', message);
            
            // Get sender info
            const senderRef = await db.ref(`users/${message.uid}`).once('value');
            const sender = senderRef.val();

            // Get all users
            const usersRef = await db.ref('users').once('value');
            const users = usersRef.val();

            // Prepare email content
            const mailOptions = {
                from: 'I.N IT RUNNING <YOUR_GMAIL@gmail.com>',
                subject: 'New Chat Message',
                html: `
                    <div style="background: #1f1f1f; color: white; padding: 20px; border-radius: 8px;">
                        <h2>New Message from ${sender.displayName}</h2>
                        <p>${message.text}</p>
                        <p style="color: #999;">Sent at: ${new Date(message.timestamp).toLocaleString()}</p>
                        <hr style="border: 1px solid #333;">
                        <p>Click below to view the conversation:</p>
                        <a href="https://your-website.com/groupChat.html" 
                           style="background: #4285f4; color: white; padding: 10px 20px; 
                                  text-decoration: none; border-radius: 5px; display: inline-block;">
                            Open Chat
                        </a>
                    </div>
                `
            };

            // Send emails to all users except sender
            const emailPromises = Object.entries(users)
                .filter(([uid]) => uid !== message.uid)
                .map(([_, user]) => {
                    const userMail = { ...mailOptions, to: user.email };
                    return transporter.sendMail(userMail);
                });

            await Promise.all(emailPromises);
            console.log('Notification emails sent successfully');

        } catch (error) {
            console.error('Error sending notifications:', error);
        }
    });
