// ApexFit Studio OS - Experiment 2 ES6 Engine

document.addEventListener("DOMContentLoaded", () => {
  // 1. Display Current Date (Syllabus Item)
  const displayCurrentDate = () => {
    const now = new Date();
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById("currentDateDisplay").textContent = now.toLocaleDateString('en-IN', options);
  };
  displayCurrentDate();

  // 2. Training Packages Dataset (ES6 Array Manipulation)
  const packages = [
    { id: 101, name: "Foundation Strength", sessions: 12, pricePerSession: 800, tier: "Standard" },
    { id: 102, name: "Hypertrophy Elite", sessions: 24, pricePerSession: 750, tier: "Elite" },
    { id: 103, name: "Metabolic Conditioning", sessions: 16, pricePerSession: 700, tier: "Standard" },
    { id: 104, name: "Powerlifting Peaking", sessions: 36, pricePerSession: 900, tier: "Elite" }
  ];

  // Render Packages using map() & Arrow functions
  const renderPackages = () => {
    const container = document.getElementById("packageCards");
    container.innerHTML = packages.map(({ name, sessions, pricePerSession, tier }) => {
      const totalCost = sessions * pricePerSession;
      return `
        <div class="col-md-3">
          <div class="p-3 bg-dark border border-secondary rounded">
            <span class="badge ${tier === 'Elite' ? 'bg-warning text-dark' : 'bg-secondary'} mb-2">${tier}</span>
            <h6 class="text-white mb-1">${name}</h6>
            <div class="small text-secondary mb-2">${sessions} Sessions @ ₹${pricePerSession}</div>
            <div class="fw-bold text-info">₹${totalCost.toLocaleString('en-IN')}</div>
          </div>
        </div>
      `;
    }).join('');

    // ES6 reduce() for total pipeline calculation
    const totalPipelineValue = packages.reduce((acc, curr) => acc + (curr.sessions * curr.pricePerSession), 0);
    document.getElementById("totalPipeline").textContent = `₹${totalPipelineValue.toLocaleString('en-IN')}`;

    // ES6 filter() for counting specific tiers
    const eliteTiers = packages.filter(pkg => pkg.tier === "Elite");
    document.getElementById("eliteCount").textContent = eliteTiers.length;
  };
  renderPackages();

  // 3. Events, Prompt, Confirm, and Alert (Syllabus Item)
  const bookingBtn = document.getElementById("bookSessionBtn");
  bookingBtn.addEventListener("click", () => {
    // Prompt Box
    const athleteName = prompt("Enter athlete name for direct booking:");
    if (!athleteName || athleteName.trim() === "") {
      alert("Booking canceled: athlete name cannot be empty.");
      return;
    }

    const sessionsRequested = prompt(`How many personal training sessions for ${athleteName}? (e.g. 10):`, "10");
    const sessionCount = parseInt(sessionsRequested, 10);

    if (isNaN(sessionCount) || sessionCount <= 0) {
      alert("Invalid session quantity entered.");
      return;
    }

    const estimatedCost = sessionCount * 800;

    // Confirm Box
    const confirmed = confirm(`Confirm booking for ${athleteName}:\n- Sessions: ${sessionCount}\n- Base Total: ₹${estimatedCost.toLocaleString('en-IN')}\n\nProceed?`);

    // Alert Box
    if (confirmed) {
      alert(`Booking Confirmed! Coach assigned to ${athleteName} for ${sessionCount} sessions.`);
    } else {
      alert("Booking request discarded.");
    }
  });

  // 4. Algorithm 1: Factorial of Number (Exercise Permutations)
  const factorial = (n) => {
    if (n < 0) return "Undefined";
    if (n === 0 || n === 1) return 1;
    let res = 1;
    for (let i = 2; i <= n; i++) res *= i;
    return res;
  };

  document.getElementById("btnFactorial").addEventListener("click", () => {
    const val = parseInt(document.getElementById("factInput").value, 10);
    if (isNaN(val) || val < 0) {
      document.getElementById("factOutput").textContent = "Please enter a non-negative integer.";
      return;
    }
    const result = factorial(val);
    document.getElementById("factOutput").textContent = `${val}! = ${result.toLocaleString()} distinct exercise circuit orders.`;
  });

  // 5. Algorithm 2: Multiplication Table (Volume Loading Matrix)
  document.getElementById("btnTable").addEventListener("click", function () { // Anonymous Function
    const load = parseFloat(document.getElementById("tableInput").value);
    if (isNaN(load) || load <= 0) {
      document.getElementById("tableOutput").textContent = "Please enter a valid weight load.";
      return;
    }

    let output = `Progression for ${load} kg load:\n`;
    for (let set = 1; set <= 10; set++) {
      output += `Set ${set}: ${set} reps × ${load}kg = ${(set * load).toFixed(1)} kg total\n`;
    }
    document.getElementById("tableOutput").textContent = output;
  });

  // 6. Algorithm 3: Sum of N Numbers (Cumulative Training Target)
  document.getElementById("btnSum").addEventListener("click", () => {
    const n = parseInt(document.getElementById("sumInput").value, 10);
    if (isNaN(n) || n <= 0) {
      document.getElementById("sumOutput").textContent = "Enter a positive number of days.";
      return;
    }

    // ES6 Array.from() + reduce()
    const sum = Array.from({ length: n }, (_, i) => i + 1).reduce((acc, curr) => acc + curr, 0);
    document.getElementById("sumOutput").textContent = `Cumulative base target over ${n} days: ${sum.toLocaleString()} units (Formula: n(n+1)/2 = ${(n * (n + 1)) / 2})`;
  });

  // Initial runs for default view
  document.getElementById("btnFactorial").click();
  document.getElementById("btnTable").click();
  document.getElementById("btnSum").click();
});