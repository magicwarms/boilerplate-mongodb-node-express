import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

// Tips coding garden with CJ
// https://www.youtube.com/watch?v=nCWE6eonL7k
// Batasi 30 request per 1800 detik atau 30 menit
const rateLimiter = rateLimit({
    windowMs: 1800 * 1000,
    max: 30,
});

// Turunkan kecepatan response setelah request pertama
// Dalam rentang waktu 1800 detik atau 30 menit
// Pada endpoint api yang sama
const speedLimiter = slowDown({
    windowMs: 30 * 1000,
    delayAfter: 25,
    delayMs: 250,
});

export { speedLimiter, rateLimiter };
