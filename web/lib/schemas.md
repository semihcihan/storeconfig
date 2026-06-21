# StoreConfig JSON Schema
## AppStoreModel

_Object containing the following properties:_

| Property                 | Type                                                           |
| :----------------------- | :------------------------------------------------------------- |
| **`schemaVersion`** (\*) | `string`                                                       |
| **`appId`** (\*)         | `string`                                                       |
| `versionString`          | `string`                                                       |
| `pricing`                | [PriceSchedule](#priceschedule)                                |
| `availableTerritories`   | [AvailableTerritories](#availableterritories)                  |
| `inAppPurchases`         | _Array of [InAppPurchase](#inapppurchase) items_               |
| `subscriptionGroups`     | _Array of [SubscriptionGroup](#subscriptiongroup) items_       |
| `primaryLocale`          | [LocaleCode](#localecode)                                      |
| `localizations`          | _Array of [AppStoreLocalization](#appstorelocalization) items_ |
| `copyright`              | `string`                                                       |

_(\*) Required._


## AppStoreAppInfoLocalization

_Object containing the following properties:_

| Property            | Type                        |
| :------------------ | :-------------------------- |
| `name`              | `string` (_max length: 30_) |
| `subtitle`          | `string` (_max length: 30_) |
| `privacyPolicyUrl`  | `string` (_url_)            |
| `privacyChoicesUrl` | `string` (_url_)            |

_All properties are optional._

## AppStoreLocalization

_Intersection of the following types:_

- _Object with properties:_<ul><li>**`locale`** (\*): [LocaleCode](#localecode)</li></ul> _and_ [AppStoreAppInfoLocalization](#appstoreappinfolocalization)
- [AppStoreVersionLocalization](#appstoreversionlocalization)

## AppStoreVersionLocalization

_Object containing the following properties:_

| Property          | Type                                          |
| :---------------- | :-------------------------------------------- |
| `description`     | `string` (_min length: 10, max length: 4000_) |
| `keywords`        | `string` (_max length: 100_)                  |
| `marketingUrl`    | `string` (_url_)                              |
| `promotionalText` | `string` (_max length: 170_)                  |
| `supportUrl`      | `string` (_url_)                              |
| `whatsNew`        | `string` (_max length: 4000_)                 |

_All properties are optional._

## Availability

_Object containing the following properties:_

| Property                             | Type                                          |
| :----------------------------------- | :-------------------------------------------- |
| **`availableInNewTerritories`** (\*) | `boolean`                                     |
| **`availableTerritories`** (\*)      | [AvailableTerritories](#availableterritories) |

_(\*) Required._

## AvailableTerritories

_Union of the following possible types:_

- _Array of [TerritoryCode](#territorycode) items_
- `'worldwide'`

## InAppPurchase

_Object containing the following properties:_

| Property                  | Type                                                              |
| :------------------------ | :---------------------------------------------------------------- |
| **`productId`** (\*)      | `string` (_max length: 100_)                                      |
| **`type`** (\*)           | `'CONSUMABLE' \| 'NON_CONSUMABLE' \| 'NON_RENEWING_SUBSCRIPTION'` |
| **`referenceName`** (\*)  | `string` (_max length: 64_)                                       |
| **`familySharable`** (\*) | `boolean`                                                         |
| `reviewNote`              | `string` (_max length: 4000_)                                     |
| `pricing`                 | [PriceSchedule](#priceschedule)                                   |
| `availability`            | [Availability](#availability)                                     |
| `localizations`           | _Array of [Localization](#localization) items_                    |

_(\*) Required._

## IntroductoryOffer

_Union of the following possible types:_

- _Object with properties:_<ul><li>**`type`** (\*): `'PAY_AS_YOU_GO'`</li><li>**`numberOfPeriods`** (\*): `number`</li><li>**`pricing`** (\*): [PriceSchedule](#priceschedule)</li><li>**`availableTerritories`** (\*): [AvailableTerritories](#availableterritories)</li></ul>
- _Object with properties:_<ul><li>**`type`** (\*): `'PAY_UP_FRONT'`</li><li>**`duration`** (\*): [SubscriptionOfferDuration](#subscriptionofferduration)</li><li>**`pricing`** (\*): [PriceSchedule](#priceschedule)</li><li>**`availableTerritories`** (\*): [AvailableTerritories](#availableterritories)</li></ul>
- _Object with properties:_<ul><li>**`type`** (\*): `'FREE_TRIAL'`</li><li>**`duration`** (\*): [SubscriptionOfferDuration](#subscriptionofferduration)</li><li>**`availableTerritories`** (\*): [AvailableTerritories](#availableterritories)</li></ul>

## LocaleCode

_Enum, one of the following possible values:_

<details>
<summary><i>Expand for full list of 39 values</i></summary>

- `'ar-SA'`
- `'ca'`
- `'zh-Hans'`
- `'zh-Hant'`
- `'hr'`
- `'cs'`
- `'da'`
- `'nl-NL'`
- `'en-AU'`
- `'en-CA'`
- `'en-GB'`
- `'en-US'`
- `'fi'`
- `'fr-FR'`
- `'fr-CA'`
- `'de-DE'`
- `'el'`
- `'he'`
- `'hi'`
- `'hu'`
- `'id'`
- `'it'`
- `'ja'`
- `'ko'`
- `'ms'`
- `'no'`
- `'pl'`
- `'pt-BR'`
- `'pt-PT'`
- `'ro'`
- `'ru'`
- `'sk'`
- `'es-MX'`
- `'es-ES'`
- `'sv'`
- `'th'`
- `'tr'`
- `'uk'`
- `'vi'`

</details>

## Localization

_Object containing the following properties:_

| Property               | Type                        |
| :--------------------- | :-------------------------- |
| **`locale`** (\*)      | [LocaleCode](#localecode)   |
| **`name`** (\*)        | `string` (_max length: 35_) |
| **`description`** (\*) | `string` (_max length: 55_) |

_(\*) Required._

## PriceSchedule

_Object containing the following properties:_

| Property                 | Type                             |
| :----------------------- | :------------------------------- |
| **`baseTerritory`** (\*) | [TerritoryCode](#territorycode)  |
| **`prices`** (\*)        | _Array of [Price](#price) items_ |

_(\*) Required._

## Price

_Object containing the following properties:_

| Property             | Type                            |
| :------------------- | :------------------------------ |
| **`price`** (\*)     | `string`                        |
| **`territory`** (\*) | [TerritoryCode](#territorycode) |

_(\*) Required._

## SubscriptionGroupLocalization

_Object containing the following properties:_

| Property              | Type                                     |
| :-------------------- | :--------------------------------------- |
| **`locale`** (\*)     | [LocaleCode](#localecode)                |
| **`name`** (\*)       | `string` (_max length: 75_)              |
| **`customName`** (\*) | `string` (_max length: 30_) (_nullable_) |

_(\*) Required._

## SubscriptionGroup

_Object containing the following properties:_

| Property                 | Type                                                                             |
| :----------------------- | :------------------------------------------------------------------------------- |
| **`referenceName`** (\*) | `string` (_max length: 64_)                                                      |
| **`localizations`** (\*) | _Array of [SubscriptionGroupLocalization](#subscriptiongrouplocalization) items_ |
| **`subscriptions`** (\*) | _Array of [Subscription](#subscription) items_                                   |

_(\*) Required._

## SubscriptionOfferDuration

_Enum, one of the following possible values:_

- `'THREE_DAYS'`
- `'ONE_WEEK'`
- `'TWO_WEEKS'`
- `'ONE_MONTH'`
- `'TWO_MONTHS'`
- `'THREE_MONTHS'`
- `'SIX_MONTHS'`
- `'ONE_YEAR'`

## SubscriptionPeriod

_Enum, one of the following possible values:_

- `'ONE_WEEK'`
- `'ONE_MONTH'`
- `'TWO_MONTHS'`
- `'THREE_MONTHS'`
- `'SIX_MONTHS'`
- `'ONE_YEAR'`

## Subscription

_Object containing the following properties:_

| Property                      | Type                                                     |
| :---------------------------- | :------------------------------------------------------- |
| **`productId`** (\*)          | `string` (_max length: 100_)                             |
| **`referenceName`** (\*)      | `string` (_max length: 64_)                              |
| **`groupLevel`** (\*)         | `number`                                                 |
| **`subscriptionPeriod`** (\*) | [SubscriptionPeriod](#subscriptionperiod)                |
| **`familySharable`** (\*)     | `boolean`                                                |
| `reviewNote`                  | `string` (_max length: 4000_)                            |
| `pricing`                     | [PriceSchedule](#priceschedule)                          |
| `introductoryOffers`          | _Array of [IntroductoryOffer](#introductoryoffer) items_ |
| `availability`                | [Availability](#availability)                            |
| `localizations`               | _Array of [Localization](#localization) items_           |

_(\*) Required._

## TerritoryCode

_Enum, one of the following possible values:_

<details>
<summary><i>Expand for full list of 175 values</i></summary>

- `'AFG'`
- `'AGO'`
- `'AIA'`
- `'ALB'`
- `'ARE'`
- `'ARG'`
- `'ARM'`
- `'ATG'`
- `'AUS'`
- `'AUT'`
- `'AZE'`
- `'BEL'`
- `'BEN'`
- `'BFA'`
- `'BGR'`
- `'BHR'`
- `'BHS'`
- `'BIH'`
- `'BLR'`
- `'BLZ'`
- `'BMU'`
- `'BOL'`
- `'BRA'`
- `'BRB'`
- `'BRN'`
- `'BTN'`
- `'BWA'`
- `'CAN'`
- `'CHE'`
- `'CHL'`
- `'CHN'`
- `'CIV'`
- `'CMR'`
- `'COD'`
- `'COG'`
- `'COL'`
- `'CPV'`
- `'CRI'`
- `'CYM'`
- `'CYP'`
- `'CZE'`
- `'DEU'`
- `'DMA'`
- `'DNK'`
- `'DOM'`
- `'DZA'`
- `'ECU'`
- `'EGY'`
- `'ESP'`
- `'EST'`
- `'FIN'`
- `'FJI'`
- `'FRA'`
- `'FSM'`
- `'GAB'`
- `'GBR'`
- `'GEO'`
- `'GHA'`
- `'GMB'`
- `'GNB'`
- `'GRC'`
- `'GRD'`
- `'GTM'`
- `'GUY'`
- `'HKG'`
- `'HND'`
- `'HRV'`
- `'HUN'`
- `'IDN'`
- `'IND'`
- `'IRL'`
- `'IRQ'`
- `'ISL'`
- `'ISR'`
- `'ITA'`
- `'JAM'`
- `'JOR'`
- `'JPN'`
- `'KAZ'`
- `'KEN'`
- `'KGZ'`
- `'KHM'`
- `'KNA'`
- `'KOR'`
- `'KWT'`
- `'LAO'`
- `'LBN'`
- `'LBR'`
- `'LBY'`
- `'LCA'`
- `'LKA'`
- `'LTU'`
- `'LUX'`
- `'LVA'`
- `'MAC'`
- `'MAR'`
- `'MDA'`
- `'MDG'`
- `'MDV'`
- `'MEX'`
- `'MKD'`
- `'MLI'`
- `'MLT'`
- `'MMR'`
- `'MNE'`
- `'MNG'`
- `'MOZ'`
- `'MRT'`
- `'MSR'`
- `'MUS'`
- `'MWI'`
- `'MYS'`
- `'NAM'`
- `'NER'`
- `'NGA'`
- `'NIC'`
- `'NLD'`
- `'NOR'`
- `'NPL'`
- `'NRU'`
- `'NZL'`
- `'OMN'`
- `'PAK'`
- `'PAN'`
- `'PER'`
- `'PHL'`
- `'PLW'`
- `'PNG'`
- `'POL'`
- `'PRT'`
- `'PRY'`
- `'QAT'`
- `'ROU'`
- `'RUS'`
- `'RWA'`
- `'SAU'`
- `'SEN'`
- `'SGP'`
- `'SLB'`
- `'SLE'`
- `'SLV'`
- `'SRB'`
- `'STP'`
- `'SUR'`
- `'SVK'`
- `'SVN'`
- `'SWE'`
- `'SWZ'`
- `'SYC'`
- `'TCA'`
- `'TCD'`
- `'THA'`
- `'TJK'`
- `'TKM'`
- `'TON'`
- `'TTO'`
- `'TUN'`
- `'TUR'`
- `'TWN'`
- `'TZA'`
- `'UGA'`
- `'UKR'`
- `'URY'`
- `'USA'`
- `'UZB'`
- `'VCT'`
- `'VEN'`
- `'VGB'`
- `'VNM'`
- `'VUT'`
- `'XKS'`
- `'YEM'`
- `'ZAF'`
- `'ZMB'`
- `'ZWE'`

</details>
