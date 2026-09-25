// ApexFit Studio OS - Native HTTP Server & File System (fs) Demo
import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';

const PORT = 4000;
const LOG_FILE = path.resolve('training_session.log');

const server = http.createServer(async (req, res) => {
  const timestamp = new Date().toISOString();

  // Route 1: Status & Telemetry
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      system: 'ApexFit Native Node Core',
      status: 'Operational',
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsageMB: (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
    }));
  } 
  // Route 2: Append Log Entry via File System (fs)
  else if (req.url === '/log-workout' && req.method === 'POST') {
    const logEntry = `[${timestamp}] EVENT: Athlete Harsh Bankar completed 5x3 Squat @ 140kg\n`;
    
    try {
      await fs.appendFile(LOG_FILE, logEntry, 'utf8');
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, message: 'Session logged to disk via fs module.' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: false, error: err.message }));
    }
  } 
  // Route 3: Read Log File from Disk
  else if (req.url === '/read-logs' && req.method === 'GET') {
    try {
      const data = await fs.readFile(LOG_FILE, 'utf8');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(data);
    } catch (err) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'No logs recorded yet. Send POST to /log-workout first.' }));
    }
  } 
  // Fallback 404
  else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

server.listen(PORT, () => {
  console.log(`⚡ ApexFit Native HTTP Server listening on http://localhost:${PORT}`);
});
