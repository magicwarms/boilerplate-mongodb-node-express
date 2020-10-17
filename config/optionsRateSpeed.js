import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

// Tips coding garden with CJ
// https://www.youtube.com/watch?v=nCWE6eonL7k
// Batasi 60 request per 300 detik atau 5 menit
const rateLimiter = rateLimit({
    windowMs: 300 * 1000,
    max: 60,
});

// Turunkan kecepatan response setelah request pertama
// Dalam rentang waktu 300 detik atau 5 menit
// Pada endpoint api yang sama
const speedLimiter = slowDown({
    windowMs: 300 * 1000,
    delayAfter: 25,
    delayMs: 250,
});

export { speedLimiter, rateLimiter };
