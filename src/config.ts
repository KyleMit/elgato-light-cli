export const minBrightness = 3;
export const maxBrightness = 100;
export const minTemperature = 143;
export const maxTemperature = 344;
export const stepsBrightness = 6;
export const stepsTemperature = 6;
export const intervalBrightness = (maxBrightness - minBrightness) / stepsBrightness;
export const intervalTemperature = (maxTemperature - minTemperature) / stepsTemperature;
