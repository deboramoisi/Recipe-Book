import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthResponseData, AuthService } from "../_services/auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})

export class AuthComponent implements OnDestroy {
    isLoginMode = true;
    isLoading = false;
    error: string = null;
    
    @ViewChild('authenticateForm') form: NgForm;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

    private subscription: Subscription;

    constructor(private authService: AuthService, private router: Router,
        private componentFactoryResolver: ComponentFactoryResolver) {}
    
        ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onHandleError() {
        this.error = null;
    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }

        const email = this.form.value.email;
        const password = this.form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode) {
            authObs = this.authService.signIn(email, password);
        } else {
            authObs = this.authService.signUp(email, password);
        }

        authObs.subscribe(response => {
            console.log(response);
            this.isLoading = false;
            this.router.navigate(['/recipes']);
        }, error => {
            console.log(error);
            this.error = error;
            this.showErrorAlert(error);
            this.isLoading = false;
        });

        this.form.reset();
    }

    private showErrorAlert(message: string) {
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);
    
        componentRef.instance.message = message;
        this.subscription = componentRef.instance.close.subscribe(() => {
            this.subscription.unsubscribe();
            hostViewContainerRef.clear();
        }); 
    }
}