package com.example.dssd.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dssd.Model.Item;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {

}

