# Shubh Milan Backend (Spring Boot) — Production-Ready Blueprint

This document specifies a production-ready Spring Boot backend for the Shubh Milan app — a matrimony + social media platform. It is tailored to the current React Native frontend in this repository and includes architecture, domain model, API contracts, security, data, messaging, observability, and operational guidance.

Version: 1.0


## 1. Goals and Non-Goals
- Goals
  - Provide a complete, scalable, secure backend design that supports matrimony features (profiles, partner preferences, search/matching) plus social features (posts, stories, likes, comments, chat, notifications).
  - Define REST/WebSocket APIs aligned with this frontend’s screens and mock data.
  - Ensure production readiness: authN/authZ, GDPR essentials, observability, CI/CD, migrations, testing, rate limiting, secure file handling, caching.
- Non-Goals
  - Building the backend here. This is a high-fidelity blueprint and API contract to implement in a separate Spring Boot project.


## 2. High-Level Architecture
- Java 21, Spring Boot 3.x
- Modules (Maven multi-module or Gradle multi-project):
  - core-domain: Entities, repositories, DTO mappers
  - core-service: Business services and domain logic
  - api-rest: Controllers, request/response DTOs, exception handlers
  - api-websocket: STOMP/WebSocket endpoints for chat, presence, notifications
  - integration: External services (S3-compatible storage, email/SMS, payment gateway for premium)
  - support: Security, observability, rate-limiter, config
- Data Stores
  - PostgreSQL (primary relational)
  - Redis (caching, session blacklists, rate limiter, presence)
  - S3-compatible object storage (MinIO in dev, AWS S3 in prod) for media (avatars, posts, stories)
  - Optional: Elasticsearch/OpenSearch for advanced profile search
- Messaging/Realtime
  - Spring WebSocket + STOMP for chat, typing indicators, online presence, in-app notifications
  - Optional: Kafka for event-driven pipelines (audit, recommendations, analytics)
- Deployment
  - Containerized (Docker), orchestrated (Kubernetes) with Horizontal Pod Autoscaling
  - API Gateway/Ingress with TLS termination


## 3. Security and Compliance
- Authentication: JWT (access + refresh). Optional social login via OAuth2.
- Authorization: Role-based (USER, ADMIN, MODERATOR). Fine-grained checks (resource ownership).
- Passwords: Argon2id or BCrypt with strong cost factors.
- Sensitive data encryption at rest (Postgres TDE or app-level column encryption for PII like phone/email).
- Input validation (Jakarta Validation) + centralized exception handling.
- Rate limiting & abuse prevention: per-IP and per-user via Redis (token bucket).
- CORS locked to mobile app package and admin console domains.
- Media upload: presigned URLs; virus scan (e.g., ClamAV sidecar) optional.
- Privacy/GDPR
  - Data export (user profile + activity JSON)
  - Account deletion (soft-delete -> retention -> purge)
  - Privacy levels: public, filtered, private
- Audit logging for admin actions and security events.


## 4. Domain Model (ERD Overview)
Key entities and relations (→ indicates relation):
- User (1) → (1) Profile
- User (1) → (n) Post
- User (1) → (n) Story
- User (1) → (n) Comment
- User (1) → (n) Like
- User (1) ↔ (n) ChatThread; ChatThread (1) → (n) ChatMessage
- User (1) → (n) MatchIntent (like/interest/connect requests)
- User (1) → (n) Notification
- User (1) → (n) PreferenceSnapshot (versioned partner preferences)
- MediaAsset polymorphic: maps to post/story/profile avatar
- Block/Report entities for safety

Core attributes:
- User: id, fullName, email, phone, roles, status, passwordHash, createdAt, lastLogin
- Profile: gender, age, profession, education, location, motherTongue, religion, salary, bio, photos[]
- PartnerPreferences: ageMin, ageMax, professions[], educations[], locations[], religions[], salaryRange
- Post: caption, media[], visibility, likeCount, commentCount, createdAt
- Story: media (image/video), expiresAt, viewersCount
- Comment: text, parentId (for threads)
- ChatThread: participantIds[2], lastMessageAt, unreadCounts
- ChatMessage: threadId, senderId, content(type: text/image/video), sentAt, deliveredAt, readAt
- Notification: type (like, comment, match, message), payload, readAt


## 5. API Design (aligned with this app)
Base URL: /api/v1
Auth: Bearer access token unless noted.

5.1 Auth
- POST /auth/register
  - req: fullName, email, phone, password, profile fields, partnerPreferences, accountType, privacyLevel
  - res: { userId, accessToken, refreshToken }
- POST /auth/login { emailOrPhone, password }
  - res: tokens
