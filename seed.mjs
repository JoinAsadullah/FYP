import { neon } from "@neondatabase/serverless"
import fs from "fs";
import path, { parse } from "path";
import Papa from "papaparse";
import dotenv from "dotenv";
dotenv.config();

const sql = neon(process.env.DATABASE_URL);

// Path to your local CSV file
const filePath = './data.csv'; // Change this to your file path

// A function to parse CSV using a Promise so we can await it
function parseCSV() {
  return new Promise((resolve, reject) => {
    // Read the CSV file synchronously
    const data = fs.readFileSync(filePath, 'utf8');

    // Use PapaParse to parse the CSV
    Papa.parse(data, {
      header: true,  // Assuming the first row contains headers
      skipEmptyLines: true, // Skip any empty lines
      complete: (result) => {
        resolve(result.data); // Resolve the promise with parsed data
      },
      error: (error) => {
        reject(new Error(`Error parsing CSV: ${error.message}`)); // Reject on error
      }
    });
  });
}


async function main() {
  // Creating the books table
//   const createStudentsTable = await sql`
//     CREATE TABLE students (
//     Sr_No INT PRIMARY KEY,                  -- Serial number as the primary key
//     UID VARCHAR(20) NOT NULL,               -- Unique identifier (alphanumeric)
//     City VARCHAR(100),                      -- City where the student is located
//     City_value INT,                         -- Numeric value associated with the city
//     University VARCHAR(255),                -- Name of the university
//     University_value INT,                   -- Numeric value associated with the university
//     Campus VARCHAR(100),                    -- Name of the campus
//     Campus_value INT,                       -- Numeric value associated with the campus
//     Department VARCHAR(100),                -- Department the student belongs to
//     Department_value INT,                   -- Numeric value associated with the department
//     Degree VARCHAR(255),                    -- Degree type (e.g., BS (Hons), etc.)
//     Year VARCHAR(50),                       -- Year of education (e.g., 16 years education)
//     Name VARCHAR(255),                      -- Student's name
//     Father_Name VARCHAR(255),               -- Father's name
//     Roll_No VARCHAR(50),                    -- Roll number assigned to the student
//     Program VARCHAR(100),                   -- Program (e.g., BS (Hons), etc.)
//     Year_of_Study INT,                      -- Year of study (1st year, 2nd year, etc.)
//     Semester INT,                           -- Semester (1, 2, etc.)
//     CGPA DECIMAL(3, 2),                     -- CGPA (Decimal format with 2 places)
//     Percentage DECIMAL(5, 2),               -- Percentage (Decimal format with 2 places)
//     Status VARCHAR(50),                     -- Status (e.g., "Assets Issued")
//     Merit_Status VARCHAR(50)                -- Merit status (e.g., "Selected", "Not Eligible")
// );

//   `;
//   console.log('Created "students" table');



const BATCH_SIZE = 500; // Adjust batch size based on your system's capacity

const studentsData = await parseCSV();

  console.log(`Total students to seed: ${studentsData.length}`);

  for (let i = 0; i < studentsData.length; i += BATCH_SIZE) {
    const batch = studentsData.slice(i, i + BATCH_SIZE);

    // Insert the batch into the database
    const promises = batch.map((student) =>
      sql`
      INSERT INTO students (
        Sr_No, UID, City, City_value, University, University_value, 
        Campus, Campus_value, Department, Department_value, Degree, 
        Year, Name, Father_Name, Roll_No, Program, Year_of_Study, 
        Semester, CGPA, Percentage, Status, Merit_Status, Prediction, Probability, Suggestions
      ) VALUES (
        ${student.Sr_No}, ${student.UID}, ${student.City}, ${student.City_value}, 
        ${student.University}, ${student.University_value}, ${student.Campus}, 
        ${student.Campus_value}, ${student.Department}, ${student.Department_value}, 
        ${student.Degree}, ${student.Year}, ${student.Name}, ${student.Father_Name}, 
        ${student.Roll_No}, ${student.Program}, ${student.Year_of_Study}, ${student.Semester}, 
        ${student.CGPA}, ${student.Percentage}, ${student.Status}, ${student.Merit_Status},
        ${student.Prediction}, ${student.Probability}, ${student.Suggestions}
      );
      `
    );

    try {
      const results = await Promise.all(promises);
      console.log(`Seeded ${results.length} students in batch ${Math.ceil(i / BATCH_SIZE) + 1}`);
    } catch (error) {
      console.error(`Error seeding batch starting at index ${i}:`, error);
    }
  }

  console.log("Seeding completed!");
}




// Call the async main function
main();