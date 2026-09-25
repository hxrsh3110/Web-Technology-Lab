// ApexFit Studio OS - Event Loop Execution Order Demonstration
console.log("=== 1. Synchronous Code Block: Start of Script ===");

setTimeout(() => {
  console.log("=== 5. Timers Phase: setTimeout (0ms callback executed) ===");
}, 0);

setImmediate(() => {
  console.log("=== 6. Check Phase: setImmediate (I/O check cycle callback) ===");
});

Promise.resolve().then(() => {
  console.log("=== 3. Microtask Queue: Promise.then (Resolved immediately) ===");
});

process.nextTick(() => {
  console.log("=== 2. Microtask Queue (Highest Priority): process.nextTick ===");
});

console.log("=== 4. Synchronous Code Block: End of Script ===");
