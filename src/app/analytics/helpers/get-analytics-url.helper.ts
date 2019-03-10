import * as _ from 'lodash';

// TODO Find best standard for config structure so that layerType can be obtained direct from config object
export function getAnalyticsUrl(
  dataSelections: any[],
  layerType: string,
  config?: any,
  skipData?: boolean
): string {
  switch (layerType) {
    case 'thematic':
      return getAggregateAnalyticsUrl(
        dataSelections,
        layerType,
        config,
        skipData
      );
    case 'event':
      return getEventAnalyticsUrl(dataSelections, layerType, config, skipData);
    default:
      return '';
  }
}

function flattenDimensions(
  dataSelections: any[],
  isAggregate?: boolean,
  skipData?: boolean
): string {
  if (
    !checkIfSelectionsAreEligibleForAnalytics(
      dataSelections,
      isAggregate,
      skipData
    )
  ) {
    return '';
  }

  return getAnalyticsDimensions(dataSelections).join('&');
}

function checkIfSelectionsAreEligibleForAnalytics(
  dataSelections: any[],
  isAggregate: boolean,
  skipData?: boolean
) {
  if (skipData) {
    return true;
  }

  return isAggregate
    ? dataSelections.length >= 3
    : _.filter(
        _.map(
          dataSelections,
          dataSelection => ['ou', 'pe'].indexOf(dataSelection.dimension) !== -1
        ),
        isEligible => isEligible
      ).length === 2;
}

// TODO: Need to get generic and have decision on whether to use filter or dimension
function getAnalyticsDimensions(dataSelections: any[]): string[] {
  return _.filter(
    _.map(dataSelections, (dataSelection: any) => {
      const selectionValues = getDataSelectionValues(dataSelection);

      return selectionValues !== ''
        ? (dataSelection.layout === 'filters' ? 'dimension=' : 'dimension=') +
            dataSelection.dimension +
            ':' +
            selectionValues
        : ['dx', 'ou', 'pe'].indexOf(dataSelection.dimension) === -1
        ? (dataSelection.layout === 'filters' ? 'dimension=' : 'dimension=') +
          dataSelection.dimension +
          (dataSelection.legendSet ? '-' + dataSelection.legendSet : '')
        : '';
    }),
    dimension => dimension !== ''
  );
}

function getDataSelectionValues(dataSelection: any) {
  return dataSelection.filter
    ? dataSelection.filter
    : _.map(dataSelection.items, item => item.id).join(';');
}

function getAggregateAnalyticsUrl(
  dataSelections: any[],
  layerType: string,
  config?: any,
  skipData?: boolean
): string {
  const flattenedDimensionString = flattenDimensions(
    dataSelections,
    true,
    skipData
  );
  return flattenedDimensionString !== ''
    ? 'analytics.json?' +
        flattenedDimensionString +
        getAnalyticsUrlOptions(config, layerType, skipData)
    : '';
}

function getAnalyticsUrlOptions(
  config: any,
  layerType: string,
  skipData?: boolean
) {
  if (!config || !layerType) {
    return '';
  }

  return (
    getDisplayPropertyDetails(config) +
    getAggregationTypeDetails(config) +
    getValueDetails(config) +
    getOutputTypeDetails(layerType) +
    getCoordinateDetails(layerType) +
    '&includeMetadataDetails=true' +
    getSkipDataStatus(skipData)
  );
}

function getDisplayPropertyDetails(config: any) {
  return config.displayNameProperty
    ? '&displayProperty=' + config.displayNameProperty
    : '';
}

function getAggregationTypeDetails(config) {
  return config
    ? config.aggregationType && config.aggregationType !== 'DEFAULT'
      ? '&aggregationType=' + config.aggregationType
      : ''
    : '';
}

function getOutputTypeDetails(layerType) {
  return layerType === 'event' ? '&outputType=EVENT' : '';
}

function getValueDetails(config) {
  return config.value ? '&value' + config.value.id : '';
}

function getCoordinateDetails(layerType) {
  return layerType === 'event' ? '&coordinatesOnly=true' : '';
}

function getSkipDataStatus(skipData: boolean) {
  return skipData ? '&skipData=true' : '';
}

function getEventAnalyticsUrl(
  dataSelections: any[],
  layerType: string,
  config: any,
  skipData?: boolean
) {
  const flattenedDimensionString = flattenDimensions(dataSelections);
  const analyticsUrlFields =
    flattenedDimensionString !== ''
      ? getEventAnalyticsUrlSection(config) +
        getProgramParameters(config) +
        getEventAnalyticsStartAndEndDateSection(config) +
        flattenedDimensionString +
        getAnalyticsUrlOptions(config, layerType, skipData)
      : '';
  return analyticsUrlFields !== ''
    ? 'analytics/events/' + analyticsUrlFields
    : '';
}

function getProgramParameters(config: any): string {
  return config
    ? config.program && config.programStage
      ? config.program.id && config.programStage.id
        ? config.program.id + '.json?stage=' + config.programStage.id + '&'
        : ''
      : ''
    : '';
}

function getEventAnalyticsUrlSection(config) {
  switch (config.visualizationType) {
    case 'EVENT_CHART':
      return 'aggregate/';
    case 'EVENT_REPORT':
      return config.dataType === 'AGGREGATED_VALUES' ? 'aggregate/' : 'query/';
    default:
      return !config.aggregate
        ? config.eventClustering && config.spatialSupport
          ? 'count/'
          : 'query/'
        : 'aggregate/';
  }
}

function getEventAnalyticsStartAndEndDateSection(config: any) {
  return config && config.startDate && config.endDate
    ? 'startDate=' + config.startDate + '&' + 'endDate=' + config.endDate + '&'
    : '';
}
