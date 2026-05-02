package com.stockapplication.repository;

import com.stockapplication.model.Portfolio;
import com.stockapplication.model.Transaction;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByPortfolio(Portfolio portfolio);
}
