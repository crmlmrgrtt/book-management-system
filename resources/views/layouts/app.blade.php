<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>@yield('title', 'Book Management System')</title>
<link rel="stylesheet" href="{{ asset('css/app.css') }}">
<script src="{{ asset('js/app.js') }}" defer></script>
</head>
<body data-page="@yield('page', '')" data-book-id="@yield('id', '')">
<div class="aurora-background" aria-hidden="true"><div class="aurora-orb aurora-orb--red"></div><div class="aurora-orb aurora-orb--crimson"></div><div class="aurora-orb aurora-orb--white"></div></div>

<nav class="navbar">
    <div class="nav-inner">
        <a href="{{ route('books.create') }}" class="navbar-brand">
            Book Management System
        </a>

        <div class="nav-links">
            <a href="{{ '/books' }}">Books</a>
            <a href="{{ route('books.create') }}">Add Book</a>
            
        </div>
    </div>
</nav>

<main class="container">@yield('content')</main>
</body></html>

