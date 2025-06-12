import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginForm: FormGroup;
  verPassword = false;

  // Recuperación de contraseña
  mostrarRecuperar = false;
  usuarioRecuperacion: string = '';
  mensajeOk: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  //Login 
  onSubmit() {
    if (this.loginForm.invalid) {
      console.warn('Formulario incompleto');
      return;
    }

    const { usuario, password } = this.loginForm.value;

    this.http.post<any>('http://localhost:3000/api/auth/login', { usuario, password })
      .subscribe({
        next: (res) => {
          if (res.ok) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('usuario', JSON.stringify(res.usuario));

            const roles = res.usuario.roles || [];

            if (roles.includes('Administrador')) {
              this.router.navigate(['/admin']);
            } else if (roles.includes('Investigador')) {
              this.router.navigate(['/inv']);
            } else if (roles.includes('Evaluador')) {
              this.router.navigate(['/eva']);
            } else {
              this.router.navigate(['/guest']);
            }

          } else {
            alert('Credenciales incorrectas');
          }
        },
        error: (err) => {
          console.error('Error:', err);
          alert('Error al conectar con el servidor');
        }
      });
  }

  // Recuperar contraseña
  recuperarContrasena() {
    this.mensajeOk = '';
    this.mensajeError = '';

    if (!this.usuarioRecuperacion.trim()) {
      this.mensajeError = 'Por favor ingresa tu usuario.';
      return;
    }

    this.http.post<any>('http://localhost:3000/api/auth/recuperar-contrasena', {
      usuario: this.usuarioRecuperacion
    }).subscribe({
      next: () => {
        this.mensajeOk = 'Si el usuario existe, se ha enviado un correo.';
        this.usuarioRecuperacion = '';
      },
      error: () => {
        this.mensajeError = 'Ocurrió un error al intentar recuperar la contraseña.';
      }
    });
  }
}
