# Route SNU IE analytics

## Objective

Measure how students arrive at the site, find academic information, and respond to future UX changes. Visitors remain anonymous: the site never calls `identify()`.

PostHog is initialized in `js/analytics.js` with the US host, normal pageview/autocapture support, and session replay input masking. The SDK preserves its default landing URL, referrer, and UTM attribution properties; this site does not replace them.

## Event taxonomy

| Event | When it is captured | Properties |
| --- | --- | --- |
| `guide_opened` | A main-guide portal card or top-navigation link is chosen | `guide_name`, `source_location` (`home_card` or `top_navigation`) |
| `course_searched` | A non-empty course query remains after a 600 ms pause | `search_term`, `results_count` |
| `course_filter_selected` | A different course filter is selected | `filter_value`, `visible_results_count` |
| `rules_year_selected` | A valid admission-year choice changes | `year_group`, `selection_method` (`chip` or `input`) |
| `faq_opened` | An FAQ changes from closed to open | `faq_index`, `faq_question` |
| `official_site_clicked` | The root SNU IE website link is chosen | `source_page` |

`course_searched.results_count` is the number of course cards visible after the active search and filter are applied. Empty values and rapid, intermediate keystrokes are not sent. Controls with custom events are excluded from PostHog autocapture so the same interaction is not counted twice in the product-event taxonomy; site-wide autocapture remains enabled for other interactions.

## Primary KPI

**Information Discovery Rate** = sessions containing at least one of `guide_opened`, `course_searched`, `course_filter_selected`, `rules_year_selected`, or `faq_opened` ÷ total sessions.

Use a unique-session funnel or a session-level HogQL calculation, not total event counts.

## UTM convention

Use lowercase, stable values:

`?utm_source=kakao&utm_medium=student_council&utm_campaign=fall26_academic_guide`

`?utm_source=instagram&utm_medium=social&utm_campaign=fall26_academic_guide`

Recommended dimensions: `utm_source` identifies the platform, `utm_medium` identifies the distribution mechanism, and `utm_campaign` names a time-bounded initiative. Do not put names, student IDs, or free-form personal data in UTM parameters.

## Verify in PostHog

1. In PostHog Project settings, confirm `https://route-snu-ie.vercel.app/` is an allowed domain and enable Session Replay, heatmaps, and Web Vitals autocapture. Heatmaps and Web Vitals are project settings in addition to the browser SDK.
2. Open the deployed site with a test UTM URL, then use Live Events (or the Activity feed) filtered to your anonymous distinct ID.
3. Click a homepage guide card and a navigation guide link; use course search, change a filter, choose an admission-year chip, open then close/reopen an FAQ, and use the SNU IE footer link. Confirm the six event names and properties above.
4. Verify `$pageview`, `$autocapture`, `$web_vitals`, session recordings, and heatmaps separately. The course-search input should appear masked in replay while its debounced custom event carries the submitted search term.

## Baseline analysis

After enough traffic, first compare Information Discovery Rate by UTM channel and landing page. Then inspect guide demand, homepage-to-guide drop-off, course-search adoption and zero-result searches (`results_count = 0`), filter use, FAQ demand, and year-group demand. Save these as baseline insights before changing navigation or content, and reuse the same date window after each UX change.
