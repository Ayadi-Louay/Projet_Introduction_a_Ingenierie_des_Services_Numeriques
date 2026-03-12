## 🐛 Dépannage - Signalement ne fonctionne pas

### Problèmes Corrigés dans cette itération

#### 1. **ApiService - Headers HTTP incorrects** ✅ FIXED
**Problème:** 
- Les headers étaient passés en tant qu'objet simple `{ Authorization: ... }` 
- Au lieu de passer une instance `HttpHeaders` correcte

**Solution:**
```typescript
private getAuthHeaders() {
  const token = localStorage.getItem("token");
  let headers = new HttpHeaders();
  headers = headers.set('Content-Type', 'application/json');
  
  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  } else {
    headers = headers.set('Authorization', '');
  }
  
  return { headers }; // ✅ Retourner objet avec 'headers' clé
}

submitReport(data: any) {
  console.log('Sending report:', data); // 🐛 DEBUG
  return this.http.post(`${this.baseUrl}/health/reports/submit`, data, this.getAuthHeaders());
}
```

#### 2. **Component submitForm() - Validation trop stricte** ✅ FIXED
**Problème:** 
- Exigeait `symptomDuration` ET `selectedGovernorate` 
- La durée n'est pas toujours nécessaire

**Solution:**
```typescript
submitForm() {
  if (this.selectedSymptoms.length > 0 && this.selectedGovernorate) {
    // ✅ Seulement symptômes + gouvernorate requis
    const payload = this.buildReportPayload();
    console.log('Submitting payload:', payload); // 🐛 DEBUG
    this.api.submitReport(payload).subscribe({
      next: (res: any) => {
        console.log('Response received:', res); // 🐛 DEBUG
        if (res.success) {
          this.submissionSuccess.set(true);
        } else {
          alert('Erreur: ' + (res.message || 'Une erreur est survenue'));
        }
      },
      error: (err) => {
        console.error('HTTP error', err); // 🐛 DEBUG
        alert('Erreur de connexion: ' + (err?.message || 'Impossible de se connecter'));
      },
    });
  } else {
    alert('Veuillez remplir tous les champs requis');
  }
}
```

#### 3. **Backend - Logging pour debugging** ✅ ADDED
**Ajout:**
```java
// HealthServiceImpl.java
private static final Logger logger = LoggerFactory.getLogger(HealthServiceImpl.class);

@Override
public HealthReport submitReport(String userId, HealthReportDTO reportDTO) {
  logger.info("Starting submitReport with userId: {} and governorate: {}", userId, reportDTO.getGovernorate());
  // ... save logic ...
  logger.info("Report saved successfully with id: {}", savedReport.getId());
  return savedReport;
}

// HealthController.java
} catch (Exception e) {
  e.printStackTrace(); // ✅ Stack trace dans les logs
  return ResponseEntity.badRequest()...
}
```

---

## 🧪 Guide de Test Complet

### Test 1: Vérifier la requête HTTP
```bash
# 1. Ouvrir DevTools (F12) -> Network
# 2. Aller à http://localhost:4200 (ou 3000)
# 3. Remplir le formulaire:
#    - Symptômes: Sélectionner au moins 1
#    - Gouvernorate: OBLIGATOIRE (ex: Tunis)
# 4. Cliquer "Soumettre mon signalement"
# 5. Vérifier dans Network tab:
#    - Requête: POST http://localhost:8080/api/health/reports/submit
#    - Status: 200 (ou au moins pas 404/500)
#    - Response: {"success": true, "data": {...}}
```

### Test 2: Vérifier les logs Frontend (F12 Console)
```
✅ "Submitting payload: {...}"
✅ "Response received: {...}"
ou
❌ "HTTP error: {...}"
```

### Test 3: Vérifier les logs Backend
```bash
# Terminal où le backend tourne:
[INFO] Starting submitReport with userId: test-user-id and governorate: Tunis
[INFO] Report saved successfully with id: 65a1b2c3d4e5f6g7h8i9j0k1

# OU si erreur:
java.lang.Exception: ...
```

### Test 4: Vérifier la base de données
```
1. Aller sur https://cloud.mongodb.com
2. Clusters -> salemtytn
3. Collections -> salemtytn.health_reports
4. Chercher le nouveau document
5. Vérifier les champs:
   - symptomList: ["Toux", "Fièvre"]
   - governorate: "Tunis"
   - status: "PENDING"
   - anonymous: true
```

---

## 🔍 Checklist de Diagnostic Rapide

| Élément | ✅ OK | ❌ Problème |
|---------|--------|----------|
| **Frontend charge** | Page visible | Erreur blanc |
| **Formulaire remplissable** | Input répondent | Champs gris/désactivés |
| **Bouton cliquable** | Boutton active | Bouton grisé |
| **DevTools Network** | POST 200 | 404/500/CORS error |
| **Response JSON** | `{"success": true}` | `{"success": false}` ou erreur |
| **Console Frontend** | Logs debug clairs | Erreurs rouge |
| **Logs Backend** | INFO messages | Exceptions/Errors |
| **MongoDB** | Document créé | Collection vide |

---

## 🚀 Étapes de Lancement

### Backend
```bash
cd backend
mvn spring-boot:run
# Attend: "Started SalemtyTnApplication in X.XXX seconds"
```

### Frontend
```bash
cd Salemty-TN
npm install
npm start
# Attend: "Application bundle generated successfully"
```

### Tester
```
1. Ouvrir http://localhost:4200
2. Naviguer vers "Signalez vos symptômes"
3. Remplir et soumettre
4. Vérifier MongoDB
```

---

## ❌ Problèmes Connus

### CORS Error dans Console
```
Access to XMLHttpRequest at 'http://localhost:8080/api/health/reports/submit' 
from origin 'http://localhost:4200' has been blocked by CORS policy
```
**Solution:** Backend configuration.properties:
```properties
spring.web.cors.allowed-origins=http://localhost:4200,http://localhost:3000
```

### HTTP 404
```
POST http://localhost:8080/api/health/reports/submit 404 (Not Found)
```
**Solution:** Vérifier que l'URL est exacte et le controller mappé correctement

### HTTP 500
```
POST http://localhost:8080/api/health/reports/submit 500 (Internal Server Error)
```
**Solution:** Voir les logs backend pour l'exception

### JSON Parse Error
```
SyntaxError: Unexpected token < in JSON at position 0
```
**Solution:** Backend retourne du HTML au lieu de JSON (probablement une erreur 500 ou 404)

---

## 📋 Fichiers Modifiés

| Fichier | Change |
|---------|--------|
| Salemty-TN/src/app/services/api.service.ts | ✅ HttpHeaders fix + logging |
| Salemty-TN/src/app/pages/signaler.component.ts | ✅ Validation relâchée + erreurs |
| backend/.../HealthServiceImpl.java | ✅ Logging ajouté |
| backend/.../HealthController.java | ✅ Stack trace ajoutée |

**Statut:** ✅ Ready to test
