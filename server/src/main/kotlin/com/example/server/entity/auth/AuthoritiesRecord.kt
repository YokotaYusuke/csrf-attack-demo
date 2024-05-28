package com.example.server.entity.auth

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.IdClass
import jakarta.persistence.Table
import org.springframework.security.core.GrantedAuthority

@Entity
@Table(name = "authorities")
@IdClass(AuthorityId::class)
data class AuthoritiesRecord(
    @Id
    var username: String,

    @Id
    @Column(name = "authority", length = 50)
    var authorityString: String
): GrantedAuthority {
    override fun getAuthority(): String = authorityString
}