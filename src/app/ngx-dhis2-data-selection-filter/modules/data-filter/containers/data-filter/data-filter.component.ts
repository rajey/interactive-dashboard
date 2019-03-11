import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import * as fromHelpers from '../../helpers';
import { ARROW_LEFT_ICON, ARROW_RIGHT_ICON, LIST_ICON } from '../../icons';
import * as fromModels from '../../models';
import * as fromDataFilterActions from '../../store/actions/data-filter.actions';
import * as fromDataFilterReducer from '../../store/reducers/data-filter.reducer';
import * as fromDataFilterSelectors from '../../store/selectors/data-filter.selectors';
import { DataFilterPreference } from '../../model/data-filter-preference.model';
import { DataFilterGroupsComponent } from '../../components/data-filter-groups/data-filter-groups.component';
import { DataGroup } from 'src/app/core/models/data-group.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-data-filter',
  templateUrl: './data-filter.component.html',
  styleUrls: ['./data-filter.component.css']
})
export class DataFilterComponent implements OnInit, OnDestroy {
  dataGroups: any[] = [];

  @Output()
  dataFilterUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  dataFilterClose: EventEmitter<any> = new EventEmitter<any>();
  @Input()
  selectedItems: any[] = [];
  @Input()
  selectedGroups: any[] = [];

  @Input()
  dataFilterPreferences: DataFilterPreference;

  @Input()
  dataGroupPreferences: {
    maximumNumberOfGroups: number;
    maximumItemPerGroup: number;
  };

  @ViewChild(DataFilterGroupsComponent)
  dataFilterGroupsComponent: DataFilterGroupsComponent;

  showGroupingPanel: boolean;
  selectedItems$: Observable<any>;
  querystring: string;
  dataItemSearchTerm: string;
  showBody = false;
  currentPageForAvailableDataItems = 1;
  currentPageForSelectedDataItems = 1;

  selectedGroupId: string;

  dataFilterSelections: fromModels.DataFilterSelection[];
  showGroups: boolean;

  // icons
  icons: { [name: string]: string };

  dataFilterGroups$: Observable<any[]>;
  currentDataFilterGroup$: Observable<any>;
  dataFilterItems$: Observable<any[]>;
  dataFilterLoading$: Observable<boolean>;

  constructor(private dataFilterStore: Store<fromDataFilterReducer.State>) {
    // Set default data filter preferences
    this.dataFilterPreferences = {
      enabledSelections: ['in', 'fn'],
      singleSelection: false,
      showGroupsOnStartup: true,
      hideSelectedPanel: true
    };

    // Set default data group preferences
    this.dataGroupPreferences = {
      maximumNumberOfGroups: 6,
      maximumItemPerGroup: 3
    };
    // Load data filter items
    dataFilterStore.dispatch(new fromDataFilterActions.LoadDataFilters());

    this.dataFilterGroups$ = dataFilterStore.select(
      fromDataFilterSelectors.getDataFilterGroups
    );

    this.currentDataFilterGroup$ = dataFilterStore.select(
      fromDataFilterSelectors.getCurrentDataFilterGroup
    );

    this.dataFilterItems$ = dataFilterStore.select(
      fromDataFilterSelectors.getDataFilterItems
    );

    this.dataFilterLoading$ = dataFilterStore.select(
      fromDataFilterSelectors.getDataFilterLoadingStatus
    );

    this.showGroups = false;

    this.icons = { LIST_ICON, ARROW_LEFT_ICON, ARROW_RIGHT_ICON };

    this.showGroupingPanel = false;
  }

  ngOnInit() {
    // set data filter selections
    this.dataFilterSelections = fromHelpers.getDataFilterSelectionsBasedOnPreferences(
      this.dataFilterPreferences
    );

    // Set show group status based on preferences
    this.showGroupingPanel =
      this.dataFilterPreferences &&
      this.dataFilterPreferences.showGroupsOnStartup;
  }

  // trigger this to reset pagination pointer when search change
  onDataItemsSearch(e) {
    e.stopPropagation();
    this.currentPageForAvailableDataItems = 1;
  }

  onSetDataFilterGroup(dataFilterGroup: any, e) {
    e.stopPropagation();
    this.dataFilterStore.dispatch(
      new fromDataFilterActions.SetCurrentDataFilterGroup(dataFilterGroup.id)
    );
    this.showGroups = false;
  }

