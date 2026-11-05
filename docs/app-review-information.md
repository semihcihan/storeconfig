# App Review Information

The optional root `appReviewInformation` object manages `contactFirstName`, `contactLastName`, `contactPhone`, `contactEmail`, and `notes`. Notes are limited to 4000 characters. Contact fields accept strings; Apple validates their content and format when applied.

Fetch reads review details from the latest iOS version using the same creation-date selection as version metadata. Missing review details are omitted. Other Apple errors propagate.

Preview produces an `UPDATE_APP_REVIEW_INFORMATION` action for changed, supplied fields. When the version string changes, all supplied review fields are reapplied. Omitting the object or individual fields preserves existing values. Set `notes` to an empty string to clear notes. Apply creates missing review details or patches existing details after version metadata actions, so a newly created version receives the information. Demo account settings and review attachments are outside this configuration.

API resource: [Apple App Store review details](https://developer.apple.com/documentation/appstoreconnectapi/app-store-review-details).

Apple rejections preserve the error code, title, detail, and source pointer in the normal CLI stderr output, without requiring debug logging.
