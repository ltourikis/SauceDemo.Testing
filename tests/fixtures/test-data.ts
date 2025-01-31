import * as dotenv from 'dotenv';
dotenv.config();

export const TestUsers = {
    STANDARD: {
        username: process.env.STANDARD_USER,
        password: process.env.STANDARD_PASSWORD
    },
    LOCKED: {
        username: process.env.LOCKED_USER,
        password: process.env.LOCKED_PASSWORD
    },
    PROBLEM: {
        username: process.env.PROBLEM_USER,
        password: process.env.PROBLEM_PASSWORD
    }
};