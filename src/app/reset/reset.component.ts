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

  constructor() {
    this.supabase = createClient(
      'https://xuappslnruqekgevplor.supabase.co',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh1YXBwc2xucnVxZWtnZXZwbG9yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTgyNTQsImV4cCI6MjA1OTg3NDI1NH0.fDOlkzlwAg9VhpzCzDqwJN7i5dWNnQOkRfPodyhmFgg'
    );
  }

  ngOnInit(): void {
    // No need to manually call exchangeCodeForSession anymore
    this.supabase.auth.getSession().then(({ data, error }) => {
      if (!data?.session) {
        this.statusMessage = 'Not logged in. Please use the reset link from your email again.';
      }
    });
  }

  async resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.statusMessage = 'Passwords do not match';
      return;
    }

    const { error } = await this.supabase.auth.updateUser({
      password: this.newPassword
    });

    this.statusMessage = error
      ? 'Error: ' + error.message
      : 'Password updated successfully!';
  }
}
