import inquirer from "inquirer";

export async function promptForSecretKey(): Promise<string> {
  const { secretKey } = await inquirer.prompt([
    {
      type: "password",
      name: "secretKey",
      message: "Enter your StoreConfig Secret Key:",
      mask: "*",
    },
  ]);

  return secretKey.trim();
}
