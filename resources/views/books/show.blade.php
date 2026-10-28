@extends('layouts.app')
@section('title', 'Book Details')
@section('page', 'books-show')
@section('id', request()->route('id'))
@section('content')
<div class="page-header"><div><p class="eyebrow">BOOK INFORMATION</p><h1>Book Details</h1></div><div class="page-actions"><a id="editBookLink" class="btn" href="{{ route('books.index') }}">Edit Book</a><a class="btn btn-secondary" href="{{ route('books.index') }}">Back to Books</a></div></div>
<div id="bookNotice" class="notice" role="status" hidden></div>
<section class="glass-card detail-card"><div id="bookDetails" class="details-grid"><p class="empty-state">Loading student details...</p></div><div class="form-actions"><button type="button" class="btn btn-danger" id="deleteBookButton">Delete Book</button></div></section>
@endsection
