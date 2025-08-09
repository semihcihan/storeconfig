### Pricing Command — Feature Description

This document describes a new command to help users set prices across territories more effectively. It focuses on what the command will do, not how it will be implemented or how users will invoke it.

### Problems This Solves

- **Apple pricing ignores purchasing power**: Apple's default pricing strategy does not account for variations in purchasing power across territories.
- **Subscriptions lack a base territory**: While in-app purchases and app pricing support a base territory to cascade prices, subscriptions do not. Users must currently enter each subscription price per territory manually.

### Goal

- **Enable two pricing strategies** and automate per-territory pricing for apps, in‑app purchases, and subscriptions, reducing manual work and improving price fairness.

### Command Parameters

- **Input file**: Path to the current state file (e.g., `fetch.json`) - will be updated in place

### Interactive Prompts

The command will guide users through the following prompts:

1. **Select item to price** (required)

   - List all available items: apps, in-app purchases, subscriptions, and offers
   - User selects one item from the list

2. **Base price in USD** (required)

   - Example: `5.99`

3. **Pricing strategy** (required)

   - **apple**: Use Apple's pricing strategy
   - **purchasing power**: Adjust prices based on purchasing power considerations

4. **Minimum price in USD** (optional)
   - A price floor to prevent too‑low prices due to exchange rates or PPP adjustments
   - Example: `1.99`
   - Can be skipped if not needed

### Expected Behavior (High-Level)

- **Compute per-territory prices** using the selected strategy starting from the USD base price
- **Respect minimum USD price**: If a computed per-territory price (USD-equivalent) falls below the minimum, raise it to the minimum before any rounding/tier mapping (details TBD)
- **Apply to all territories** (no include/exclude filtering)
- **Handle subscriptions without base territory** by generating territory prices without requiring users to enter values one-by-one
- **Update the selected item** with the new pricing in the input file

### Data Sources

- **Apple APIs**: Will be used to fetch price points and tier information
- **@currencies.json**: Contains currency exchange rates and purchasing power data for territory-based pricing calculations

### Error Handling & Safety

- **Input file backup**: Before making changes, create a backup of the input file to enable rollback in case of errors
- **Atomic updates**: Ensure the file is only updated if all operations complete successfully
- **Rollback capability**: If any error occurs during the pricing operation, restore from backup

### Prompt UI/UX Details

#### Item Selection Prompt

- **Display format**: Numbered list with clear labels
  ```
  1. App: "My App Name" (ID: 123456789)
  2. In-App Purchase: "Premium Feature" (ID: com.example.premium)
  3. Subscription: "Monthly Plan" (ID: com.example.monthly)
  4. Offer: "Introductory Offer" (ID: com.example.intro) - belongs to "Monthly Plan"
  ```
- **Input validation**: Must be a valid number within the displayed range
- **Error handling**: Re-prompt if invalid selection, show available options again

#### Base Price Prompt

- **Format**: "Enter base price in USD (e.g., 5.99): "
- **Validation rules**:
  - Must be a non-negative number
  - Must be a valid decimal (up to 2 decimal places)
- **Price point validation**: After item selection, fetch available price points and validate entered price
- **Error handling**:
  - If invalid format: Show specific error message and re-prompt
  - If price not in available price points: Show error and list available prices
    - Display all price points as comma-separated values
    - Highlight 20 nearest prices (different color or separate line)
- **Re-validation**: After user re-enters price, repeat validation process

#### Pricing Strategy Prompt

- **Display format**:
  ```
  Select pricing strategy:
  1. Apple (uses Apple's standard pricing tiers)
  2. Purchasing Power (adjusts for local purchasing power)
  ```
- **Input validation**: Must be 1 or 2
- **Error handling**: Re-prompt with options if invalid

#### Minimum Price Prompt (Optional - Purchasing Power Strategy Only)

- **Format**: "Enter minimum price in USD (optional, press Enter to skip): "
- **Validation rules**:
  - If provided, must be a positive number
  - Must be less than or equal to base price
  - Must be a valid decimal (up to 2 decimal places)
- **Error handling**: Show error and re-prompt, or allow skipping
- **Note**: Only shown when "Purchasing Power" strategy is selected (not applicable for Apple strategy)

