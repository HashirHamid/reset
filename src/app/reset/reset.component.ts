import { Component, OnInit } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  supabase: SupabaseClient;
  newPassword: string = '';
  confirmPassword: string = '';
  statusMessage: string = '';
  code: string | null = null;

  constructor() {
    this.supabase = createClient('https://xuappslnruqekgevplor.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YXBwc2xucnVxZWtnZXZwbG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTgyNTQsImV4cCI6MjA1OTg3NDI1NH0.fDOlkzlwAg9VhpzCzDqwJN7i5dWNnQOkRfPodyhmFgg');
  }

  async ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    this.code = params.get('code');

    if (this.code) {
      const { error } = await this.supabase.auth.exchangeCodeForSession(this.code);
      if (error) {
        this.statusMessage = 'Session exchange failed: ' + error.message;
      }
    }
  }

  async resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.statusMessage = "Passwords do not match";
      return;
    }

    const { data, error } = await this.supabase.auth.updateUser({ password: this.newPassword });

    if (error) {
      this.statusMessage = "Error: " + error.message;
    } else {
      this.statusMessage = "Password updated successfully!";
    }
  }
}