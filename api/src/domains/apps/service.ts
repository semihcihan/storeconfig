import { fetchApps } from "./api-client";

export async function fetchAppsList() {
  const appsResponse = await fetchApps();
  const apps = appsResponse.data
    .filter((app) => app.attributes?.name)
    .map((app) => ({
      id: app.id,
      name: app.attributes!.name,
    }));

  return apps;
}