  // this will add a selected item in a list function
  onSelectDataItem(item: any, e) {
    e.stopPropagation();
    if (this.dataFilterPreferences.singleSelection) {
      this.onDeselectAllItems();
    }

    if (!_.find(this.selectedItems, ['id', item.id])) {
      this.selectedItems =
        this.dataGroupPreferences &&
        this.dataGroupPreferences.maximumItemPerGroup &&
        this.dataGroupPreferences.maximumNumberOfGroups
          ? _.slice(
              [...this.selectedItems, item],
              0,
              this.dataGroupPreferences.maximumItemPerGroup *
                this.dataGroupPreferences.maximumNumberOfGroups
            )
          : [...this.selectedItems, item];
    }
  }

  // Remove selected Item
  onRemoveDataItem(dataItem: any, e?) {
    if (e) {
      e.stopPropagation();
    }
    const itemIndex = this.selectedItems.indexOf(
      _.find(this.selectedItems, ['id', dataItem.id])
    );

    if (itemIndex !== -1) {
      this.selectedItems = [
        ...this.selectedItems.slice(0, itemIndex),
        ...this.selectedItems.slice(itemIndex + 1)
      ];
    }
  }

  // selecting all items
  onSelectAllItems(event) {
    event.stopPropagation();

    this.dataFilterItems$
      .pipe(
        map((dataFilterItems: any[]) =>
          fromHelpers.filterByName(dataFilterItems, this.dataItemSearchTerm)
        ),
        take(1)
      )
      .subscribe((dataFilterItems: any[]) => {
        const newSelectedItems = _.uniqBy(
          [...this.selectedItems, ...dataFilterItems],
          'id'
        );
        this.selectedItems =
          this.dataGroupPreferences &&
          this.dataGroupPreferences.maximumItemPerGroup &&
          this.dataGroupPreferences.maximumNumberOfGroups
            ? _.slice(
                newSelectedItems,
                0,
                this.dataGroupPreferences.maximumItemPerGroup *
                  this.dataGroupPreferences.maximumNumberOfGroups
              )
            : newSelectedItems;
      });
  }

  // selecting all items
  onDeselectAllItems(e?) {
    if (e) {
      e.stopPropagation();
    }
    this.selectedItems = [];
  }

  emit() {
    return {
      items: this.selectedItems,
      groups: _.filter(
        _.map(this.selectedGroups, (dataGroup: any) => {
          return _.omit(dataGroup, ['current']);
        }),
        (dataGroup: DataGroup) => dataGroup.members.length > 0
      ),
      dimension: 'dx'
    };
  }

  close(e) {
    e.stopPropagation();
    this.dataFilterClose.emit(this.emit());
  }

  onDataFilterUpdate(e) {
    e.stopPropagation();
    this.dataFilterUpdate.emit(this.emit());
  }

  onToggleDataFilterSelection(toggledDataFilterSelection, event) {
    event.stopPropagation();
    const multipleSelection = event.ctrlKey ? true : false;
    this.dataFilterSelections = _.map(
      this.dataFilterSelections,
      (dataFilterSelection: any) => {
        return {
          ...dataFilterSelection,
          selected:
            toggledDataFilterSelection.prefix === 'all'
              ? dataFilterSelection.prefix !== 'all'
                ? false
                : !dataFilterSelection.selected
              : toggledDataFilterSelection.prefix === dataFilterSelection.prefix
              ? !dataFilterSelection.selected
              : multipleSelection
              ? dataFilterSelection.prefix === 'all'
                ? false
                : dataFilterSelection.selected
              : false
        };
      }
    );

    this.dataFilterStore.dispatch(
      new fromDataFilterActions.UpdateActiveDataFilterSelections(
        this.dataFilterSelections
      )
    );

    this.currentPageForAvailableDataItems = 1;
    this.dataItemSearchTerm = '';
  }

  toggleDataFilterGroupList(e) {
    e.stopPropagation();
    this.showGroups = !this.showGroups;
  }

  onToggleGroupingPanel(e) {
    e.stopPropagation();
    this.showGroupingPanel = !this.showGroupingPanel;
  }

  onDataGroupsUpdate(dataGroups) {
    this.selectedGroups = [...dataGroups];
  }

  onSelectedGroupIdUpdate(selectedGroupId: string) {
    this.selectedGroupId = selectedGroupId;
  }

  onUpdateSelectedItems(selectedItems: any[]) {
    this.selectedItems = [...selectedItems];
  }

  ngOnDestroy() {
    this.dataFilterClose.emit(this.emit());
  }
}