- POST /auth/refresh { refreshToken }
- POST /auth/logout
- POST /auth/otp/send { phone or email }
- POST /auth/otp/verify { code }

5.2 Users & Profiles
- GET /users/me
- PATCH /users/me { fullName?, accountType?, privacyLevel? }
- GET /profiles/:userId
- PATCH /profiles/me
  - body may include: age, gender, profession, education, location, motherTongue, religion, salary, bio, photos (keys from S3)
- GET /profiles?search=...&filters=...
  - filters: ageMin, ageMax, professions[], locations[], religions[], genders[], salaryMin, salaryMax
- POST /profiles/me/photos/presign { count, contentTypes[] } -> presigned upload URLs

5.3 Partner Preferences
- GET /preferences/me
- PUT /preferences/me { ageMin, ageMax, professions[], educations[], locations[], religions[], salaryRange }

5.4 Feed (Home)
- GET /feed
  - returns list of PostData:
    - id, user: { id, name, avatar, location, age, profession, religion, gender, salary }, media[], caption, likes, comments, timeAgo, isLiked
  - query params map 1:1 to HomeScreen filters (ageMin, ageMax, professions, locations, religions, genders, salaryMin, salaryMax)
- POST /posts
  - body: caption, mediaKeys[], visibility
- POST /posts/:postId/like
- DELETE /posts/:postId/like
- GET /posts/:postId/comments
- POST /posts/:postId/comments { text, parentId? }

5.5 Stories
- GET /stories
  - returns recent stories grouped by user; each story: { id, uri, type: image|video, createdAt, expiresAt }
- POST /stories
  - body: mediaKey, type
- POST /stories/:storyId/view

5.6 Matches / Interests
- POST /matches/:targetUserId/intent { type: "like" | "connect" }
- GET /matches
  - returns connections, pending outgoing, incoming requests
- POST /matches/:intentId/accept
- POST /matches/:intentId/decline

5.7 Chat (REST + WebSocket)
- GET /chat/threads
- POST /chat/threads { participantId }
- GET /chat/threads/:threadId/messages?before=msgId&pageSize=50
- WebSocket endpoint: /ws
  - STOMP destinations:
    - /app/chat.sendMessage (send)
    - /topic/chat.thread.{threadId} (subscribe)
    - /user/queue/notifications (personal notifications)
    - Presence: /topic/presence and /app/presence.update
  - Message payload: { threadId, type: text|image|video|typing, content, clientMessageId }

5.8 Notifications
- GET /notifications
- POST /notifications/:id/read
- WebPush/FCM integration optional for push notifications.

5.9 Admin/Moderation
- GET /admin/users
- POST /admin/users/:id/ban
- GET /admin/reports
- POST /admin/posts/:postId/hide


## 6. Mapping to Frontend Screens and Data
Based on src/screens and utils/homeData.ts:
- LoginScreen/RegisterScreen
  - Use Auth endpoints. Registration includes extensive profile + preference fields.
- HomeScreen
  - GET /feed with filters matching activeFilters (ageMin, ageMax, professions, locations, religions, genders, salaryMin, salaryMax)
  - Like/unlike post; open profile; comment triggers Chat or post comments.
- Stories/StoryViewer
  - GET /stories; POST /stories; view tracking.
- ProfileScreen/EditProfileScreen/UserProfileScreen
  - GET /users/me, GET /profiles/:userId, PATCH /profiles/me, photo uploads via presigned URLs.
- SearchScreen
  - GET /profiles with filters, fuzzy search by name/location/profession.
- ChatScreen/ChatConversationScreen
  - Threads list, messages pagination. WebSocket for realtime updates.
- NotificationScreen
  - GET /notifications. WebSocket push for new events.
- AddPostScreen/AddStoryScreen
  - Presigned upload + POST creation.


## 7. Detailed Data Schemas (DTOs)
Note: JSON examples abbreviated for brevity.

UserSummary
{
  "id": "uuid",
  "name": "Priya Sharma",
  "avatar": "https://cdn/.../avatar.jpg",
  "location": "Darbhanga",
  "age": 25,
  "profession": "Teacher",
  "religion": "Hindu",
  "gender": "Female",
  "salary": 400000
}

PostData
{
  "id": "uuid",
  "user": UserSummary,
  "media": [ {"id": "uuid", "uri": "https://...", "type": "image"} ],
  "caption": "...",
  "likes": 24,
  "comments": 8,
  "timeAgo": "2h",
  "isLiked": false,
  "createdAt": "2025-08-24T20:00:00Z"
}

Profile
{
  "userId": "uuid",
  "gender": "Female",
  "age": 25,
  "profession": "Teacher",
  "education": "Bachelor's Degree",
  "location": "Darbhanga",
  "motherTongue": "Maithili",
  "religion": "Hindu",
  "salary": 400000,
  "bio": "...",
  "photos": ["s3://.../key1", "s3://.../key2"]
}

