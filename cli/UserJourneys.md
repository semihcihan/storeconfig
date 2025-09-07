# User Journeys

This document outlines the step-by-step user journeys for the App Store Sync CLI tool.

## Prerequisites

Before starting any journey, users need:

- An API key (provided via email after signup)
- App Store Connect credentials (Team Private Key, Issuer ID, and Key ID)
- Node.js installed on their system

---

## Journey 1: Install the Tool via npm

### Steps:

1. **Open terminal/command prompt**
2. **Install the tool globally:**
   ```bash
   npm install -g @semihcihan/developer-tool
   ```
3. **Verify installation:**
   ```bash
   app-store-sync --help
   ```
4. **Expected outcome:** The help menu displays available commands (fetch, apply, validate-format, plan)

---

## Journey 2: Signup and Receive API Key

### Steps:

1. **Navigate to the website signup page**
2. **Complete the signup form with:**
   - Email address
   - Other required information
3. **Submit the form**
4. **Check email for API key**
5. **Expected outcome:** Receive API key via email for CLI authentication

---

## Journey 3: First-Time Usage - Fetch, Modify, and Apply

### Steps:

1. **Set up API key:**

   Create a `.env` file in your project directory:

   ```bash
   echo 'API_KEY=your-api-key-here' > .env
   ```

   Or manually create a `.env` file with your text editor and add:

   ```
   API_KEY=your-api-key-here
   ```

2. **Fetch current App Store state:**

   ```bash
   app-store-sync fetch --id YOUR_APP_ID --file current-state.json
   ```

3. **Review the generated JSON file:**

   - Open `current-state.json` in a text editor
   - Understand the structure of in-app purchases and subscriptions

4. **Make desired changes to the JSON file:**

   - Edit `current-state.json` or create a new file with modifications
   - Add new in-app purchases or subscriptions
   - Modify existing pricing or descriptions
   - Update localization content

5. **Validate the modified JSON format:**

   ```bash
   app-store-sync validate-format --file modified-state.json
   ```

6. **Apply changes to App Store Connect:**

   ```bash
   app-store-sync apply --file modified-state.json --id YOUR_APP_ID
   ```

7. **Confirm changes**
8. **Expected outcome:** Changes are successfully applied to App Store Connect

---

## Journey 4: Update Existing Configuration - Modify and Apply

### Steps:

1. **Start with existing JSON file** (from previous fetch or manual creation)

2. **Make changes to the JSON file:**

   - Open the existing JSON file in a text editor
   - Modify pricing, descriptions, or add new items
   - Update localization content

3. **Validate the changes:**

   ```bash
   app-store-sync validate-format --file updated-state.json
   ```

4. **Apply changes using current state file (for development):**

   ```bash
   app-store-sync apply --file updated-state.json --current-state-file previous-state.json
   ```

   **Or apply changes by fetching current state (for production):**

   ```bash
   app-store-sync apply --file updated-state.json --id YOUR_APP_ID
   ```

5. **Confirm changes**
6. **Expected outcome:** Only the modified items are updated in App Store Connect

---

## Journey 5: Preview Changes Before Applying

### Steps:

1. **Start with existing JSON file** (from previous fetch or manual creation)

2. **Make changes to the JSON file:**

   - Open the existing JSON file in a text editor
   - Make desired modifications to pricing, descriptions, or content

3. **Preview changes without applying:**

   ```bash
   app-store-sync plan --file modified-state.json --id YOUR_APP_ID
   ```

   **Or use the apply command with preview flag:**

   ```bash
   app-store-sync apply --file modified-state.json --id YOUR_APP_ID --preview
   ```

4. **Review the detailed plan output:**

   - See what will be created, updated, or deleted
   - Verify the changes match expectations

5. **Apply the changes:**

   ```bash
   app-store-sync apply --file modified-state.json --id YOUR_APP_ID
   ```

6. **Confirm changes**
7. **Expected outcome:** Changes are successfully applied after preview confirmation

---

## Command Reference

### Fetch Command

```bash
app-store-sync fetch --id APP_ID --file OUTPUT_FILE.json
```

- Fetches current state from App Store Connect
- Requires App ID and output file path

### Validate Format Command

```bash
app-store-sync validate-format --file FILE_PATH.json
```

- Validates JSON file format and structure
- Ensures data meets AppStoreModelSchema requirements

### Plan Command

```bash
app-store-sync plan --file DESIRED_STATE.json --id APP_ID
# OR
app-store-sync plan --file DESIRED_STATE.json --current-state-file CURRENT_STATE.json
```

- Shows what changes will be made (dry run)
- Does not apply any changes
- Alias for `apply --preview`

### Apply Command

```bash
app-store-sync apply --file DESIRED_STATE.json --id APP_ID
# OR
app-store-sync apply --file DESIRED_STATE.json --current-state-file CURRENT_STATE.json
# OR
app-store-sync apply --file DESIRED_STATE.json --id APP_ID --preview
```

- Applies changes to App Store Connect
- Shows plan before applying
- Requires confirmation
- Use `--preview` flag for dry run

---

## Troubleshooting

### Common Issues:

1. **API Key not set:**

   - Ensure `.env` file exists in your project directory
   - Verify the `.env` file contains `API_KEY=your-api-key-here`
   - Check that the `.env` file is in the same directory where you run the CLI commands

2. **Invalid JSON:** Use `validate-format` command to check file structure
3. **Authentication errors:** Verify your API key is correct
4. **File not found:** Ensure file paths are correct and files exist

### Getting Help:

```bash
app-store-sync --help
app-store-sync COMMAND --help
```
