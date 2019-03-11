import { getTableConfiguration } from './get-table-configuration.helper';

export function getTableLayers(
  visualizationLayers: any[],
  visualizationType: string
) {
  return (visualizationLayers || []).map((layer: any) => {
    return {
      tableConfiguration: getTableConfiguration(
        layer.config || {},
        layer.layout,
        visualizationType,
        layer.dataSelections
      ),
      analyticsObject: layer.analytics
    };
  });
}