PartnerPreferences
{
  "ageMin": 21,
  "ageMax": 30,
  "professions": ["Engineer", "Doctor"],
  "educations": ["Bachelor", "Master"],
  "locations": ["Darbhanga", "Muzaffarpur"],
  "religions": ["Hindu"],
  "genders": ["Male", "Female"],
  "salaryMin": 300000,
  "salaryMax": 5000000
}

ChatMessage
{
  "id": "uuid",
  "threadId": "uuid",
  "senderId": "uuid",
  "type": "text",
  "content": "Hello",
  "sentAt": "...",
  "deliveredAt": "...",
  "readAt": "..."
}

Notification
{
  "id": "uuid",
  "type": "LIKE|COMMENT|MATCH|MESSAGE",
  "payload": {"postId": "uuid", "actor": UserSummary},
  "createdAt": "...",
  "readAt": null
}


## 8. Persistence Model (JPA)
- Use UUID as primary keys (java.util.UUID) for external exposure.
- Entities annotated with @Entity, @Table, soft-delete via @SQLDelete + @Where (deleted=false) where needed.
- Many-to-many handled via join tables (e.g., PostLike, ThreadParticipant).
- Use Flyway for migrations (V1__init.sql, V2__indexes.sql, ...). Add composite indexes on search fields (age, location, gender, profession, salary).


## 9. Services and Business Rules
- MatchingService
  - Computes suggested profiles based on PartnerPreferences + activity signals (likes, chats).
- FeedService
  - Assembles feed filtered by user’s preferences; caches with Redis per filter signature.
- MediaService
  - Presigned upload/download, MIME validation, image/video transcode hooks.
- StoryService
  - TTL expiry and background cleanup.
- ChatService
  - Thread creation rules (only matched or premium users can start?), read receipts, typing indicators, moderation of abusive content.
- NotificationService
  - Creates events on like, comment, message, match; fan-out via WebSocket and push.
- SafetyService
  - Block user, report content, auto-hide thresholds.


