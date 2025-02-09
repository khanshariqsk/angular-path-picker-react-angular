import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { JsonViewComponent } from './components/json-view/json-view.component';
import { OnPathClickProps } from './components/json-view/JsonView';

import {
  hugeData,
  normalData,
  randomNestedObject,
  mockCpuData,
} from './utils/fake-data';
import { GeneralService } from './services/general.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonViewComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'angular-path-picker';
  sourceData: any = normalData;

  private generalService = inject(GeneralService);

  handlePathSelection(path: OnPathClickProps) {
    console.time('Time');

    const singleLevelValue = this.generalService.getSingleLevelValueFromPath(
      this.sourceData,
      path.singleLevelkeyPath
    );

    const multipleLevelValues =
      this.generalService.getMutipleLevelValuesFromPath(
        this.sourceData,
        path.multipleLevelkeyPath
      );

    console.log({ singleLevelValue, multipleLevelValues });

    console.timeEnd('Time');
  }
}
