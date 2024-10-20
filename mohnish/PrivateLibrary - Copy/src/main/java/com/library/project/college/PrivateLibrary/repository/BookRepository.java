package com.library.project.college.PrivateLibrary.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.library.project.college.PrivateLibrary.entities.BookEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<BookEntity,String> {
   @Query("SELECT b FROM BookEntity b WHERE b.title = :title AND b.available = true")
   List<BookEntity> findAvailableBooksByTitle( String title);
   @Query(value = "SELECT b.book_id,b.available, b.publisher_id, b.title, b.author_name, b.edition, b.language, b.isbn, b.total_pages, b.publication_year, b.category " +
           "FROM book_entity b " +
           "INNER JOIN (SELECT isbn, MIN(book_id) AS min_book_id FROM book_entity WHERE available = true GROUP BY isbn) grouped_books " +
           "ON b.book_id = grouped_books.min_book_id " +
           "WHERE b.available = true",
           nativeQuery = true)

   Page<BookEntity> findAllDistinctByIsbn(Pageable pageable);


}
