@extends('layouts.app')
@section('title', 'Add Book')
@section('page', 'books-create')
@section('content')
<div class="form-page"><div class="page-header centered"><div><p class="eyebrow">NEW RECORD</p><h1>Add Book</h1><p>Enter the book's information below.</p></div></div>
<div id="bookNotice" class="notice" role="status" hidden></div>
<section class="glass-card form-card"><form id="bookForm" novalidate>@include('books._form')
<div class="form-actions"><button type="submit">Add Book</button><a href="{{ '/books' }}" class="btn btn-secondary">
    View Books
</a></div></form></section></div>
@endsection

