import inquirer from "inquirer";

export interface AppleCredentials {
  issuerId: string;
  keyId: string;
}

export async function promptForAppleCredentials(): Promise<AppleCredentials> {
  const { issuerId } = await inquirer.prompt([
    {
      type: "input",
      name: "issuerId",
      message: "Enter your App Store Connect Issuer ID:",
      validate: (input: string) => {
        if (!input.trim()) {
          return "Issuer ID cannot be empty";
        }
        return true;
      },
    },
  ]);

  const { keyId } = await inquirer.prompt([
    {
      type: "input",
      name: "keyId",
      message: "Enter your App Store Connect Key ID:",
      validate: (input: string) => {
        if (!input.trim()) {
          return "Key ID cannot be empty";
        }
        return true;
      },
    },
  ]);

  return {
    issuerId: issuerId.trim(),
    keyId: keyId.trim(),
  };
}