### Validation Rules

#### Input File Validation

- File must exist and be readable
- File must contain valid JSON structure (validate this, we already have this functionality)
- File must contain at least one item (app, IAP, subscription, or offer)

#### Item-Specific Validation

- Selected item must exist in the input file

#### Pricing Validation

- Base price must be compatible with Apple's pricing tiers
- Minimum price (if provided) must not exceed base price
- Computed prices must respect min price requirement if inputted
- All computed prices must be valid for their respective territories

### Implementation Details

#### Process Flow

1. **Input validation**: Validate all user inputs and file structure
2. **Price calculation**: Calculate prices based on selected strategy and inputs
3. **File update**: Update the input file in place with new pricing
4. **Rollback**: If any error occurs during the process, restore from backup

#### Progress Indication

- Show progress during long operations using dots or similar visual indicator
- Display current operation being performed (e.g., "Calculating prices...", "Updating file...")

#### Apple Pricing Strategy Implementation

**For items using PriceScheduleSchema (with base territory):**

- Use existing `baseTerritory` and its price from the `prices` array
- This functionality is already in place for items that support base territory pricing
- Calculate all territory prices based on the base USD price and Apple's pricing tiers

**For items without PriceScheduleSchema (no base territory):**

- **TBD**: Need to investigate how to handle pricing for items without base territory support
- This affects some subscription types and other items that don't use the standard pricing schema
- Will require additional research and implementation approach

#### Future Considerations

- **Purchasing Power Strategy**: Will be implemented after Apple strategy is complete

### Implementation Guidelines - Write extensive Unit Tests where possible

#### Phase 1: Core Infrastructure

1. **✅ Create command structure**

   - Add new command to CLI (e.g., `set-price`)
   - Set up command parameters (input file path)
   - Implement basic file validation (we already have this feature) and keep a backup.

2. **✅ Implement item selection prompt** (COMPLETED)

   - Create numbered list display for all available items (apps, IAPs, subscriptions, offers)
   - Implement input validation for selection range
   - Add error handling with re-prompt functionality
   - Display clear labels with item names and IDs

3. **✅ Implement base price prompt**

   - Create price input with format validation (non-negative)
   - Fetch available Apple price points for validation
   - Implement price point validation against Apple's pricing tiers
   - Add error handling with helpful error messages and all the available price suggestions along with a separate more clear X nearest price points to the inputted one

4. **Implement pricing strategy selection**

   - Create numbered options for Apple vs Purchasing Power strategies
   - Implement input validation (1 or 2)
   - Add error handling with re-prompt functionality
   - Display clear descriptions for each strategy

5. **Implement minimum price prompt (conditional)**

   - Create optional minimum price input (only for Purchasing Power strategy)
   - Implement validation rules (positive number, ≤ base price, valid decimal)
   - Add skip functionality (Enter to skip)
   - Implement error handling with re-prompt or skip options

#### Phase 2: Apple Pricing Strategy

3. **Implement Apple pricing calculation**

   - Handle items with PriceScheduleSchema (base territory)
   - Use existing base territory functionality
   - Calculate all territory prices based on Apple's pricing tiers

4. **Handle items without base territory**

   - Investigate and implement pricing for items without PriceScheduleSchema
   - Research alternative approaches for subscription pricing

5. **Add progress indication**
   - Implement visual progress indicators during long operations
   - Show current operation status

#### Phase 3: File Operations & Safety

6. **Implement file update logic**

   - Update selected item with new pricing in input file
   - Ensure atomic updates (all-or-nothing)
   - Implement rollback functionality from backup

7. **Add comprehensive error handling**
   - Validate all inputs and file structure
   - Handle API errors gracefully
   - Provide clear error messages and recovery options

#### Phase 4: Purchasing Power Strategy (Future)

8. **Implement purchasing power calculations**

   - Use @currencies.json for PPP data
   - Calculate territory-specific price adjustments
   - Implement minimum price floor logic

9. **Testing and refinement**
   - Test with various item types and scenarios
   - Validate pricing accuracy across territories
   - Optimize performance and user experience
