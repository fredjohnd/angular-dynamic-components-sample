import { Component, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { TerminalComponent } from './terminal/terminal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('terminalContainer', {read: ViewContainerRef}) terminalContainer: ViewContainerRef;
  terminals: ComponentRef<TerminalComponent>[] = [];
  lastId = 0;
  constructor(private resolver: ComponentFactoryResolver) {}

  newTerminal() {
    this.lastId++;
    const factory = this.resolver.resolveComponentFactory(TerminalComponent);
    const component = this.terminalContainer.createComponent(factory);
    component.instance.terminalId = `Terminal ${this.lastId}`;
    component.instance.destroy.subscribe(() => this.destroyTerminal(component));
    this.terminals.push(component);
  }

  destroyTerminal(component: ComponentRef<TerminalComponent>) {
    const index =  this.terminalContainer.indexOf(component.hostView);
    this.terminalContainer.remove(index);
    this.terminals.splice(index, 1);
  }
}
