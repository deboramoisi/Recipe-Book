import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BsDropdownDirective, BsDropdownModule } from "ngx-bootstrap/dropdown";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinnerComponent } from "./loading-spinner/loading-spinner.component";
import { PlaceholderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
    ],
    imports: [
        CommonModule,
        BsDropdownModule
    ],
    exports: [
        AlertComponent,
        LoadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule,
        BsDropdownModule
    ],
    entryComponents: [
        // not needed for version >= 9
        AlertComponent
    ]
})

export class SharedModule {}