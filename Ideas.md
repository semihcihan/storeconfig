## IDEAS TODOs

- throw error throwformattederror
  export async function getAppInfosForApp(
  appId: string
  ): Promise<components["schemas"]["AppInfosResponse"]> {
  const response = await api.GET("/v1/apps/{id}/appInfos", {
  params: {
  path: { id: appId },
  },
  });

  if (!response.data) {
  throw new Error(
  `Failed to get app infos: ${
      response.error?.errors?.[0]?.detail || "Unknown error"
    }`
  );
  }

  return response.data;
  }

- await import
- any check

###

[info] Executing action: UPDATE_APP_LOCALIZATION
[info] Locale: en-US
[info] Version Changes: {}
[info] App Info Changes: {"name":"Love Counter : Lovinsinq","subtitle":"Countdown, Reminder, Widget","privacyPolicyUrl":"https://www.lagotgames.com/privacypolicy"}

###

- multiple app infos problem
- "404"
- No start date and end date support, will be overridden (TELL THIS TO USER)
- while fetching without apply, should we ask for a version???

- Have system defined and user defined territory groups and let these to be used
- Create easy pricing changes
- Have a documentation / README

- website

# V2

- other platforms
- intro offers
- start end dates, scheduling
- billing grace period
- add new fields to support
  - age rating
  - app category
  - content rights
  - privacy questions (not available on app store connect api yet)