## 10. Security Layer Details
- JWT filter chain with Spring Security 6 (no WebSecurityConfigurerAdapter).
- Password policy: min length 8, complexity checks, breach password check (optional HIBP API).
- Refresh token rotation with revocation list (Redis). Device-based sessions optional.
- Scoped roles: USER default. ADMIN/MODERATOR endpoints under /admin/**.


## 11. Configuration
- application.yml profiles: local, dev, prod
- Externalized secrets via environment variables / Kubernetes Secrets.
- Example keys:
  - spring.datasource.url, username, password
  - spring.redis.host, port
  - storage.s3.bucket, endpoint, accessKey, secretKey
  - jwt.secret, jwt.accessTtl, jwt.refreshTtl
  - cors.allowedOrigins


## 12. Observability and Ops
- Logging: JSON logs (logstash encoder)
- Metrics: Micrometer + Prometheus
- Tracing: OpenTelemetry (OTLP) to collector/Jaeger/Tempo
- Health: /actuator/health, readiness/liveness probes
- Audit: DB table + logs for sensitive actions


## 13. Testing Strategy
- Unit tests: services, validators (JUnit 5 + Mockito)
- Slice tests: @DataJpaTest, @WebMvcTest
- Integration tests: Testcontainers (Postgres, Redis, MinIO), @SpringBootTest
- Contract tests: Spring Cloud Contract or OpenAPI-based tests
- Load tests: k6 or Gatling scripts (critical paths: login, feed, like, chat)


## 14. API Documentation & SDKs
- OpenAPI 3 via springdoc-openapi. Host Swagger UI at /swagger-ui/index.html.
- Generate TypeScript client SDK for this RN app during CI (openapi-generator), publish as private npm package.


## 15. CI/CD
- GitHub Actions/GitLab CI pipeline:
  - build, unit tests, integration tests (Testcontainers), image build, push
  - apply DB migrations
  - deploy to staging, run smoke tests, then prod
- SAST/DAST scans (e.g., SonarQube, OWASP ZAP) in pipeline


## 16. Rate Limiting and Quotas
- Redis-backed token bucket:
  - /auth/*: strict to mitigate brute-force
  - /posts/* likes/comments: moderate
  - /chat/*: per-thread message rate


## 17. Example Spring Boot Project Structure (Gradle)
root
- build.gradle.kts, settings.gradle.kts
- modules
  - core-domain
  - core-service
  - api-rest
  - api-websocket
  - integration
  - support
- docker/
- k8s/


## 18. Sample Endpoints Request/Response
- GET /api/v1/feed?ageMin=23&ageMax=30&professions=Teacher&locations=Darbhanga&religions=Hindu&genders=Female&salaryMin=300000&salaryMax=5000000
  - 200 OK -> Array<PostData> matching src/utils/homeData.ts shape.
- POST /api/v1/posts/{id}/like
  - 200 OK { likes: 25, isLiked: true }
- GET /api/v1/profiles?search=anjali&locations=Muzaffarpur
  - 200 OK -> Array<UserSummary>


## 19. Data Migration Seeds (Dev)
- Create seed scripts to mirror mock names (Priya Sharma, Anjali Mishra, etc.) for realistic dev/testing.


## 20. Premium Features and Monetization
- Account types: free vs premium
  - Free: limited chat initiations per day, view-limited profiles, fewer search filters
  - Premium: unlimited messaging, advanced filters, who viewed me, read receipts
- Integrate payment gateway (Razorpay/Stripe) via integration module, webhook handlers.


## 21. Edge Cases & Constraints
- PrivacyLevel: filtered implies only compatible users (based on preferences) can see content.
- Age verification on registration; validation for salary, locations list.
- Story expiry exactly 24h with timezone correctness.
- Media moderation and size limits.
- Internationalization for names and locales (e.g., Maithili/Hindi support).


## 22. OpenAPI Outline (to implement)
- Define components for UserSummary, Profile, PartnerPreferences, PostData, Story, Comment, ChatThread, ChatMessage, Notification.
- SecuritySchemes: bearerAuth (JWT)
- Tags: Auth, Users, Profiles, Feed, Posts, Stories, Matches, Chat, Notifications, Admin


## 23. Implementation Checklist
- [ ] Initialize Spring Boot 3 project (Gradle, Java 21)
- [ ] Add core dependencies: spring-boot-starter-web, security, data-jpa, validation, actuator, springdoc-openapi, websocket, redis, s3 client, jjwt
- [ ] Configure Postgres + Flyway + Redis
- [ ] Implement entities and repositories
- [ ] Implement DTOs and mappers (MapStruct)
- [ ] Implement JWT auth, password hashing, refresh rotation
- [ ] Implement Users/Profiles/Preferences CRUD
- [ ] Implement Feed/Posts/Comments/Likes
- [ ] Implement Stories with TTL cleanup
- [ ] Implement Matches/Interests
- [ ] Implement Chat (REST + WebSocket)
- [ ] Implement Notifications (WebSocket + optional push)
- [ ] Implement Rate Limiter
- [ ] Add OpenAPI and generate TS SDK for RN app
- [ ] Add Testcontainers-based integration tests
- [ ] Add CI/CD pipeline


## 24. Local Dev Environment
- Use Docker Compose with services: postgres, redis, minio, mailhog, clamav (optional)
- Provide sample env file and Makefile/Gradle tasks to run stack.


## 25. Versioning and Backward Compatibility
- Use /api/v1 prefix now; allow parallel /v2 in future.
- Add deprecation headers for changed endpoints.


## 26. Appendix: Database Tables (Sketch)
- users(id, full_name, email, phone, roles, status, password_hash, created_at, last_login)
- profiles(user_id FK, gender, age, profession, education, location, mother_tongue, religion, salary, bio)
- profile_photos(id, user_id FK, key, sort)
- partner_preferences(user_id FK, age_min, age_max, professions jsonb, educations jsonb, locations jsonb, religions jsonb, salary_min, salary_max, genders jsonb)
- posts(id, user_id FK, caption, visibility, created_at)
- post_media(id, post_id FK, key, type)
- post_likes(post_id FK, user_id FK, created_at)
- comments(id, post_id FK, user_id FK, text, parent_id FK, created_at)
- stories(id, user_id FK, key, type, created_at, expires_at)
- story_views(story_id FK, viewer_id FK, viewed_at)
- matches(id, requester_id FK, target_id FK, type, status, created_at, responded_at)
- chat_threads(id, p1_id FK, p2_id FK, last_message_at)
- chat_messages(id, thread_id FK, sender_id FK, type, content, created_at, delivered_at, read_at)
- notifications(id, user_id FK, type, payload jsonb, created_at, read_at)
- blocks(id, blocker_id, blocked_id, created_at)
- reports(id, reporter_id, target_type, target_id, reason, created_at, status)


## 27. Notes for Frontend Integration
- Time fields use ISO-8601 UTC; frontend can compute timeAgo.
- URIs returned should be CDN/S3 public URLs or signed GET URLs; RN can render images/videos directly.
- Pagination: cursor-based for feeds and messages (before/after with pageSize).
- Error format: { code, message, details? }. Use standard HTTP status codes.


---
This blueprint aligns with the current frontend mock data and screens and can be used to implement a full production-grade Spring Boot backend for Shubh Milan.
