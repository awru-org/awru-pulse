import createApp from './app';
import config from './config';
import { prisma } from './lib/prisma';
// import sendTelegramMessage from './modules/telegram/telegram.service';

const app = createApp();

const server = app.listen(config.port, async () => {
  await prisma.$connect();
  console.log(`✅ Database connected`);


  // await sendTelegramMessage('This is my first message is telegram bot!');
  // await sendTelegramMessage('Emain send for PH teem');
  // await sendTelegramMessage('<b>Emain</b> send for <b>PUN</b> group');


  console.log(`   Environment : ${config.node_env}`);
  console.log(`   Port        : ${config.port}`);
  console.log(`   API base    : http://localhost:${config.port}/api/v1\n`);
});

// ── Graceful shutdown ──────────────────────────────────────────────────────────

function gracefulShutdown(signal: string): void {
  console.log(`\n[${signal}] Shutting down gracefully...`);
  server.close(() => {
    console.log('HTTP server closed.');
    process.exit(0);
  });

  // Force shutdown after 10 s if connections don't close naturally
  setTimeout(() => {
    console.error('Forcing shutdown after timeout.');
    process.exit(1);
  }, 10_000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ── Unhandled rejections ───────────────────────────────────────────────────────

process.on('unhandledRejection', (reason: unknown) => {
  console.error('[UnhandledRejection]', reason);
  gracefulShutdown('UnhandledRejection');
});

process.on('uncaughtException', (error: Error) => {
  console.error('[UncaughtException]', error);
  gracefulShutdown('UncaughtException');
});

export default server;
