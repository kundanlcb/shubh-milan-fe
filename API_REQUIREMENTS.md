| Feature Area      | Method | Endpoint                        | Description                          |
|-------------------|--------|----------------------------------|--------------------------------------|
| Auth/User         | POST   | /api/auth/register               | Register a new user                  |
| Auth/User         | POST   | /api/auth/login                  | User login                           |
| Auth/User         | POST   | /api/auth/logout                 | User logout                          |
| Auth/User         | GET    | /api/user/profile                | Fetch own profile                    |
| Auth/User         | PUT    | /api/user/profile                | Update own profile                   |
| Auth/User         | GET    | /api/user/{id}                   | Fetch another user's profile         |
| Auth/User         | GET    | /api/user/search                 | Search/filter users                  |
| Posts/Feed        | GET    | /api/posts                       | Fetch feed (paginated)               |
| Posts/Feed        | POST   | /api/posts                       | Create a post (with media/caption)   |
| Posts/Feed        | GET    | /api/posts/{id}                  | Fetch single post                    |
| Posts/Feed        | POST   | /api/posts/{id}/like             | Like/unlike a post                   |
| Posts/Feed        | POST   | /api/posts/{id}/comment          | Add a comment to a post              |
| Posts/Feed        | GET    | /api/posts/{id}/comments         | Fetch comments for a post            |
| Stories           | GET    | /api/stories                     | Fetch all stories                    |
| Stories           | POST   | /api/stories                     | Create a new story                   |
| Stories           | GET    | /api/stories/{id}                | Fetch a single story                 |
| Chat/Messaging    | GET    | /api/chats                       | Fetch chat list                      |
| Chat/Messaging    | GET    | /api/chats/{id}/messages         | Fetch messages in a chat             |
| Chat/Messaging    | POST   | /api/chats/{id}/messages         | Send a message                       |
| Chat/Messaging    | POST   | /api/chats                       | Start a new chat                     |
| Notifications     | GET    | /api/notifications               | Fetch notifications                  |
| Notifications     | POST   | /api/notifications/read          | Mark notifications as read           |
| Media Upload      | POST   | /api/upload                      | Upload image/video                   |
| Search/Filters    | GET    | /api/filters                     | Fetch filter options for search      |
| Settings          | GET    | /api/settings                    | Fetch app/user settings              |
