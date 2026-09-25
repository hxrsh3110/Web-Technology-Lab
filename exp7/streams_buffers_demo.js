// ApexFit Studio OS - Buffers, Streams, and Piping Demonstration
import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';

console.log("--- PART A: Raw Memory Buffers ---");

// 1. Allocate a raw memory buffer of 16 bytes
const buf = Buffer.alloc(16);
buf.write("ApexFit OS");
console.log("Allocated Buffer (Hex):", buf);
console.log("Decoded String Content:", buf.toString('utf8'));
console.log("Buffer Byte Length:", buf.length);

// 2. Buffer from JSON-like biometric payload
const telemetryBuffer = Buffer.from(JSON.stringify({ athlete: "Harsh", loadKg: 140 }));
console.log("Telemetry Buffer (JSON converted):", telemetryBuffer);
console.log("Telemetry Decoded:", telemetryBuffer.toString('utf8'));

console.log("\n--- PART B: Readable & Writable Streams with Piping ---");

const sourceFile = path.resolve('volume_data_source.txt');
const destFile = path.resolve('volume_data_archive.txt');

// Seed a source file with workout dataset
const workoutData = "Set 1: 140kg x 3 reps\nSet 2: 140kg x 3 reps\nSet 3: 140kg x 3 reps\nSet 4: 140kg x 3 reps\nSet 5: 140kg x 3 reps\n";
fs.writeFileSync(sourceFile, workoutData, 'utf8');
console.log("Source data written successfully.");

// Create streams
const readableStream = fs.createReadStream(sourceFile, { encoding: 'utf8', highWaterMark: 32 });
const writableStream = fs.createWriteStream(destFile);

readableStream.on('data', (chunk) => {
  console.log(`[Stream Event] Read Chunk (${chunk.length} bytes): \n--> ${chunk.trim()}`);
});

readableStream.on('end', () => {
  console.log("[Stream Event] Finished reading stream.");
});

// Pipe readable stream directly into writable stream
readableStream.pipe(writableStream);
writableStream.on('finish', () => {
  console.log("✅ Data successfully piped from source to archive file!");
});