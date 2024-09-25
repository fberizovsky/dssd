package com.example.dssd.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.dssd.Model.Colecta;

@Repository
public interface ColectaRepository extends JpaRepository<Colecta, Long> {


}