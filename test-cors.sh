#!/bin/bash

# Test CORS for TaxPilot API
# Replace YOUR_DOMAIN with your actual production domain

YOUR_DOMAIN="https://yourdomain.com"
API_URL="https://api.taxpilot.it/api/services"

echo "Testing CORS for domain: $YOUR_DOMAIN"
echo "API URL: $API_URL"
echo ""

# Send OPTIONS request (preflight)
echo "1. Testing OPTIONS (preflight) request..."
curl -i -X OPTIONS "$API_URL" \
  -H "Origin: $YOUR_DOMAIN" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: Content-Type" \
  -v

echo ""
echo "---"
echo ""

# Send actual GET request
echo "2. Testing GET request..."
curl -i -X GET "$API_URL" \
  -H "Origin: $YOUR_DOMAIN" \
  -H "Content-Type: application/json" \
  -v


