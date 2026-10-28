@extends('layouts.app')
@section('title', 'Edit Book')
@section('page', 'books-edit')
@section('id', request()->route('id'))
@section('content')
<div class="form-page"><div class="page-header centered"><div><p class="eyebrow">UPDATE RECORD</p><h1>Edit Book</h1><p>Update the book information below.</p></div></div>
<div id="bookNotice" class="notice" role="status" hidden></div>
<section class="glass-card form-card"><form id="bookForm" novalidate>@include('books._form')
<div class="form-actions"><button type="submit">Save Changes</button><a id="cancelEditLink" href="{{ route('books.index') }}" class="btn btn-secondary">Cancel</a></div></form></section></div>
@endsection
