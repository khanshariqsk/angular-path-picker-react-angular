import { Injectable } from '@angular/core';
import _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor() {}

  getMutipleLevelValuesFromPath(data: any, path: string): any[] {
    let values: any[] = [];
    const pathParts = path.split('.');

    const recursiveSearch = (obj: any, remainingPath: string[]) => {
      if (!obj || remainingPath.length === 0) return;

      const currentKey = remainingPath[0];
      const nextPath = remainingPath.slice(1);

      if (Array.isArray(obj)) {
        obj.forEach((item) => recursiveSearch(item, remainingPath));
      } else if (typeof obj === 'object' && obj !== null) {
        if (currentKey in obj) {
          if (nextPath.length === 0) {
            values.push(obj[currentKey]);
          } else {
            recursiveSearch(obj[currentKey], nextPath);
          }
        }

        Object.values(obj).forEach((nested) => {
          if (typeof nested === 'object') {
            recursiveSearch(nested, remainingPath);
          }
        });
      }
    };

    recursiveSearch(data, pathParts);
    return values;
  }

  getSingleLevelValueFromPath(data: any, path: string): any {
    return _.get(data, path);
  }
}
