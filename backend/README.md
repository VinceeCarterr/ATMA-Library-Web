KELAS C Kelompok 1

Anggota kelompok:
1. Vince Carter - 220711806
-  frontend, integrasi, backend:
    - LandingPage, Login - Logout, Register
    - Anggota: Home, Category, Book
    - Admin: bookAdmin, editBook, Addbook, HomeAdmin + returning details (tabel transaksi)
    - Transaksi

2. Vania Lucy Syntya - 220711829
    - frontend home admin, book admin/gapake, add new book
    - ⁠backend add book, edit book(gagal)
    - integrasi frontend add new book ke backend

3. Veronica Regina Mambu -220711948
    - frontend UI Returning, UI User Returning
    - backend Bagian user id 
    - integrasi frontend nyambung user id borrow buku apa aja

4. Frans Daniel Rajagukguk - 220711826
    - Backend Profile, MyBooks
    - Integrasi Profile, MyBooks
    - Frontend Profile, MyBooks

Username & Pasword Login:
1. Login User:
    - email : Vania@gmail.com
    - password : 12345678
2. Login Admin:
    - email: admin@gmail.com
    - password : securepassword

Bonus yang diambil:
1. Routes API
    Public Routes
    -   POST /api/register - Register a new user (both roles).
    -   POST /api/login - Login for both roles.
    -   GET /api/buku/top - Get top books.
    -   POST /api/user/profile-photo - Update user profile photo.
    -   GET /api/user/search - Search for users (admin only).
    
    Authenticated Routes
    a.  Profile Routes
    -   GET /api/profile - Get current user's profile.
    -   PUT /api/profile - Update current user's profile.
    -   POST /api/logout - Logout current user.

    b.  Buku Routes
    -   GET /api/buku - Get all books.
    -   GET /api/buku/{id} - Get a single book by ID.
    -   POST /api/buku - Add a new book.
    -   PUT /api/buku/{id} - Update book details by ID.
    -   DELETE /api/buku/{id} - Delete a book by ID.

    c.  Peminjaman Routes
    -   GET /api/peminjaman - Get all loans (admin: all, anggota: own).
    -   GET /api/peminjaman/{id} - Get a single loan by ID (admin: all, anggota: own).
    -   POST /api/peminjaman - Create a new loan.
    -   PUT /api/peminjaman/{id} - Update loan details.
    -   PATCH /api/peminjaman/{id} - Update loan details (alternative method).
    -   DELETE /api/peminjaman/{id} - Delete a loan by ID.
    -   GET /api/peminjaman/user/{id_user} - Get loans by user ID.
    -   POST /api/peminjaman/check - Check if a user can borrow a specific book.

    d.  Pengembalian Routes
    -   GET /api/pengembalian - Get all returns (admin: all, anggota: own).
    -   GET /api/pengembalian/{id} - Get a single return by ID (admin: all, anggota: own).
    -   POST /api/pengembalian - Create a return record.
    -   PUT /api/pengembalian/{id} - Update a return record.
    -   DELETE /api/pengembalian/{id} - Delete a return record.
    -   PUT /api/pengembalian/{id_pengembalian}/clear-fine - Clear fines for a return record.

    e.  User Routes
    -   GET /api/user - Get all users (admin only).
    -   GET /api/user/{id} - Get a single user (admin: any, anggota: own).
    -   POST /api/user - Create a new user.
    -   PUT /api/user/{id} - Update user details by ID.
    -   DELETE /api/user/{id} - Delete a user by ID.
    -   POST /api/user/profile-photo - Update user profile photo.

2. React : https://github.com/VinceeCarterr/PW_C_Library_React