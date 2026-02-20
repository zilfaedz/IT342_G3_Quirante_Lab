package com.android.mobile

import android.app.Activity
import android.os.Bundle
import android.widget.TextView

class SignupPage : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_signup_page)

        val loginLink = findViewById<TextView>(R.id.tv_login_link)
        loginLink.setOnClickListener {
            finish()
        }

        val backLink = findViewById<TextView>(R.id.tv_back)
        backLink.setOnClickListener {
            finish()
        }
    }
}
