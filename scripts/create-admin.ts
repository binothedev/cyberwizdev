// scripts/create-admin.ts
// Run with: npx tsx scripts/create-admin.ts

import bcrypt from "bcryptjs";
import * as readline from "readline";
import { User } from "../lib/db/models/User";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

async function createAdmin() {
  console.log("\n=== Create Admin User ===\n");

  try {
    const name = await question("Enter admin name: ");
    const email = await question("Enter admin email: ");
    const password = await question("Enter admin password: ");

    if (!name || !email || !password) {
      console.error("All fields are required!");
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await User.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.error(`\nUser with email ${email} already exists!`);
      process.exit(1);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const admin = await User.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "admin",
      },
    });

    console.log("\n✅ Admin user created successfully!");
    console.log(`\nName: ${admin.get("name")}`);
    console.log(`Email: ${admin.email}`);
    console.log(`Role: ${admin.role}`);
    console.log(`\nYou can now login at: /admin/login\n`);
  } catch (error) {
    console.error("\n❌ Error creating admin user:", error);
  } finally {
    rl.close();
  }
}

createAdmin();
