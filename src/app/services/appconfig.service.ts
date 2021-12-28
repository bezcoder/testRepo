import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface AppConfig {
  inputStyle?: string;
  dark?: boolean;
  theme?: string;
  ripple?: boolean;
}

@Injectable()
export class AppConfigService {

    config: AppConfig = {
        theme: 'saga-blue',
        dark: false,
        inputStyle: 'outlined',
        ripple: true
    };

    private configUpdate = new Subject<AppConfig>();

    configUpdate$ = this.configUpdate.asObservable();

    updateConfig(config: AppConfig) {
        this.config = config;
        this.configUpdate.next(config);
    }

    getConfig() {
        return this.config;
    }
}
