#!/bin/bash

# Script de test de l'API Salemty Authentication
# Assurez-vous que le backend est lancé sur le port 8081

API_URL="http://localhost:8081/api"
EMAIL="testuser@example.com"
PASSWORD="password123"
FIRST_NAME="John"
LAST_NAME="Doe"
PHONE="+21699999999"

echo "=== TEST API SALEMTY ==="
echo ""

# Test 1: Register
echo "1. TEST INSCRIPTION (REGISTER)"
echo "================================"
REGISTER_REQUEST="{
  \"firstName\": \"$FIRST_NAME\",
  \"lastName\": \"$LAST_NAME\",
  \"email\": \"$EMAIL\",
  \"phone\": \"$PHONE\",
  \"password\": \"$PASSWORD\"
}"

echo "Request:"
echo "$REGISTER_REQUEST"
echo ""

REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/auth/register" \
  -H "Content-Type: application/json" \
  -d "$REGISTER_REQUEST")

echo "Response:"
echo "$REGISTER_RESPONSE"
echo ""

# Extract token if successful
TOKEN=$(echo "$REGISTER_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$TOKEN" ]; then
    echo "✓ Inscription réussie!"
    echo "Token: $TOKEN"
    echo ""
else
    echo "✗ Erreur lors de l'inscription"
    echo ""
fi

# Test 2: Login
echo "2. TEST CONNEXION (LOGIN)"
echo "=========================="
LOGIN_REQUEST="{
  \"email\": \"$EMAIL\",
  \"password\": \"$PASSWORD\"
}"

echo "Request:"
echo "$LOGIN_REQUEST"
echo ""

LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "$LOGIN_REQUEST")

echo "Response:"
echo "$LOGIN_RESPONSE"
echo ""

# Extract token if successful
LOGIN_TOKEN=$(echo "$LOGIN_RESPONSE" | grep -o '"token":"[^"]*' | cut -d'"' -f4)

if [ ! -z "$LOGIN_TOKEN" ]; then
    echo "✓ Connexion réussie!"
    echo "Token: $LOGIN_TOKEN"
else
    echo "✗ Erreur lors de la connexion"
fi
