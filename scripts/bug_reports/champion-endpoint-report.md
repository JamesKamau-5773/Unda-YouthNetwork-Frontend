Title: Champion Self-Registration Endpoint — Bug Report

Summary
- Endpoint: POST /api/champions/register
- Observed issues: intermittent server error (500: "validate_phone is not defined") previously; current test returned 400 validation error "Missing required field: full_name" when sending camelCase fields.
- Environment: local API at http://127.0.0.1:5000 (used by smoke tests)

Reproduction (minimal)
1) Failing request we used in smoke-poll (camelCase keys) — returned 400:

curl -i -X POST http://127.0.0.1:5000/api/champions/register \
  -H "Content-Type: application/json" \
  -d '{ "fullName": "Smoke Poll User", "dob": "2000-01-01", "gender": "Other", "phone": "+2547XXXXXXXX", "consent_obtained": true }'

Observed response (smoke-poll):
HTTP/1.1 400
{ "error": "Missing required field: full_name", "success": false }

2) Earlier manual test (different run) returned a 500 error with message:
{ "error": "Registration failed: name 'validate_phone' is not defined", "success": false }

API contract (expected)
- Endpoint expects snake_case JSON keys. Example expected payload (based on frontend `championService.register` mapping):
{
  "full_name": "Full Name",
  "gender": "Female|Male|Other",
  "date_of_birth": "YYYY-MM-DD",
  "phone_number": "+2547XXXXXXXX",
  "county_sub_county": "County / Sub-county",
  "consent_obtained": true,
  // optional
  "email": "user@example.org",
  "alternative_phone_number": "+2547YYYYYYYY",
  "emergency_contact_name": "Name",
  "emergency_contact_phone": "+2547ZZZZZZZZ",
  "current_education_level": "University",
  "education_institution_name": "Institute",
  "course_field_of_study": "Psychology",
  "year_of_study": "2",
  "motivation": "...",
  "recruitment_source": "Referral"
}

Working client example (curl)
curl -i -X POST http://127.0.0.1:5000/api/champions/register \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "Smoke Poll User",
    "gender": "Other",
    "date_of_birth": "2000-01-01",
    "phone_number": "+2547XXXXXXXX",
    "consent_obtained": true
  }'

(If this still returns 400, include returned body in the ticket.)

Observed behavior vs expected
- Observed: 400 when sending camelCase keys — server validation expects snake_case.
- Observed earlier: 500 due to missing `validate_phone` function — indicates possible inconsistent code paths or missing helper in production.
- Expected: Endpoint should validate consistently and return clear 4xx validation errors for missing/invalid fields; should not return 500 due to undefined server-side functions.

Impact
- Frontend may send camelCase (some scripts or test code did). The official frontend `championService.register` maps to snake_case, but external integrators or test scripts may inadvertently send camelCase and get confusing errors.
- Server 500s are blocking for production and must be fixed in backend code.

Recommended actions
1. Backend: Fix server error
   - Ensure `validate_phone` (or equivalent helper) is defined and imported where used, or replace with robust phone validation library.
   - Add comprehensive try-catch with clear 4xx validation responses; avoid leaking server-side exceptions as 500 errors.
2. Backend: Normalize or accept both camelCase and snake_case (optional)
   - Option A: Document and enforce snake_case contract; return 422/400 with explicit missing-field messages.
   - Option B: Accept camelCase as well (map keys server-side) to be more forgiving to clients.
3. Frontend/test harness: Use the canonical payload shape (snake_case) when calling the champion endpoint. The frontend `championService.register` already maps camelCase UI fields to the snake_case payload — ensure any external scripts follow the same mapping.
4. Backfill tests: Add automated integration tests exercising champion registration: valid payload (201), missing required (400), invalid phone (422), and the scenario producing the earlier 500 to confirm fix.

Attachments / Evidence
- `scripts/smoke-test.js` and `scripts/smoke-poll.js` (were used to reproduce). They live in the repo under `scripts/`.
- Terminal responses captured during runs (201 for member registration; 400 for champion with camelCase; earlier 500 seen during manual curl run).

Suggested ticket summary (copy/paste)
Title: POST /api/champions/register returns 500 (validate_phone undefined) and 400 when sent camelCase keys
Body:
- Steps to reproduce: run `node scripts/smoke-poll.js` or curl examples included above
- Expected: 201 on valid payload; 400 with clear validation message on missing/invalid fields
- Actual: intermitent 500 referencing undefined `validate_phone`; current run returned 400 "Missing required field: full_name" when sending camelCase JSON (server expects snake_case). See attached logs.

If you want, I can:
- Open a concise GitHub issue file in this repo under `scripts/bug_reports/` (already created), or
- Prepare a short PR for the frontend to ensure all champion calls include full required fields and use snake_case keys, or
- Draft an email/Slack message for the backend team including reproduction steps and curl examples.


