#!/usr/bin/env node

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { generateHTML } from "./js/story-config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the template HTML
const templatePath = path.join(__dirname, "template.html");
const outputPath = path.join(__dirname, "index.html");

try {
  const template = fs.readFileSync(templatePath, "utf8");

  // Generate the story HTML
  const storyHTML = generateHTML();

  // Replace the placeholder with the generated HTML
  const finalHTML = template.replace(
    "<!-- STORY_CONTENT_PLACEHOLDER -->",
    storyHTML
  );

  // Write the final HTML
  fs.writeFileSync(outputPath, finalHTML);

  console.log("✅ HTML generated successfully!");
  console.log(`📁 Output: ${outputPath}`);
} catch (error) {
  console.error("❌ Error generating HTML:", error.message);
  process.exit(1);
}
