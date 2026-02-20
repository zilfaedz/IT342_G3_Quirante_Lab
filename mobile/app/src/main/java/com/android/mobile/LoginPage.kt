package com.android.mobile

import android.app.Activity
import android.content.Intent
import android.os.Bundle
import android.widget.TextView

class LoginPage : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login_page)

        val signupLink = findViewById<TextView>(R.id.tv_signup_link)
        signupLink.setOnClickListener {
            val intent = Intent(this, SignupPage::class.java)
            startActivity(intent)
        }

        val backLink = findViewById<TextView>(R.id.tv_back)
        backLink.setOnClickListener {
            finish()
        }
    }
}
