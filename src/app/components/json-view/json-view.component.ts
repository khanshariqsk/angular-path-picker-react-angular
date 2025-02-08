import { createRoot, Root } from 'react-dom/client';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import React from 'react';
import JsonView, {
  CustomThemeStyle,
  JsonViewIconStyle,
  JsonViewTheme,
  OnPathClickProps,
} from './JsonView';

@Component({
  selector: 'json-view',
  standalone: true,
  templateUrl: './json-view.component.html',
})
export class JsonViewComponent {
  @Input() src: any = null;
  @Output() onSelect = new EventEmitter<OnPathClickProps>();
  @Input() theme: JsonViewTheme = 'monokai';
  @Input() displayDataTypes: boolean = false;
  @Input() enableClipboard: boolean = false;
  @Input() collapsed: boolean | number = false;
  @Input() sortKeys: boolean = true;
  @Input() style: React.CSSProperties = {};
  @Input() iconStyle: JsonViewIconStyle = 'triangle';
  @Input() customThemeStyle: CustomThemeStyle = {};

  private reactRoot: Root | null = null;
  private container: HTMLElement | null = null;

  containerClassName: string = '';
  constructor(private elementRef: ElementRef) {
    this.containerClassName = this.generateRandomClassName(
      'json-view-container'
    );
  }

  ngAfterViewInit() {
    this.renderReactComponent();
  }

  generateRandomClassName(prefix: string = 'myclass'): string {
    const randomString =
      Math.random().toString(36).substring(2, 8) +
      Math.random().toString(36).substring(2, 8);

    return `${prefix}-${randomString}`;
  }

  renderReactComponent(): void {
    this.container = this.elementRef.nativeElement.querySelector(
      `#${this.containerClassName}`
    );
    if (this.container) {
      this.reactRoot = createRoot(this.container);
      this.reactRoot.render(this.createReactElement());
    }
  }

  createReactElement() {
    return React.createElement(JsonView, {
      src: this.src,
      onSelect: this.handlePathClick.bind(this),
      theme: this.theme,
      displayDataTypes: this.displayDataTypes,
      enableClipboard: this.enableClipboard,
      collapsed: this.collapsed,
      sortKeys: this.sortKeys,
      style: this.style,
      iconStyle: this.iconStyle,
      customThemeStyle: this.customThemeStyle,
    });
  }

  handlePathClick(path: OnPathClickProps): void {
    this.onSelect.emit(path);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['src'] && !changes['src']?.firstChange) {
      if (this.reactRoot) {
        this.reactRoot.render(this.createReactElement());
      }
    }
  }

  ngOnDestroy() {
    if (this.reactRoot) {
      this.reactRoot.unmount();
    }
  }
}
