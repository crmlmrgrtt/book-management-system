@extends('layouts.app')
@section('title', 'Books')
@section('page', 'books-index')
@section('content')
<div class="page-header"><div><p class="eyebrow">BOOK MANAGEMENT SYSTEM</p><h1>Book Records</h1><p>View, edit, or remove books.</p></div><a class="btn" href="{{ route('books.create') }}">Add Books</a></div>
<div id="bookNotice" class="notice" role="status" hidden></div>
<section class="glass-card table-card"><div class="section-heading"><h2>All Books</h2><button type="button" class="btn btn-secondary" id="refreshBook">Refresh</button></div>
<div class="table-responsive"><table><thead><tr><th>Book ID</th><th>Title</th><th>Author</th><th>Genre</th><th>Year Published</th><th>Actions</th></tr></thead>
<tbody id="bookTableBody"><tr><td colspan="6" class="empty-state">Loading student records...</td></tr></tbody></table></div></section>
@endsection
