<?php

use Illuminate\Support\Facades\Route;

Route::redirect('/', '/books/create');

Route::view('/books', 'books.index')
    ->name('books.index');

Route::view('/books/create', 'books.create')
    ->name('books.create');

Route::view('/books/{id}/edit', 'books.edit')
    ->whereNumber('id')
    ->name('books.edit');

Route::view('/books/{id}', 'books.show')
    ->whereNumber('id')
    ->name('books.show');