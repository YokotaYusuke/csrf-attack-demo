package com.example.server.entity

import com.example.server.entity.auth.AuthoritiesRecord
import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.OneToMany
import jakarta.persistence.Table
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

@Entity
@Table(name = "users")
data class UserRecord(
    @Id
    @Column(length = 50)
    private var username: String,

    @Column(length = 500)
    private var password: String,

    private var enabled: Boolean,

    @OneToMany
    @JoinColumn(name = "username")
    var authorites: MutableList<AuthoritiesRecord> = mutableListOf()
): UserDetails {
    override fun getAuthorities(): Collection<GrantedAuthority> = authorities
    override fun getPassword(): String = password
    override fun getUsername(): String = username
    override fun isAccountNonExpired(): Boolean = true
    override fun isAccountNonLocked(): Boolean = true
    override fun isCredentialsNonExpired(): Boolean = true
    override fun isEnabled(): Boolean = enabled
}
