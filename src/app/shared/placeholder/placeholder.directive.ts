import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    // attribute selector
    selector: '[appPlaceholder]'
})

export class PlaceholderDirective {
    constructor(public viewContainerRef: ViewContainerRef) {}


}