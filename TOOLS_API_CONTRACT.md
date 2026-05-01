# Octalve Cloud Tools API Contract

This project uses `output: "export"`, so real API routes should not be added under `src/app/api` in this frontend repository. Static export cannot run server-side route handlers on DirectAdmin public_html.

The frontend includes an API client layer at:

`src/features/cloud/tools/api/tools-api.ts`

Default API base:

`https://console.octalve.cloud/api/tools`

Optional environment override:

`NEXT_PUBLIC_OCTALVE_TOOLS_API_BASE=https://console.octalve.cloud/api/tools`

## Future backend endpoints

### POST `/api/tools/domain-name-generator`
Payload:
```json
{ "business": "Octalve Foods", "industry": "food delivery", "extension": ".com" }
```
Response:
```json
{ "ideas": [{ "name": "octalvefoods.com", "reason": "Clean and direct" }] }
```

### POST `/api/tools/domain-search`
Payload:
```json
{ "domain": "octalve.com" }
```
Response:
```json
{ "domain": "octalve.com", "available": false, "suggestions": [] }
```

### POST `/api/tools/whois-lookup`
Payload:
```json
{ "domain": "octalve.com" }
```
Response:
```json
{ "domain": "octalve.com", "status": "registered", "registrar": "Example Registrar", "note": "RDAP data returned" }
```

### POST `/api/tools/malware-scan`
Payload:
```json
{ "url": "https://example.com" }
```
Response:
```json
{ "url": "https://example.com", "status": "No immediate risk signals", "checks": ["No blacklist match"] }
```

### POST `/api/tools/privacy-policy`
Payload:
```json
{ "businessName": "Example Ltd", "website": "https://example.com", "email": "info@example.com" }
```
Response:
```json
{ "document": "Generated privacy policy text" }
```

### POST `/api/tools/terms-of-service`
Payload:
```json
{ "businessName": "Example Ltd", "website": "https://example.com", "email": "info@example.com" }
```
Response:
```json
{ "document": "Generated terms of service text" }
```

### GET `/api/tools/domain-sellers`
Response:
```json
{ "sellers": [] }
```

## Backend integrations to consider

- Registrar/domain availability API
- RDAP/WHOIS provider
- Google Safe Browsing or equivalent website security source
- Blacklist checking source
- Document generation service
- Console authentication, service ordering and invoice system

## Important

Do not add backend API routes to this static exported frontend unless the deployment model changes from DirectAdmin static export to a Node server/Vercel/container deployment.
