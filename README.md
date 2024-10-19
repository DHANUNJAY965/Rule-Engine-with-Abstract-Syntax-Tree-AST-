
# Rule Engine with AST: Comprehensive Setup and Usage Guide

## Project Overview
The Rule Engine with Abstract Syntax Tree (AST) is a dynamic system designed to determine user eligibility based on attributes like age, department, income, and spending. The core idea is to allow for the creation, combination, and modification of rules using an AST, where rules are represented as nodes that can be evaluated dynamically. This project showcases a 3-tier architecture (UI, API, Backend) that efficiently handles complex conditional logic with ease. 
Project Link: [https://rule-engine-dhanu.vercel.app/]


## Data Structure:
- Define a data structure to represent the AST.
- The data structure should allow rule changes.
- One potential data structure is:
  - `type`: String indicating the node type ("operator" for AND/OR, "operand" for conditions)
  - `left`: Reference to another Node (left child)
  - `right`: Reference to another Node (right child for operators)
  - `value`: Optional value for operand nodes (e.g., number for comparisons)

## Data Storage
- Define the database choice for storing rules and application metadata.
- this application integrates with MongoDB to store rules and metadata.

## Sample Rules:
1. `rule1 = "((age > 30 AND department = 'Sales') OR (age < 25 AND department = 'Marketing')) AND (salary > 50000 OR experience > 5)"`
2. `rule2 = "((age > 30 AND department = 'Marketing')) AND (salary > 20000 OR experience > 5)"`

## API Design:
1. **create_rule(rule_string)**: This function takes a string representing a rule and returns a Node object representing the corresponding AST.
2. **combine_rules(rules)**: This function takes a list of rule strings and combines them into a single AST while minimizing redundant checks.
3. **evaluate_rule(JSON data)**: This function takes a JSON representing the rule's AST and evaluates it against user data, returning True or False.

---

# Project Setup

## Option 1: Using Docker (Recommended)

1. Install Docker and Docker Compose on your system.
2. Clone the repository:
   ```bash
   git clone https://github.com/DHANUNJAY965/Rule-Engine-with-Abstract-Syntax-Tree-AST-.git
   cd rule-engine-ast
   ```
3. Build and run the Docker containers:
   ```bash
   docker-compose up --build
   ```
4. The application will be available at [http://localhost:3000](http://localhost:3000).

### MongoDB Setup

#### Local MongoDB:
Ensure MongoDB is installed and running locally.
To view your data, use MongoDB Compass:
- Download and install MongoDB Compass.
- Connect using: `mongodb://mongodb:27017/ruleEngine`

#### MongoDB Atlas (Cloud Option):
1. Create a free MongoDB Atlas account.
2. Set up a new cluster and obtain your connection string.
3. Update the `.env.local` file with the MongoDB Atlas connection string.

## Option 2: Manual Setup

1. Install Node.js (v14 or later) and MongoDB (v4.4 or later).
2. Clone the repository:
   ```bash
   git clone https://github.com/DHANUNJAY965/Rule-Engine-with-Abstract-Syntax-Tree-AST-.git
   cd rule-engine-ast
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start MongoDB service on your machine.
5. Run the development server:
   ```bash
   npm run dev
   ```
6. The application will be available at [http://localhost:3000](http://localhost:3000).

---

# Using the Application

## 1. Creating a Rule:
1. Open your browser and go to [http://localhost:3000](http://localhost:3000).
2. Enter a rule string:
   ```text
   (age > 30 AND department = 'Sales') OR (salary > 50000)
   ```
3. Click the "Add Rule" button.

## 2. Viewing and Combining Rules:
- Created rules will be displayed on the main page. 
- Combine available rules as needed.

## 3. Evaluating Rules:
1. Select the rule from the dropdown.
2. Enter JSON data like:
   ```json
   {
     "age": 35,
     "department": "Sales",
     "salary": 60000,
     "experience": 3
   }
   ```
3. The response will indicate whether the data satisfies the rule.

---

# API Reference

## Create Rule:
- **URL**: `/api/createRule`
- **Method**: `POST`
- **Body**:
   ```json
   {
     "name": "createRule",
     "data": {
       "ruleString": "(age > 30 AND department = 'Sales') OR (salary > 50000)"
     }
   }
   ```

## Combine Rules:
- **URL**: `/api/combineRules`
- **Method**: `POST`
- **Body**:
   ```json
   {
     "action": "combineRules",
     "data": {
       "ruleIds": ["rule1Id", "rule2Id"]
     }
   }
   ```

## Evaluate Rule:
- **URL**: `/api/evaluateRule`
- **Method**: `POST`
- **Body**:
   ```json
   {
     "action": "evaluateRule",
     "data": {
       "ruleId": "yourRuleId",
       "userData": {
         "age": 35,
         "department": "Sales",
         "salary": 60000,
         "experience": 3
       }
     }
   }
   ```

---

# Testing

### Running Tests

1. Navigate to the `tests` directory.
2. Write tests in `ruleEngine.test.ts`.
3. Run the tests using `npm run test`.

---

# Troubleshooting

1. **Docker issues**: Ensure Docker is running with the correct permissions.
2. **MongoDB connection issues**:
   - For manual setup: Ensure MongoDB is running locally.
   - For Docker: Check the MongoDB container with `docker ps`.
3. **API request failures**: Verify the server is running and check URL and body formats.
4. **Rule evaluation issues**: Double-check rule syntax and data attributes.

For further issues, consult logs or open a GitHub issue.
